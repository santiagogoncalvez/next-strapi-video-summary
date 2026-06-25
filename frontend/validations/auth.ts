import { Credentials } from "@/lib/definitions";
import { z } from "zod";

export const SigninFormSchema = z.object({
    identifier: z
        .string()
        .min(3, "El nombre de usuario o correo electrónico debe tener al menos 3 caracteres"),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres.")
        .max(100, "La contraseña debe tener menos de 100 caracteres."),
});

export const SignupFormSchema = z.object({
    username: z
        .string()
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres.")
        .max(20, "El nombre de usuario debe tener menos de 20 caracteres."),
    email: z.email("Por favor, introduce una dirección de correo electrónico válida"),
    password: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres.")
        .max(100, "La contraseña debe tener menos de 100 caracteres."),
    confirmPassword: z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres.")
        .max(100, "La contraseña debe tener menos de 100 caracteres."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export const resendConfirmEmailFormSchema = z.object({
    email: z.email("Por favor, introduce una dirección de correo electrónico válida"),

})

export type SigninFormValues = z.infer<typeof SigninFormSchema>;
export type SignupFormValues = z.infer<typeof SignupFormSchema>;

export type FormState = {
    success?: boolean;
    message?: string;
    data?: Credentials;
    strapiErrors?: {
        status: number;
        name: string;
        message: string;
        details?: Record<string, string[]>;
    } | null;
    zodErrors?: {
        identifier?: string[];
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    } | null;
    timestamp?: number,
};