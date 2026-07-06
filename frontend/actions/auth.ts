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
import { redirect } from "next/navigation";
import { FormState } from "@/types/definitions";
import { createSession, deleteSession } from "@/lib/session";
import {
   getSuccessFormState,
   getValidationErrorState,
   handleActionError,
} from "./helpers";

export async function registerUserAction(
   _prevState: FormState,
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
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await registerUserService(validatedFields.data);

      // redirect to confirm email with user email
      redirect("/auth/confirm-email?email=" + fields.email);
   } catch (error) {
      return handleActionError(error, fields);
   }
}

export async function loginUserAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      identifier: formData.get("identifier") as string,
      password: formData.get("password") as string,
   };

   const validatedFields = SigninFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      const response = await loginUserService(validatedFields.data);

      await createSession(response);

      redirect("/dashboard");
   } catch (error) {
      return handleActionError(error, fields);
   }
}

export async function logoutUserAction() {
   await deleteSession();

   redirect("/");
}

export async function resendConfirmEmailAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      email: formData.get("email") as string,
   };

   const validatedFields = resendConfirmEmailFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await confirmEmailService(validatedFields.data.email);

      return getSuccessFormState("Confirmation email sent", fields);
   } catch (error) {
      return handleActionError(error, fields);
   }
}

export async function forgotPasswordAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      email: formData.get("email") as string,
   };

   const validatedFields = resendConfirmEmailFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await forgotPasswordService(validatedFields.data.email);

      return getSuccessFormState(
         "An email has been sent to reset your password",
         fields,
      );
   } catch (error) {
      return handleActionError(error, fields);
   }
}

export async function resetPasswordAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      code: formData.get("code") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
   };

   const validatedFields = resetPasswordSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await resetPasswordService(fields);

      return getSuccessFormState("Password successfully reset", fields);
   } catch (error) {
      return handleActionError(error, fields);
   }
}

export async function changePasswordAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      password: formData.get("password") as string,
      newPassword: formData.get("newPassword") as string,
      confirmPassword: formData.get("confirmPassword") as string,
   };

   const validatedFields = changePassworSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await changePasswordService(fields);

      return getSuccessFormState("Password successfully changed", fields);
   } catch (error) {
      return handleActionError(error, fields);
   }
}
