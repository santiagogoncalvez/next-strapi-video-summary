import { STRAPI_ERROR_MESSAGES } from "@/constants/messages/strapi-errors";
import { COMMON_MESSAGES } from "@/constants/messages/common";
import { notFound } from "next/navigation";

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

export function getAuthErrorMessage(message: string): string {
   return (
      STRAPI_ERROR_MESSAGES[message as keyof typeof STRAPI_ERROR_MESSAGES] ??
      "No se pudo completar la operación. Intentá nuevamente."
   );
}
