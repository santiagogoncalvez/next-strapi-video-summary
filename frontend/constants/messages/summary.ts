export const SUMMARY_MESSAGES = {
   SUCCESS: {
      CREATED: "Resumen generado correctamente.",
      UPDATED: "Resumen actualizado correctamente.",
      DELETED: "Resumen eliminado correctamente.",
      UPDATED_TITLE: "Título actualizado correctamente.",
   },

   loading: {
      CREATING: "Creando resumen...",
   },

   ERROR: {
      INSUFFICIENT_CREDITS:
         "No tienes créditos suficientes para generar un resumen.",
      TRANSCRIPT_NOT_FOUND: "No se pudo obtener la transcripción del video.",
      VIDEO_TOO_LONG: "El video no puede superar los 60 minutos de duración.",
      SUMMARY_NOT_GENERATED: "No se pudo generar el resumen del video.",
      GENERATION_FAILED: "No se pudo generar el resumen.",
      TOKEN_LIMIT_EXCEEDED:
         "El contenido del video es demasiado grande para generar el resumen.",
      RATE_LIMIT_EXCEEDED:
         "Estás haciendo demasiadas solicitudes. Intentá nuevamente en unos minutos.",
   },
} as const;
