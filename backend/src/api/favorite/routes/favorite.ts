/**
 * summary router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::favorite.favorite", {
   config: {
      create: {
         middlewares: ["api::favorite.on-favorite-create"],
      },
      find: {
         middlewares: ["global::is-favorite-owner"],
      },
      findOne: {
         middlewares: ["global::is-favorite-owner"],
      },
      delete: {
         middlewares: ["global::is-favorite-owner"],
      },
   },
});
