/**
 * `on-summary-create` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
   return async (ctx, next) => {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("You are not authenticated");

      // console.log("############ Inside middleware end #############");

      // ADD THE AUTHOR ID TO THE BODY
      const modifiedBody = {
         ...ctx.request.body,
         data: {
            ...ctx.request.body.data,
            userId: ctx.state.user.documentId,
         },
      };

      ctx.request.body = modifiedBody;

      await next();

      // console.log("############ Inside middleware end #############");
   };
};
