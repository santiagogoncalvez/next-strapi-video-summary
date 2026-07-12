import type {
   StrapiResponse,
   HomePage,
   Global,
   MetaData,
} from "@/types/strapi";

import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";
import { stringify } from "qs";

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

export const loaders = {
   getHomePageData,
   getGlobalData,
   getMetaData,
};
