import type {
   StrapiResponse,
   HomePage,
   Global,
   MetaData,
   Summary,
   Favorite,
   SummaryWithFavorite,
} from "@/types/strapi";

import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";
import { stringify } from "qs";
import { requireSession } from "@/lib/dal";
import { apiFetch } from "./data-fetch";
import { handleStrapiError } from "@/actions/helpers";
import { mapSummariesWithFavorites } from "@/lib/parsers";
import { cache } from "react";

const baseUrl = getStrapiURL();

async function getHomePageData(): Promise<StrapiResponse<HomePage>> {
   // throw new Error("Test error");

   const query = stringify({
      populate: {
         sections: {
            on: {
               "layout.hero-section": {
                  populate: {
                     image: {
                        fields: ["url", "alternativeText"],
                     },
                     link: {
                        populate: true,
                     },
                     secondaryLink: {
                        populate: true,
                     },
                  },
               },
               "layout.features-section": {
                  populate: {
                     features: {
                        populate: true,
                     },
                  },
               },
            },
         },
      },
   });

   const url = new URL("/api/home-page", baseUrl);
   url.search = query;

   try {
      return await api.get<StrapiResponse<HomePage>>(url.href);
   } catch (error) {
      handleStrapiError(error);
   }
}

async function getGlobalData(): Promise<StrapiResponse<Global>> {
   const query = stringify({
      populate: [
         "header.logoText",
         "header.ctaButton",
         "header.secondaryCtaButton",
         "footer.logoText",
         "footer.socialLink",
      ],
   });

   const url = new URL("/api/global", baseUrl);
   url.search = query;

   try {
      return await api.get<StrapiResponse<Global>>(url.href);
   } catch (error) {
      handleStrapiError(error);
   }
}

async function getMetaData(): Promise<StrapiResponse<MetaData>> {
   const query = stringify({
      fields: ["title", "description"],
   });

   const url = new URL("/api/global", baseUrl);
   url.search = query;

   try {
      return await apiFetch.get<StrapiResponse<MetaData>>(url.href, {
         next: {
            revalidate: 3600,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

export type SummarySort = "newest" | "oldest" | "title-asc" | "title-desc";

const SORT_OPTIONS: Record<SummarySort, string> = {
   newest: "createdAt:desc",
   oldest: "createdAt:asc",
   "title-asc": "title:asc",
   "title-desc": "title:desc",
};

async function getSummariesFromStrapi(
   queryString: string,
   page: number = 1,
   sort: SummarySort = "newest",
): Promise<StrapiResponse<Summary[]>> {
   const { jwt } = await requireSession();

   const query = stringify({
      sort: [SORT_OPTIONS[sort] ?? SORT_OPTIONS.newest],
      ...(queryString && {
         filters: {
            $or: [
               { title: { $containsi: queryString } },
               { content: { $containsi: queryString } },
            ],
         },
      }),
      pagination: {
         page: page,
         pageSize: process.env.PAGE_SIZE || 8,
      },
   });

   const url = new URL("/api/summaries", baseUrl);
   url.search = query;

   try {
      return await api.get<StrapiResponse<Summary[]>>(url.href, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

async function getSummaries(
   queryString: string,
   page: number = 1,
   sort: SummarySort = "newest",
): Promise<StrapiResponse<SummaryWithFavorite[]>> {
   const summariesResponse = await getSummariesFromStrapi(
      queryString,
      page,
      sort,
   );

   const favoritesResponse = await getFavorites();

   const summaries = mapSummariesWithFavorites(
      summariesResponse.data,
      favoritesResponse.data,
   );

   return {
      ...summariesResponse,
      data: summaries,
   };
}

async function getSummaryByDocumentId(
   documentId: string,
): Promise<StrapiResponse<Summary>> {
   const { jwt } = await requireSession();

   const path = `/api/summaries/${documentId}`;
   const url = new URL(path, baseUrl);

   try {
      return await api.get<StrapiResponse<Summary>>(url.href, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

async function getFavorites(): Promise<StrapiResponse<Favorite[]>> {
   const { jwt } = await requireSession();

   const url = new URL("/api/favorites", baseUrl);

   try {
      return await api.get<StrapiResponse<Favorite[]>>(url.href, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

async function getFavoriteSummariesFromStrapi(
   queryString: string,
   page: number = 1,
   sort: SummarySort = "newest",
   favorites: Favorite[],
): Promise<StrapiResponse<Summary[]>> {
   const { jwt } = await requireSession();

   const summaryIds = favorites.map((favorite) => favorite.summaryId);

   if (summaryIds.length === 0) {
      return {
         data: [],
         meta: {
            pagination: {
               page,
               pageSize: Number(process.env.PAGE_SIZE) || 8,
               pageCount: 0,
               total: 0,
            },
         },
      };
   }

   const query = stringify({
      sort: [SORT_OPTIONS[sort] ?? SORT_OPTIONS.newest],
      filters: {
         documentId: {
            $in: summaryIds,
         },
         ...(queryString && {
            $or: [
               { title: { $containsi: queryString } },
               { content: { $containsi: queryString } },
            ],
         }),
      },
      pagination: {
         page,
         pageSize: Number(process.env.PAGE_SIZE) || 8,
      },
   });

   const url = new URL("/api/summaries", baseUrl);
   url.search = query;

   try {
      return await api.get<StrapiResponse<Summary[]>>(url.href, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

async function getFavoriteSummaries(
   queryString: string,
   page: number = 1,
   sort: SummarySort = "newest",
): Promise<StrapiResponse<SummaryWithFavorite[]>> {
   const favoritesResponse = await getFavorites();

   const summariesResponse = await getFavoriteSummariesFromStrapi(
      queryString,
      page,
      sort,
      favoritesResponse.data,
   );

   const summaries = mapSummariesWithFavorites(
      summariesResponse.data,
      favoritesResponse.data,
   );

   return {
      ...summariesResponse,
      data: summaries,
   };
}

async function getFavoriteBySummaryId(
   summaryId: string,
): Promise<StrapiResponse<Favorite[]>> {
   const { jwt } = await requireSession();

   const query = stringify({
      filters: {
         summaryId: {
            $eq: summaryId,
         },
      },
   });

   const url = new URL("/api/favorites", baseUrl);
   url.search = query;

   try {
      return await api.get<StrapiResponse<Favorite[]>>(url.href, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

export const getSummaryWithFavoriteByDocumentId = cache(
   async (documentId: string): Promise<StrapiResponse<SummaryWithFavorite>> => {
      // Peticiones en paralelo en lugar de secuenciales
      const [summaryResponse, favoriteResponse] = await Promise.all([
         getSummaryByDocumentId(documentId),
         getFavoriteBySummaryId(documentId),
      ]);

      if (!summaryResponse?.data) {
         return summaryResponse as unknown as StrapiResponse<SummaryWithFavorite>;
      }

      return {
         ...summaryResponse,
         data: {
            ...summaryResponse.data,
            isFavorite: (favoriteResponse?.data?.length ?? 0) > 0,
            favoriteDocumentId: favoriteResponse?.data?.[0]?.documentId,
         },
      };
   },
);

export const loaders = {
   getHomePageData,
   getGlobalData,
   getMetaData,
   getSummaries,
   getFavoriteSummaries,
   getSummaryByDocumentId,
   getSummaryWithFavoriteByDocumentId,
   getFavorites,
};
