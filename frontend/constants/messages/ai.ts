export const AI_ERROR_MESSAGES = {
   STATUS: {
      400: "La solicitud al servicio de IA no es válida.",
      403: "El servicio de IA no permite realizar esta solicitud.",
      404: "No se encontró el recurso solicitado por el servicio de IA.",
      429: "Alcanzaste temporalmente el límite de uso del servicio de IA. Intentá nuevamente más tarde.",
      499: "La solicitud al servicio de IA fue cancelada.",
      500: "El servicio de IA tuvo un problema interno. Intentá nuevamente.",
      503: "El servicio de IA no está disponible en este momento. Intentá nuevamente más tarde.",
      504: "El servicio de IA tardó demasiado en procesar la solicitud. Intentá nuevamente.",
   } satisfies Record<number, string>,

   DEFAULT: "No se pudo generar el resumen. Intentá nuevamente.",
} as const;
