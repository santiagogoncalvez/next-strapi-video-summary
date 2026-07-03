"use server";

import {
   changePasswordService,
   confirmEmailService,
   forgotPasswordService,
   loginUserService,
   registerUserService,
   resetPasswordService,
} from "@/lib/strapi";
import {
   changePassworSchema,
   resendConfirmEmailFormSchema,
   resetPasswordSchema,
   SigninFormSchema,
   SignupFormSchema,
} from "@/validations/auth";
import z from "zod";
import { redirect } from "next/navigation";
import { FormState } from "@/types/definitions";
import { createSession, deleteSession } from "@/lib/session";
import {
   AuthResponse,
   ChangePasswordUser,
   isStrapiError,
   RegisterUser,
   ResetPasswordUser,
} from "@/types/strapi";

export async function registerUserAction(
   prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   // console.log("registerUserAction");

   const fields = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
   };

   const validatedFields = SignupFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      const flattenedErrors = z.flattenError(validatedFields.error);

      return {
         success: false,
         message: "Validation error",
         strapiErrors: null,
         zodErrors: flattenedErrors.fieldErrors,
         data: {
            ...prevState,
            ...fields,
         },
      };
   }

   try {
      await registerUserService(validatedFields.data as RegisterUser);

      // redirect to confirm email with user email
      redirect("/auth/confirm-email?email=" + fields.email);
   } catch (error) {
      if (isStrapiError(error)) {
         return {
            success: false,
            message: error.error?.message,
            strapiErrors: error.error,
            zodErrors: null,
            data: fields,
         };
      }

      console.error(error);

      return {
         success: false,
         message: "Ops! Something went wrong. Please try again.",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
      };
   }
}

export async function loginUserAction(
   prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      identifier: formData.get("identifier") as string,
      password: formData.get("password") as string,
   };

   const validatedFields = SigninFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      const flattenedErrors = z.flattenError(validatedFields.error);

      return {
         success: false,
         message: "Validation error",
         strapiErrors: null,
         zodErrors: flattenedErrors.fieldErrors,
         data: fields,
      };
   }

   try {
      const response = await loginUserService(validatedFields.data);

      await createSession(response as AuthResponse);

      redirect("/dashboard");
   } catch (error) {
      if (isStrapiError(error)) {
         return {
            success: false,
            message: error.error?.message,
            strapiErrors: error.error,
            zodErrors: null,
            data: fields,
         };
      }

      console.error(error);

      return {
         success: false,
         message: "Ops! Something went wrong. Please try again.",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
      };
   }
}

export async function logoutUserAction() {
   await deleteSession();

   redirect("/");
}

export async function resendConfirmEmailAction(
   initialState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      email: formData.get("email") as string,
   };

   const validatedFields = resendConfirmEmailFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      const flattenedErrors = z.flattenError(validatedFields.error);

      return {
         success: false,
         message: "Validation error",
         strapiErrors: null,
         zodErrors: flattenedErrors.fieldErrors,
         data: fields,
      };
   }

   try {
      await confirmEmailService(validatedFields.data.email);

      return {
         success: true,
         message: "Confirmation email sent",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
         timestamp: Date.now(),
      };
   } catch (error) {
      if (isStrapiError(error)) {
         return {
            success: false,
            message: error.error?.message,
            strapiErrors: error.error,
            zodErrors: null,
            data: fields,
         };
      }

      console.error(error);

      return {
         success: false,
         message: "Ops! Something went wrong. Please try again.",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
      };
   }
}

export async function forgotPasswordAction(
   initialState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      email: formData.get("email") as string,
   };

   const validatedFields = resendConfirmEmailFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      const flattenedErrors = z.flattenError(validatedFields.error);

      return {
         success: false,
         message: "Validation error",
         strapiErrors: null,
         zodErrors: flattenedErrors.fieldErrors,
         data: fields,
      };
   }

   try {
      await forgotPasswordService(validatedFields.data.email);

      return {
         success: true,
         message: "An email has been sent to reset your password",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
         timestamp: Date.now(),
      };
   } catch (error) {
      if (isStrapiError(error)) {
         return {
            success: false,
            message: error.error?.message,
            strapiErrors: error.error,
            zodErrors: null,
            data: fields,
         };
      }

      console.error(error);

      return {
         success: false,
         message: "Ops! Something went wrong. Please try again.",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
      };
   }
}

export async function resetPasswordAction(
   initialState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      code: formData.get("code") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
   };

   const validatedFields = resetPasswordSchema.safeParse(fields);

   if (!validatedFields.success) {
      const flattenedErrors = z.flattenError(validatedFields.error);

      return {
         success: false,
         message: "Validation error",
         strapiErrors: null,
         zodErrors: flattenedErrors.fieldErrors,
         data: fields,
      };
   }

   try {
      await resetPasswordService(fields as ResetPasswordUser);

      return {
         success: true,
         message: "Password successfully reset",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
         timestamp: Date.now(),
      };
   } catch (error) {
      if (isStrapiError(error)) {
         return {
            success: false,
            message: error.error?.message,
            strapiErrors: error.error,
            zodErrors: null,
            data: fields,
         };
      }

      console.error(error);

      return {
         success: false,
         message: "Ops! Something went wrong. Please try again.",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
      };
   }
}

export async function changePasswordAction(
   initialState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      password: formData.get("password") as string,
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
   };

   const validatedFields = changePassworSchema.safeParse(fields);

   if (!validatedFields.success) {
      const flattenedErrors = z.flattenError(validatedFields.error);

      return {
         success: false,
         message: "Validation error",
         strapiErrors: null,
         zodErrors: flattenedErrors.fieldErrors,
         data: fields,
      };
   }

   try {
      await changePasswordService(fields as ChangePasswordUser);

      return {
         success: true,
         message: "Password reset successful",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
         timestamp: Date.now(),
      };
   } catch (error) {
      if (isStrapiError(error)) {
         return {
            success: false,
            message: error.error?.message,
            strapiErrors: error.error,
            zodErrors: null,
            data: fields,
         };
      }

      console.error(error);

      return {
         success: false,
         message: "Ops! Something went wrong. Please try again.",
         strapiErrors: null,
         zodErrors: null,
         data: fields,
      };
   }
}
