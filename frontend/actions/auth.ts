"use server"

import { changePasswordRequest, confirmEmailRequest, forgotPasswordRequest, loginUserService, registerUserService, resetPasswordRequest } from "@/lib/strapi";
import { changePassworSchema, FormState, isStrapiThrowError, resendConfirmEmailFormSchema, resetPasswordSchema, SigninFormSchema, SignupFormSchema } from "@/validations/auth";
import z from "zod";
import { redirect } from "next/navigation";
import { Credentials } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { RegisterUser } from "@/types/strapi";


export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
    // console.log("registerUserAction");

    const fields = {
        username: formData.get('username') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    };

    const validatedFields = SignupFormSchema.safeParse(fields);

    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error);

        // console.log("Error de validacións:", flattenedErrors.fieldErrors);

        return {
            success: false,
            message: "Error de validación",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: {
                ...prevState,
                ...fields,
            }
        }
    }

    try {
        const response = await registerUserService(validatedFields.data as RegisterUser);

        // redirect to confirm email with user email
        redirect("/auth/confirm-email?email=" + fields.email);
    } catch (error) {
        if (isStrapiThrowError(error)) {
            return {
                success: false,
                message: error?.error?.message,
                strapiErrors: error?.error,
                zodErrors: null,
                data: fields,
            };
        }

        throw error;
    }
}

export async function loginUserAction(
    prevState: FormState,
    formData: FormData,
): Promise<FormState> {
    const fields = {
        identifier: formData.get("identifier") as string,
        password: formData.get("password") as string,
    }

    const validatedFields = SigninFormSchema.safeParse(fields);


    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: "Error de validación",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }

    try {
        const response = await loginUserService(validatedFields.data);

        await createSession(response);

        redirect("/dashboard");
    } catch (error) {
        if (isStrapiThrowError(error)) {
            return {
                success: false,
                message: error?.error?.message,
                strapiErrors: error?.error,
                zodErrors: null,
                data: fields,
            };
        }

        throw error;
    }
}

export async function logoutUserAction() {
    await deleteSession();

    redirect("/");
}

export async function resendConfirmEmailAction(
    initialState: FormState,
    formData: FormData
): Promise<FormState> {
    const fields = {
        email: formData.get("email") as string,
    }

    const validatedFields = resendConfirmEmailFormSchema.safeParse(fields);


    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: "Error de validación",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }

    try {
        const response = await confirmEmailRequest(validatedFields.data.email);

        return {
            success: true,
            message: "Correo electrónico de confirmación enviado",
            strapiErrors: null,
            zodErrors: null,
            data: fields,
            timestamp: Date.now(),
        }
    } catch (error) {
        if (isStrapiThrowError(error)) {
            return {
                success: false,
                message: error?.error?.message,
                strapiErrors: error?.error,
                zodErrors: null,
                data: fields,
            };
        }

        throw error;
    }
}

export async function forgotPasswordAction(
    initialState: FormState,
    formData: FormData
): Promise<FormState> {
    const fields = {
        email: formData.get("email") as string,
    }

    const validatedFields = resendConfirmEmailFormSchema.safeParse(fields);


    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: "Error de validación",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }

    try {
        const response = await forgotPasswordRequest(validatedFields.data.email);

        return {
            success: true,
            message: "Se ha enviado un correo electrónico para restablecer la contraseña",
            strapiErrors: null,
            zodErrors: null,
            data: fields,
            timestamp: Date.now(),
        }
    } catch (error) {
        if (isStrapiThrowError(error)) {
            return {
                success: false,
                message: error?.error?.message,
                strapiErrors: error?.error,
                zodErrors: null,
                data: fields,
            };
        }

        throw error;
    }
}

export async function resetPasswordAction(
    initialState: FormState,
    formData: FormData
): Promise<FormState> {
    const fields = {
        code: formData.get("code") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    }

    const validatedFields = resetPasswordSchema.safeParse(fields);


    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: "Error de validación",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }

    try {
        const response = await resetPasswordRequest(fields as Credentials);

        return {
            success: true,
            message: "¡Contraseña restablecida con éxito!",
            strapiErrors: null,
            zodErrors: null,
            data: fields,
            timestamp: Date.now(),
        }
    } catch (error) {
        if (isStrapiThrowError(error)) {
            return {
                success: false,
                message: error?.error?.message,
                strapiErrors: error?.error,
                zodErrors: null,
                data: fields,
            };
        }

        throw error;
    }
}

export async function changePasswordAction(
    initialState: FormState,
    formData: FormData
): Promise<FormState> {
    const fields = {
        password: formData.get("password") as string,
        newPassword: formData.get("newPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    }

    const validatedFields = changePassworSchema.safeParse(fields);


    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error);

        return {
            success: false,
            message: "Error de validación",
            strapiErrors: null,
            zodErrors: flattenedErrors.fieldErrors,
            data: fields,
        }
    }

    try {
        const response = await changePasswordRequest(fields as Credentials);

        return {
            success: true,
            message: "Restablecimiento de contraseña exitosa!",
            strapiErrors: null,
            zodErrors: null,
            data: fields,
            timestamp: Date.now(),
        }
    } catch (error) {
        if (isStrapiThrowError(error)) {
            return {
                success: false,
                message: error?.error?.message,
                strapiErrors: error?.error,
                zodErrors: null,
                data: fields,
            };
        }

        throw error;
    }
}