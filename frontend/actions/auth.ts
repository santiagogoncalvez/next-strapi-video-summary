"use server";

import { services } from "@/services";
import { redirect } from "next/navigation";
import { FormState } from "@/types/definitions";
import { createSession, deleteSession } from "@/lib/session";
import {
   getSuccessFormState,
   getValidationErrorState,
   handleActionError,
} from "./helpers";
import { changePassworSchema, resendConfirmEmailFormSchema, resetPasswordSchema, SigninFormSchema, SignupFormSchema } from "@/validations/auth";

export async function registerUserAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
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

   const { username, email, password } = validatedFields.data;

   try {
      await services.auth.registerUserService({ username, email, password });
   } catch (error) {
      return handleActionError(error, fields);
   }

   // redirect to confirm email with user email
   redirect("/auth/confirm-email?email=" + fields.email);
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
      const response = await services.auth.loginUserService(validatedFields.data);
      console.log("loginUserAction:", response);

      await createSession(response);
   } catch (error) {
      return handleActionError(error, fields);
   }

   redirect("/dashboard");
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
      await services.auth.confirmEmailService(validatedFields.data.email);
   } catch (error) {
      return handleActionError(error, fields);
   }

   return getSuccessFormState("Confirmation email sent", fields);
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
      await services.auth.forgotPasswordService(validatedFields.data.email);
   } catch (error) {
      return handleActionError(error, fields);
   }

   return getSuccessFormState(
      "An email has been sent to reset your password",
      fields,
   );
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
      await services.auth.resetPasswordService(fields);
   } catch (error) {
      return handleActionError(error, fields);
   }
   return getSuccessFormState("Password reset successfully", fields);
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
      await services.auth.changePasswordService(fields);
   } catch (error) {
      return handleActionError(error, fields);
   }

   return getSuccessFormState("Password changed successfully", fields);
}
