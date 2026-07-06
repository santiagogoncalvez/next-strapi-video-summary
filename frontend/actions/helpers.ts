import { FormState } from "@/types/definitions";
import { isStrapiError } from "@/types/strapi";
import z from "zod";

export function handleActionError(
   error: unknown,
   data: FormState["data"],
): FormState {
   if (isStrapiError(error)) {
      return {
         success: false,
         message: error.error?.message,
         strapiErrors: error.error,
         zodErrors: null,
         data,
      };
   }

   console.error(error);

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