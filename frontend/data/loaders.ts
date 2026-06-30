import qs from "qs";

import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";
import { Global, HomePage, StrapiResponse } from "@/types/strapi";

const baseUrl = getStrapiURL();

async function getHomePageData(): Promise<StrapiResponse<HomePage>> {
    const query = qs.stringify({
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
    return api.get<HomePage>(url.href);
}

async function getGlobalData(): Promise<StrapiResponse<Global>> {
    const query = qs.stringify({
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
    return api.get<Global>(url.href);
}

export const loaders = {
    getHomePageData,
    getGlobalData
};