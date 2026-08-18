import { STRAPI_ERROR_MESSAGES } from "@/constants/messages/strapi-errors";
import { COMMON_MESSAGES } from "@/constants/messages/common";
import { notFound } from "next/navigation";
import {
   GROQ_DEFAULT_ERROR_MESSAGE,
   GROQ_ERROR_MESSAGES,
} from "@/constants/messages/groq-errors";
import { APICallError } from "ai";

type ApiError = {
   error?: {
      status?: number;
      message?: string;
   };
};

export function handleApiError(
   error: unknown,
   resourceName = "resource",
): never {
   const apiError = error as ApiError;

   if (apiError?.error?.status === 404) {
      notFound();
   }

   throw new Error(
      apiError?.error?.message ??
         COMMON_MESSAGES.ERROR.LOAD_RESOURCE(resourceName),
   );
}

export async function validateApiResponse<T>(
   promise: Promise<T>,
   resourceName = "resource",
): Promise<T> {
   try {
      const data = await promise;

      if (data == null) {
         throw new Error(COMMON_MESSAGES.ERROR.LOAD_RESOURCE(resourceName));
      }

      return data;
   } catch (error) {
      handleApiError(error, resourceName);
   }
}

/*
 * Para casos donde querés agregar contexto extra
 * antes de volver a propagar el error.
 */
export function handleServiceError(error: unknown, serviceName: string): never {
   console.error(`${serviceName}:`, error);

   throw error;
}

export function getStrapiErrorMessage(message: string): string {
   return (
      STRAPI_ERROR_MESSAGES[message as keyof typeof STRAPI_ERROR_MESSAGES] ??
      "No se pudo completar la operación. Intentá nuevamente."
   );
}

export function handleGroqError(error: unknown): never {
   console.error("Groq Error:", error);

   if (!APICallError.isInstance(error)) {
      throw new Error(GROQ_DEFAULT_ERROR_MESSAGE);
   }

   const statusCode = error.statusCode;

   if (statusCode && statusCode in GROQ_ERROR_MESSAGES) {
      throw new Error(
         GROQ_ERROR_MESSAGES[statusCode as keyof typeof GROQ_ERROR_MESSAGES],
      );
   }

   throw new Error(GROQ_DEFAULT_ERROR_MESSAGE);
}
