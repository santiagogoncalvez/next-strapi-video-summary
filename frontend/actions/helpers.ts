import { FormState } from "@/types/definitions";
import { isStrapiError } from "@/types/strapi";

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
