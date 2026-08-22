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

async function getSummariesFromStrapi(
   queryString: string,
   page: number = 1,
): Promise<StrapiResponse<Summary[]>> {
   const { jwt } = await requireSession();

   const query = stringify({
      sort: ["createdAt:desc"],
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
): Promise<StrapiResponse<SummaryWithFavorite[]>> {
   const summariesResponse = await getSummariesFromStrapi(queryString, page);

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
      sort: ["createdAt:desc"],
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
): Promise<StrapiResponse<SummaryWithFavorite[]>> {
   const favoritesResponse = await getFavorites();

   const summariesResponse = await getFavoriteSummariesFromStrapi(
      queryString,
      page,
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

export const loaders = {
   getHomePageData,
   getGlobalData,
   getMetaData,
   getSummaries,
   getFavoriteSummaries,
   getSummaryByDocumentId,
   getFavorites,
};
