import { STRAPI_ERROR_MESSAGES } from "@/constants/messages/strapi-errors";
import { COMMON_MESSAGES } from "@/constants/messages/common";
import { throwError } from "@/lib/utils";
import { getAuthErrorMessage } from "@/services/error-handler";
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
         timestamp: Date.now(),
         data,
      };
   }

   if (error instanceof Error) {
      return {
         success: false,
         message: error.message,
         strapiErrors: null,
         zodErrors: null,
         timestamp: Date.now(),
         data,
      };
   }

   return {
      success: false,
      message: COMMON_MESSAGES.ERROR.UNKNOWN,
      strapiErrors: null,
      zodErrors: null,
      timestamp: Date.now(),
      data,
   };
}

export function getValidationErrorState(
   error: z.ZodError,
   data: FormState["data"],
): FormState {
   return {
      success: false,
      message: COMMON_MESSAGES.ERROR.VALIDATION,
      strapiErrors: null,
      zodErrors: z.flattenError(error).fieldErrors,
      timestamp: Date.now(),
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

export function getFormErrorMessage(state: FormState): string | null {
   const errors = new Set<string>();

   // 1. Mensaje general
   if (state.message) {
      errors.add(state.message);
   }

   // 2. Errores de Zod
   if (state.zodErrors) {
      Object.values(state.zodErrors).forEach((fieldErrors) => {
         if (!fieldErrors) return;

         fieldErrors.forEach((error: string) => {
            if (error) {
               errors.add(error);
            }
         });
      });
   }

   // 3. Errores de Strapi
   if (state.strapiErrors) {
      if (state.strapiErrors.message) {
         errors.add(state.strapiErrors.message);
      }

      if (state.strapiErrors.details) {
         Object.values(state.strapiErrors.details).forEach((fieldErrors) => {
            fieldErrors.forEach((error) => {
               if (error) {
                  errors.add(error);
               }
            });
         });
      }
   }

   return errors.size > 0 ? [...errors].join(" ") : null;
}

export function handleStrapiError(error: unknown): never {
   if (!isStrapiError(error)) {
      throw error;
   }

   const message = getAuthErrorMessage(
      error.error?.message as keyof typeof STRAPI_ERROR_MESSAGES,
   );

   throwError(message);
}
