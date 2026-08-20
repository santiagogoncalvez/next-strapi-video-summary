/**
 * summary router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::favorite.favorite", {
   config: {
      create: {
         middlewares: ["global::is-favorite-owner"],
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
