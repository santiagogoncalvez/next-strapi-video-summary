import type {
   StrapiResponse,
   HomePage,
   Global,
   MetaData,
   Summary,
} from "@/types/strapi";

import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";
import { stringify } from "qs";
import { requireSession } from "@/lib/dal";

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
   return api.get<StrapiResponse<HomePage>>(url.href);
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
   return api.get<StrapiResponse<Global>>(url.href);
}

async function getMetaData(): Promise<StrapiResponse<MetaData>> {
   const query = stringify({
      fields: ["title", "description"],
   });

   const url = new URL("/api/global", baseUrl);
   url.search = query;
   return api.get<StrapiResponse<MetaData>>(url.href);
}

async function getSummaries(): Promise<StrapiResponse<Summary[]>> {
   const { jwt } = await requireSession();

   const query = stringify({
      sort: ["createdAt:desc"],
   });

   const url = new URL("/api/summaries", baseUrl);
   url.search = query;

   return api.get<StrapiResponse<Summary[]>>(url.href, {
      headers: {
         Authorization: `Bearer ${jwt}`,
      },
   });
}

async function getSummaryByDocumentId(
   documentId: string,
): Promise<StrapiResponse<Summary>> {
   const { jwt } = await requireSession();

   const path = `/api/summaries/${documentId}`;
   const url = new URL(path, baseUrl);

   return api.get<StrapiResponse<Summary>>(url.href, {
      headers: {
         Authorization: `Bearer ${jwt}`,
      },
   });
}

export const loaders = {
   getHomePageData,
   getGlobalData,
   getMetaData,
   getSummaries,
   getSummaryByDocumentId,
};
