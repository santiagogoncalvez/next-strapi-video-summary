import qs from "qs";

import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";
import { HomePage, StrapiResponse } from "@/types/strapi";

const baseUrl = getStrapiURL();

async function getHomePageData(): Promise<StrapiResponse<HomePage>> {
    const query = qs.stringify({
        populate: {
            blocks: {
                on: {
                    "layout.hero-section": {
                        populate: {
                            image: {
                                fields: ["url", "alternativeText"],
                            },
                            link: {
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
    return api.get<HomePage>(url.href);
}

export const loaders = {
    getHomePageData,
};