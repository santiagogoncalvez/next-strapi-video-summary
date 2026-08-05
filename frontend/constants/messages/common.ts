export const COMMON_MESSAGES = {
   ERROR: {
      UNKNOWN: "Ocurrió un error inesperado. Inténtalo nuevamente.",
      VALIDATION: "Hay errores en el formulario.",
      TIMEOUT: "La solicitud tardó demasiado. Inténtalo nuevamente.",
      REQUEST_FAILED: "No se pudo completar la solicitud.",
      LOAD_RESOURCE: (resource: string) => `No se pudo cargar ${resource}.`,
   },
} as const;
