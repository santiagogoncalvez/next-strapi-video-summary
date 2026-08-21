/**
 * `on-favorite-create` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: unknown, { strapi }: { strapi: Core.Strapi }) => {
   return async (ctx, next) => {
      const user = ctx.state.user;

      if (!user) {
         return ctx.unauthorized("You are not authenticated");
      }

      ctx.request.body = {
         ...ctx.request.body,
         data: {
            ...ctx.request.body.data,
            userId: user.documentId,
         },
      };

      await next();
   };
};
