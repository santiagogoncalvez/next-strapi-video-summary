/**
 * `is-favorite-owner` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: unknown, { strapi }: { strapi: Core.Strapi }) => {
   return async (ctx, next) => {
      const user = ctx.state.user;
      const userId = user?.documentId;

      if (!userId) {
         return ctx.unauthorized("You can't access this entry");
      }

      const entryId = ctx.params.id;

      if (entryId) {
         const favorite = await strapi
            .documents("api::favorite.favorite")
            .findOne({
               documentId: entryId,
            });

         if (!favorite || favorite.userId !== userId) {
            return ctx.unauthorized("You can't access this entry");
         }
      }

      if (!entryId) {
         ctx.query = {
            ...ctx.query,
            filters: {
               ...ctx.query.filters,
               userId,
            },
         };
      }

      await next();
   };
};
