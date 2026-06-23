// import { cacheLife } from "next/cache";
import qs from "qs"
import { Credentials } from "./definitions";
import axios from "axios";

export const STRAPI_BASE_URL = process.env.STRAPI_BASE_URL || "http://localhost:1337";

const QUERY_HOME_PAGE = {
    populate: {
        sections: {
            on: {
                'layout.hero-section': {
                    populate: {
                        image: {
                            fields: ['url', "alternativeText"]
                        },
                        link: {
                            populate: true
                        },
                        secondaryLink: {
                            populate: true
                        },
                    }
                }
            }
        }
    }
};

export async function getHomePage() {
    const query = qs.stringify(QUERY_HOME_PAGE);
    const response = await getStrapiData(`/api/home-page?${query}`);
    return response?.data;
}

export async function getStrapiData(url: string) {
    // "use cache"
    // console.log("getStrapiData");

    // cacheLife({ expire: 60 });
    try {
        const response = await fetch(`${STRAPI_BASE_URL}${url}`, {
            next: {
                revalidate: 60,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error)
        return null;
    }
}

export async function registerUserService(credentials: Credentials) {
    const url = `${STRAPI_BASE_URL}/api/auth/local/register`

    try {
        const response = await axios.post(url, {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password
        });

        return response;
    } catch (error: any) {
        const logError = "Error registering user:";
        console.error(logError, error);
        throw error?.response?.data?.error?.message || logError;
    }
}

export async function loginUserService(userData: {
    identifier: string;
    password: string;
}) {
    const url = `${STRAPI_BASE_URL}/api/auth/local`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error logging user:", error);
        throw error;
    }
}

export const confirmEmailRequest = async (email: string) => {
    try {
        const response = await axios.post(
            `${STRAPI_BASE_URL}/api/auth/send-email-confirmation`,
            {
                email,
            }
        );

        return response;
    } catch (error: any) {
        return (
            error?.response?.data?.error?.message ||
            "Error sending confirmation email"
        );
    }
};