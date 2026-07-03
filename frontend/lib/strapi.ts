import axios from "axios";
import { verifySession } from "./dal";
import { getStrapiURL } from "./utils";
import {
   AuthServiceResponse,
   ChangePasswordUser,
   LoginUser,
   RegisterUser,
   ResetPasswordUser,
} from "@/types/strapi";

export const STRAPI_BASE_URL = getStrapiURL();

export async function registerUserService(
   userData: RegisterUser,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/local/register`;

   try {
      const { data } = await axios.post(url, userData);

      return data;
   } catch (error) {
      console.error("Registration Service Error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
         throw error.response.data;
      }

      throw error;
   }
}

export async function loginUserService(
   userData: LoginUser,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/local`;

   try {
      const { data } = await axios.post(url, userData);

      return data;
   } catch (error) {
      console.error("Login Service Error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
         throw error.response.data;
      }

      throw error;
   }
}

export async function confirmEmailService(
   email: string,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/send-email-confirmation`;

   try {
      const { data } = await axios.post(url, {
         email,
      });

      return data;
   } catch (error) {
      console.error("Confirm Email Service Error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
         throw error.response.data;
      }

      throw error;
   }
}

export async function forgotPasswordService(
   email: string,
): Promise<AuthServiceResponse> {
   const url = `${STRAPI_BASE_URL}/api/auth/forgot-password`;
   try {
      const { data } = await axios.post(url, {
         email,
      });

      return data;
   } catch (error) {
      console.error("Forgot Password Service Error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
         throw error.response.data;
      }

      throw error;
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
      const { data } = await axios.post(url, payload);

      return data;
   } catch (error) {
      console.error("Reset Password Service Error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
         throw error.response.data;
      }

      throw error;
   }
}

export const changePasswordService = async (
   userData: ChangePasswordUser,
): Promise<AuthServiceResponse> => {
   const url = `${STRAPI_BASE_URL}/api/auth/change-password`;

   const payload = {
      currentPassword: userData.password,
      password: userData.newPassword,
      passwordConfirmation: userData.confirmPassword,
   };

   try {
      const result = await verifySession();

      if (!result.isAuth) {
         // nunca debería entrar porque verifySession hace redirect,
         // pero TypeScript queda satisfecho.
         throw new Error("Not authenticated");
      }

      const { jwt } = result.session;

      const { data } = await axios.post(url, payload, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });

      return data;
   } catch (error) {
      console.error("Change Password Service Error:", error);

      if (axios.isAxiosError(error) && error.response?.data) {
         throw error.response.data;
      }

      throw error;
   }
};
