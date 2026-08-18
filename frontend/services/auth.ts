import { requireSession } from "../lib/dal";
import { getStrapiURL } from "../lib/utils";
import {
   AuthResponse,
   AuthServiceResponse,
   ChangePasswordUser,
   ChangePasswordUserStrapi,
   ConfirmEmail,
   ForgotPassword,
   LoginUser,
   RegisterUser,
   ResetPasswordUser,
   ResetPasswordUserStrapi,
   User,
} from "@/types/strapi";
import { api } from "@/data/data-api";
import { stringify } from "qs";
import { handleStrapiError } from "@/actions/helpers";

export const STRAPI_BASE_URL = getStrapiURL();

export async function registerUserService(
   userData: RegisterUser,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

   try {
      return await api.post<AuthServiceResponse, RegisterUser>(url, userData);
   } catch (error) {
      handleStrapiError(error);
   }
}

export async function loginUserService(
   userData: LoginUser,
): Promise<AuthResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/local`;

   try {
      return await api.post<AuthResponse, LoginUser>(url, userData);
   } catch (error) {
      handleStrapiError(error);
   }
}

export async function confirmEmailService(
   email: string,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/send-email-confirmation`;

   try {
      return await api.post<AuthServiceResponse, ConfirmEmail>(url, {
         email,
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

export async function forgotPasswordService(
   email: string,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/forgot-password`;

   try {
      return await api.post<AuthServiceResponse, ForgotPassword>(url, {
         email,
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

export async function resetPasswordService(
   userData: ResetPasswordUser,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/reset-password`;

   const payload = {
      code: userData?.code,
      password: userData?.password,
      passwordConfirmation: userData?.confirmPassword,
   };

   try {
      return await api.post<AuthServiceResponse, ResetPasswordUserStrapi>(
         url,
         payload,
      );
   } catch (error) {
      handleStrapiError(error);
   }
}

export async function changePasswordService(
   userData: ChangePasswordUser,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/change-password`;

   const payload = {
      currentPassword: userData.password,
      password: userData.newPassword,
      passwordConfirmation: userData.confirmPassword,
   };

   const { jwt } = await requireSession();

   try {
      return await api.post<AuthServiceResponse, ChangePasswordUserStrapi>(
         url,
         payload,
         {
            headers: {
               Authorization: `Bearer ${jwt}`,
            },
         },
      );
   } catch (error) {
      handleStrapiError(error);
   }
}

export async function getUserMeService(): Promise<User> {
   const { jwt } = await requireSession();

   const query = stringify({
      populate: {
         image: {
            fields: ["url", "alternativeText"],
         },
      },
   });

   const url = new URL("/api/users/me", STRAPI_BASE_URL);
   url.search = query;

   try {
      return await api.get<User>(url.href, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}
