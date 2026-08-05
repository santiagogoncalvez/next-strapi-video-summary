export const SUMMARY_VALIDATION_MESSAGES = {
   VIDEO: {
      REQUIRED: "Debes ingresar un video de YouTube.",
      INVALID: "Ingresa una URL o ID de YouTube válido.",
   },

   TITLE: {
      REQUIRED: "El título es obligatorio.",
      MAX: (value: number) =>
         `El título debe tener menos de ${value} caracteres.`,
   },

   CONTENT: {
      MIN: (value: number) =>
         `El contenido debe tener al menos ${value} caracteres.`,
      MAX: (value: number) =>
         `El contenido debe tener menos de ${value.toLocaleString()} caracteres.`,
   },

   DOCUMENT: {
      REQUIRED: "No se encontró el resumen.",
   },
} as const;
