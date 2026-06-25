"use server"

import { confirmEmailRequest, loginUserService, registerUserService } from "@/lib/strapi";
import { FormState, resendConfirmEmailFormSchema, SigninFormSchema, SignupFormSchema } from "@/validations/auth";
import z from "zod";
import { redirect } from "next/navigation";
import { Credentials } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";


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

    const response: any = await registerUserService(validatedFields.data as Credentials);

    if (!response || response.error) {
        return {
            success: false,
            message: "Registration error",
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields as Credentials
        }
    }

    // redirect to confirm email with user email
    redirect("/auth/confirm-email?email=" + fields.email);
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

    const response = await loginUserService(validatedFields.data);

    if (!response || response.error) {
        return {
            success: false,
            message: "Login error",
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields
        }
    }

    // console.log("response loginUserAction:", response);

    await createSession(response);

    redirect("/dashboard");
}

export async function logoutUserAction() {
    await deleteSession();

    redirect("/auth/login");
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

    const response = await confirmEmailRequest(validatedFields.data.email);

    if (!response || response.error) {
        return {
            success: false,
            message: "Error en la solicitud de confirmar correo electrónico",
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields
        }
    }

    return {
        success: true,
        message: "Correo electrónico de confirmación enviado",
        strapiErrors: null,
        zodErrors: null,
        data: fields,
        timestamp: Date.now(),
    }
}