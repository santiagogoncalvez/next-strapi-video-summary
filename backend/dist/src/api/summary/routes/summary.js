"use strict";
/**
 * summary router
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreRouter("api::summary.summary", {
    config: {
        create: {
            middlewares: ["api::summary.on-summary-create"],
        },
    },
});
