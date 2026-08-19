import { STRAPI_ERROR_MESSAGES } from "@/constants/messages/strapi-errors";
import { COMMON_MESSAGES } from "@/constants/messages/common";
import { notFound } from "next/navigation";
import { GROQ_ERROR_MESSAGES } from "@/constants/messages/groq-errors";
import { APICallError, RetryError } from "ai";
import {
   YouTubeMetadataError,
   YouTubeTranscriptError,
} from "@santiagogoncalvez1/youtube-transcript-plus";
import { TRANSCRIPT_MESSAGES } from "@/constants/messages/transcript";
import { YouTubeServiceError } from "@/errors/youtube-service-error";

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

interface GroqErrorData {
   error?: {
      type?: string;
      code?: string;
   };
}

function isGroqErrorData(value: unknown): value is GroqErrorData {
   return typeof value === "object" && value !== null;
}

function getAPICallError(error: unknown): APICallError | null {
   if (APICallError.isInstance(error)) {
      return error;
   }

   if (RetryError.isInstance(error)) {
      if (APICallError.isInstance(error.lastError)) {
         return error.lastError;
      }

      return (
         error.errors.find((error) => APICallError.isInstance(error)) ?? null
      );
   }

   return null;
}

export function handleGroqError(error: unknown): never {
   console.error("Groq Error:", error);

   const apiError = getAPICallError(error);

   if (!apiError) {
      throw new Error(GROQ_ERROR_MESSAGES.DEFAULT);
   }

   const errorData = isGroqErrorData(apiError.data) ? apiError.data : undefined;

   // Límite de tokens por minuto
   if (apiError.statusCode === 429 && errorData?.error?.type === "tokens") {
      throw new Error(GROQ_ERROR_MESSAGES.TOKEN_RATE_LIMIT);
   }

   // Request individual demasiado grande
   if (apiError.statusCode === 413) {
      throw new Error(GROQ_ERROR_MESSAGES.REQUEST_TOO_LARGE);
   }

   const statusCode = apiError.statusCode;

   if (statusCode !== undefined) {
      const statusMessage =
         GROQ_ERROR_MESSAGES.STATUS[
            statusCode as keyof typeof GROQ_ERROR_MESSAGES.STATUS
         ];

      if (statusMessage) {
         throw new Error(statusMessage);
      }
   }

   throw new Error(GROQ_ERROR_MESSAGES.DEFAULT);
}

export function handleYouTubeError(error: unknown): never {
   console.error("YouTube Error Handler:", error);

   // 1. Error del Servicio de Producción (Axios)
   if (error instanceof YouTubeServiceError) {
      const messageMap: Record<string, string> = {
         VIDEO_ID_REQUIRED: TRANSCRIPT_MESSAGES.ERROR.VIDEO_ID_REQUIRED,
         INVALID_VIDEO_ID: TRANSCRIPT_MESSAGES.ERROR.INVALID_VIDEO_ID,
         NOT_FOUND: TRANSCRIPT_MESSAGES.ERROR.NOT_FOUND,
         NO_TRANSCRIPT: TRANSCRIPT_MESSAGES.ERROR.NO_TRANSCRIPT,
         EMPTY_TRANSCRIPT: TRANSCRIPT_MESSAGES.ERROR.EMPTY,
         RATE_LIMIT: TRANSCRIPT_MESSAGES.ERROR.RATE_LIMIT,
         TIMEOUT: TRANSCRIPT_MESSAGES.ERROR.TIMEOUT,
         SERVICE_UNAVAILABLE: TRANSCRIPT_MESSAGES.ERROR.SERVICE_UNAVAILABLE,
      };

      throw new Error(
         messageMap[error.code] ?? TRANSCRIPT_MESSAGES.ERROR.UNKNOWN,
      );
   }

   // 2. Errores del Módulo NPM (Local / SDK)
   if (error instanceof YouTubeMetadataError) {
      if (error.code === "VIDEO_NOT_FOUND")
         throw new Error(TRANSCRIPT_MESSAGES.ERROR.NOT_FOUND);
      if (error.code === "VIDEO_PRIVATE")
         throw new Error(TRANSCRIPT_MESSAGES.ERROR.INVALID_VIDEO_ID);
   }

   if (error instanceof YouTubeTranscriptError) {
      if (error.code === "TRANSCRIPT_DISABLED")
         throw new Error(TRANSCRIPT_MESSAGES.ERROR.NO_TRANSCRIPT);
      if (error.code === "TOO_MANY_REQUESTS")
         throw new Error(TRANSCRIPT_MESSAGES.ERROR.RATE_LIMIT);
   }

   throw new Error(TRANSCRIPT_MESSAGES.ERROR.UNKNOWN);
}
