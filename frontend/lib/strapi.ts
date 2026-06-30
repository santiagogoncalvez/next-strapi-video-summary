import { Credentials } from "./definitions";
import axios from "axios";
import { verifySession } from "./dal";
import { getStrapiURL } from "./utils";

export const STRAPI_BASE_URL = getStrapiURL();

export async function getStrapiData(url: string) {
    const fullUrl = `${getStrapiURL()}${url}`;

    try {
        const response = await fetch(fullUrl, {
            next: {
                revalidate: 60,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export async function registerUserService(credentials: Credentials) {
    const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

    try {
        const response = await axios.post(url, {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
        });

        return response;
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        }

        throw error;
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
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw data;
        }

        return data;
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        }

        throw error;
    }
}

export async function confirmEmailRequest(email: string) {
    const url = `${STRAPI_BASE_URL}/api/auth/send-email-confirmation`;

    try {
        const response = await axios.post(
            url,
            {
                email,
            },
        );

        return response;
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        }

        throw error;
    }
}

export async function forgotPasswordRequest(email: string) {
    const url = `${STRAPI_BASE_URL}/api/auth/forgot-password`;
    try {
        const response = await axios.post(url, {
            email,
        });

        return response;
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        }

        throw error;
    }
}

export async function resetPasswordRequest(credentials: Credentials) {
    const url = `${STRAPI_BASE_URL}/api/auth/reset-password`;

    try {
        const response = await axios.post(url, {
            code: credentials?.code,
            password: credentials?.password,
            passwordConfirmation: credentials?.confirmPassword,
        });

        return response;
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        }

        throw error;
    }
}

export const changePasswordRequest = async (credentials: Credentials) => {
    const url = `${STRAPI_BASE_URL}/api/auth/change-password`;

    try {
        const result = await verifySession();

        if (!result.isAuth) {
            // nunca debería entrar porque verifySession hace redirect,
            // pero TypeScript queda satisfecho.
            throw new Error("Not authenticated");
        }

        const { jwt } = result.session;

        const response = await axios.post(
            url,
            {
                currentPassword: credentials.password,
                password: credentials.newPassword,
                passwordConfirmation: credentials.confirmPassword,
            },
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        );

        return response;
    } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.data) {
            throw error.response.data;
        }

        throw error;
    }
};
