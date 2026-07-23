import { z } from "zod";

export const SigninFormSchema = z.object({
   identifier: z
      .string()
      .min(
         3,
         "The username or email address must be at least 3 characters long",
      ),
   password: z
      .string()
      .min(6, "The password must be at least 6 characters long")
      .max(100, "The password must be less than 100 characters"),
});

export const SignupFormSchema = z
   .object({
      username: z
         .string()
         .min(3, "The username must be at least 3 characters long")
         .max(20, "The username must be less than 20 characters"),
      email: z.email("Please enter a valid email address"),
      password: z
         .string()
         .min(6, "The password must be at least 6 characters long")
         .max(100, "The password must be less than 100 characters"),
      confirmPassword: z
         .string()
         .min(6, "The password must be at least 6 characters long")
         .max(100, "The password must be less than 100 characters"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "The passwords do not match",
      path: ["confirmPassword"],
   });

export const resendConfirmEmailFormSchema = z.object({
   email: z.email("Please enter a valid email address"),
});

export const resetPasswordSchema = z
   .object({
      code: z.string().min(1, "Password reset error"),
      password: z
         .string()
         .min(6, "The password must be at least 6 characters long")
         .max(100, "The password must be less than 100 characters"),
      confirmPassword: z
         .string()
         .min(6, "The password must be at least 6 characters long")
         .max(100, "The password must be less than 100 characters"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "The passwords do not match",
      path: ["confirmPassword"],
   });

export const changePassworSchema = z
   .object({
      password: z
         .string()
         .min(6, "The password must be at least 6 characters long")
         .max(100, "The password must be less than 100 characters"),
      newPassword: z
         .string()
         .min(6, "The password must be at least 6 characters long")
         .max(100, "The password must be less than 100 characters"),
      confirmPassword: z
         .string()
         .min(6, "The password must be at least 6 characters long")
         .max(100, "The password must be less than 100 characters"),
   })
   .refine((data) => data.newPassword === data.confirmPassword, {
      message: "The passwords do not match",
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
