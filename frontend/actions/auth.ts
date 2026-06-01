"use server"

import { registerUserService } from "@/lib/strapi";
import { FormState, SignupFormSchema } from "@/validations/auth";
import z from "zod";



export async function registerUserAction(prevState: FormState, formData: FormData): Promise<FormState> {
    console.log("registerUserAction");

    const fields = {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
        email: formData.get('email') as string,
    };

    const validatedFields = SignupFormSchema.safeParse(fields);
    
    if (!validatedFields.success) {
        const flattenedErrors = z.flattenError(validatedFields.error);

        console.log("Validation errors:", flattenedErrors.fieldErrors);

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

    const response = await registerUserService(validatedFields.data);
    
    if (!response || response.error) {
        return {
            success: false,
            message: "Registration error",
            strapiErrors: response?.error,
            zodErrors: null,
            data: fields
        }
    }

    return {
        success: true,
        message: "Registration successful",
        strapiErrors: null,
        zodErrors: null,
        data: fields
    }
} 