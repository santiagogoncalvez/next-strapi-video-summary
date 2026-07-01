import qs from "qs";
import type { StrapiResponse, HomePage, Global, MetaData } from "@/types/strapi";

import { api } from "@/data/data-api";
import { getStrapiURL } from "@/lib/utils";

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

async function getMetaData(): Promise<StrapiResponse<MetaData>> {
    const query = qs.stringify({
        fields: ["title", "description"],
    });

    const url = new URL("/api/global", baseUrl);
    url.search = query;
    return api.get<MetaData>(url.href);
}

export const loaders = {
    getHomePageData,
    getGlobalData,
    getMetaData,
};