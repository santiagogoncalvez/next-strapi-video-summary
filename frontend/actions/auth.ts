"use server"

import { loginUserService, registerUserService } from "@/lib/strapi";
import { FormState, SigninFormSchema, SignupFormSchema } from "@/validations/auth";
import z from "zod";
import { redirect } from "next/navigation";
import { removeAuthCookie, setAuthCookie } from "@/lib/auth";
import { Credentials } from "@/lib/definitions";


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

        // console.log("Validation errors:", flattenedErrors.fieldErrors);

        return {
            success: false,
            message: "Validation error.",
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

    // await setAuthCookie(response.jwt);

    // redirect to confirm email
    redirect("/auth/confirm-email");
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
            message: "Validation error",
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

    await setAuthCookie(response.jwt);

    redirect("/dashboard");
}

export async function logoutUserAction() {
    await removeAuthCookie();

    redirect("/auth/login");
}