import { FormState } from "@/types/definitions";
import { isStrapiError } from "@/types/strapi";
import z from "zod";

export function handleActionError(
   error: unknown,
   data: FormState["data"],
): FormState {
   console.error(error);

   if (isStrapiError(error)) {
      return {
         success: false,
         message: error.error?.message,
         strapiErrors: error.error,
         zodErrors: null,
         data,
      };
   }

   if (error instanceof Error) {
      return {
         success: false,
         message: error.message,
         strapiErrors: null,
         zodErrors: null,
         data,
      };
   }

   return {
      success: false,
      message: "Ops! Something went wrong. Please try again.",
      strapiErrors: null,
      zodErrors: null,
      data,
   };
}

export function getValidationErrorState(
   error: z.ZodError,
   data: FormState["data"],
): FormState {
   return {
      success: false,
      message: "Validation error",
      strapiErrors: null,
      zodErrors: z.flattenError(error).fieldErrors,
      data,
   };
}

export function getSuccessFormState(
   message: string,
   data: FormState["data"],
): FormState {
   return {
      success: true,
      message,
      strapiErrors: null,
      zodErrors: null,
      data,
      timestamp: Date.now(),
   };
}
