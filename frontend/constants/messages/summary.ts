export const SUMMARY_MESSAGES = {
   SUCCESS: {
      CREATED: "Resumen generado correctamente.",
      UPDATED: "Resumen actualizado correctamente.",
      DELETED: "Resumen eliminado correctamente.",
   },

   loading: {
      CREATING: "Creando resumen...",
   },

   ERROR: {
      INSUFFICIENT_CREDITS:
         "No tienes créditos suficientes para generar un resumen.",
      TRANSCRIPT_NOT_FOUND: "No se pudo obtener la transcripción del video.",
      SUMMARY_NOT_GENERATED: "No se pudo generar el resumen del video.",
   },
} as const;
