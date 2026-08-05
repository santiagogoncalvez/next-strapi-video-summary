import { AUTH_VALIDATION_MESSAGES } from "@/constants/validations/auth";
import { z } from "zod";

export const SigninFormSchema = z.object({
   identifier: z.string().min(3, AUTH_VALIDATION_MESSAGES.IDENTIFIER.MIN(3)),
   password: z
      .string()
      .min(6, AUTH_VALIDATION_MESSAGES.PASSWORD.MIN(6))
      .max(100, AUTH_VALIDATION_MESSAGES.PASSWORD.MAX(100)),
});

export const SignupFormSchema = z
   .object({
      username: z
         .string()
         .min(3, AUTH_VALIDATION_MESSAGES.USERNAME.MIN(3))
         .max(20, AUTH_VALIDATION_MESSAGES.USERNAME.MAX(20)),
      email: z.email(AUTH_VALIDATION_MESSAGES.EMAIL.INVALID),
      password: z
         .string()
         .min(6, AUTH_VALIDATION_MESSAGES.PASSWORD.MIN(6))
         .max(100, AUTH_VALIDATION_MESSAGES.PASSWORD.MAX(100)),
      confirmPassword: z
         .string()
         .min(6, AUTH_VALIDATION_MESSAGES.PASSWORD.MIN(6))
         .max(100, AUTH_VALIDATION_MESSAGES.PASSWORD.MAX(100)),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: AUTH_VALIDATION_MESSAGES.PASSWORD.MATCH,
      path: ["confirmPassword"],
   });

export const resendConfirmEmailFormSchema = z.object({
   email: z.email(AUTH_VALIDATION_MESSAGES.EMAIL.INVALID),
});

export const resetPasswordSchema = z
   .object({
      code: z
         .string()
         .min(1, AUTH_VALIDATION_MESSAGES.PASSWORD_RESET.INVALID_CODE),
      password: z
         .string()
         .min(6, AUTH_VALIDATION_MESSAGES.PASSWORD.MIN(6))
         .max(100, AUTH_VALIDATION_MESSAGES.PASSWORD.MAX(100)),
      confirmPassword: z
         .string()
         .min(6, AUTH_VALIDATION_MESSAGES.PASSWORD.MIN(6))
         .max(100, AUTH_VALIDATION_MESSAGES.PASSWORD.MAX(100)),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: AUTH_VALIDATION_MESSAGES.PASSWORD.MATCH,
      path: ["confirmPassword"],
   });

export const changePassworSchema = z
   .object({
      password: z
         .string()
         .min(6, AUTH_VALIDATION_MESSAGES.PASSWORD.MIN(6))
         .max(100, AUTH_VALIDATION_MESSAGES.PASSWORD.MAX(100)),
      newPassword: z
         .string()
         .min(6, AUTH_VALIDATION_MESSAGES.PASSWORD.MIN(6))
         .max(100, AUTH_VALIDATION_MESSAGES.PASSWORD.MAX(100)),
      confirmPassword: z
         .string()
         .min(6, AUTH_VALIDATION_MESSAGES.PASSWORD.MIN(6))
         .max(100, AUTH_VALIDATION_MESSAGES.PASSWORD.MAX(100)),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: AUTH_VALIDATION_MESSAGES.PASSWORD.MATCH,
      path: ["confirmPassword"],
   });

export type SigninFormValues = z.infer<typeof SigninFormSchema>;
export type SignupFormValues = z.infer<typeof SignupFormSchema>;

interface ZodError {
   identifier?: string[];
   username?: string[];
   email?: string[];
   password?: string[];
   confirmPassword?: string[];
   newPassword?: string[];
   firstName?: string[];
   lastName?: string[];
   bio?: string[];
   image?: string[];
   videoId?: string[];
   title?: string[];
   content?: string[];
}

export type ZodErrors = ZodError | null;
