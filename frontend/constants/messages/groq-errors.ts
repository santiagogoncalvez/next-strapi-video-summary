export const GROQ_ERROR_MESSAGES = {
   REQUEST_TOO_LARGE:
      "El contenido es demasiado grande para generar este resumen.",

   TOKEN_RATE_LIMIT:
      "Alcanzaste temporalmente el límite de uso del servicio de IA. Intentá nuevamente más tarde.",

   STATUS: {
      400: "La solicitud al servicio de IA no es válida.",
      401: "No se pudo autenticar con el servicio de IA.",
      403: "El servicio de IA no permite realizar esta solicitud.",
      404: "No se encontró el modelo de IA solicitado.",
      422: "El servicio de IA no pudo procesar la solicitud.",
      424: "El servicio de IA no pudo completar una dependencia requerida.",
      498: "El servicio de IA está temporalmente saturado. Intentá nuevamente más tarde.",
      499: "La solicitud al servicio de IA fue cancelada.",
      500: "El servicio de IA tuvo un problema interno. Intentá nuevamente.",
      502: "El servicio de IA no respondió correctamente. Intentá nuevamente.",
      503: "El servicio de IA no está disponible en este momento. Intentá nuevamente más tarde.",
   } satisfies Record<number, string>,

   DEFAULT: "No se pudo generar el resumen. Intentá nuevamente.",
} as const;
