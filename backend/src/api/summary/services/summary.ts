/**
 * summary service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
   "api::summary.summary",
   ({ strapi }) => ({
      async delete(documentId, params) {
         const favorite = await strapi
            .documents("api::favorite.favorite")
            .findFirst({
               filters: {
                  summaryId: {
                     $eq: documentId,
                  },
               },
            });

         if (favorite) {
            await strapi.documents("api::favorite.favorite").delete({
               documentId: favorite.documentId,
            });
         }

         return super.delete(documentId, params);
      },
   }),
);
