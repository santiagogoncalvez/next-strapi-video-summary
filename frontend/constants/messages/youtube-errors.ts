export const YOUTUBE_ERROR_MESSAGES = {
   // Errores de Metadatos
   VIDEO_NOT_FOUND: "El video de YouTube no existe o fue eliminado.",
   VIDEO_PRIVATE: "El video es privado y no se puede acceder a su información.",
   API_ERROR: "Ocurrió un error al consultar los datos del video en YouTube.",
   NETWORK_ERROR: "Error de conexión al intentar comunicarse con YouTube.",

   // Errores de Transcripción
   TRANSCRIPT_DISABLED:
      "Este video tiene los subtítulos o transcripción desactivados.",
   TRANSCRIPT_NOT_FOUND:
      "No se encontró ninguna transcripción disponible para este video.",
   LANGUAGE_NOT_AVAILABLE:
      "La transcripción no está disponible en el idioma solicitado.",
   TOO_MANY_REQUESTS:
      "YouTube detectó demasiadas peticiones. Inténtalo de nuevo más tarde.",
   TRANSCRIPT_ERROR: "Ocurrió un error al procesar los subtítulos del video.",

   // Fallback genérico
   DEFAULT: "No se pudo obtener la información ni la transcripción del video.",
} as const;
