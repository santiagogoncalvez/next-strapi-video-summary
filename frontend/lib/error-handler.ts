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
      apiError?.error?.message ?? `Failed to load ${resourceName}`,
   );
}

export function validateApiResponse<T>(
   data: T | null | undefined,
   resourceName = "resource",
): T {
   if (data == null) {
      throw new Error(`Failed to load ${resourceName}`);
   }

   return data;
}

/*
 * Para casos donde querés agregar contexto extra
 * antes de volver a propagar el error.
 */
export function handleServiceError(error: unknown, serviceName: string): never {
   console.error(`${serviceName}:`, error);

   throw error;
}
