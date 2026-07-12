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
} from "@/types/strapi";
import { api } from "@/data/data-api";

export const STRAPI_BASE_URL = getStrapiURL();

export async function registerUserService(
   userData: RegisterUser,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

   return api.post<AuthServiceResponse, RegisterUser>(url, userData);
}

export async function loginUserService(
   userData: LoginUser,
): Promise<AuthResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/local`;

   return api.post<AuthResponse, LoginUser>(url, userData);
}

export async function confirmEmailService(
   email: string,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/send-email-confirmation`;

   return api.post<AuthServiceResponse, ConfirmEmail>(url, {
      email,
   });
}

export async function forgotPasswordService(
   email: string,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/forgot-password`;

   return api.post<AuthServiceResponse, ForgotPassword>(url, {
      email,
   });
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

   return api.post<AuthServiceResponse, ResetPasswordUserStrapi>(url, payload);
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

   return api.post<AuthServiceResponse, ChangePasswordUserStrapi>(
      url,
      payload,
      {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      },
   );
}
