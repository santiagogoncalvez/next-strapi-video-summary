export const PROFILE_VALIDATION_MESSAGES = {
   FIRST_NAME: {
      REQUIRED: "El nombre es obligatorio.",
      MAX: (value: number) =>
         `El nombre debe tener menos de ${value} caracteres.`,
   },

   LAST_NAME: {
      REQUIRED: "El apellido es obligatorio.",
      MAX: (value: number) =>
         `El apellido debe tener menos de ${value} caracteres.`,
   },

   BIO: {
      MIN: (value: number) =>
         `La descripción debe tener al menos ${value} caracteres.`,
      MAX: (value: number) =>
         `La descripción debe tener menos de ${value} caracteres.`,
   },

   IMAGE: {
      REQUIRED: "La imagen es obligatoria.",
      MAX_SIZE: (value: number) => `La imagen debe pesar menos de ${value}MB.`,
      INVALID_FORMAT: "La imagen debe estar en formato JPEG, PNG o WebP.",
   },
} as const;
