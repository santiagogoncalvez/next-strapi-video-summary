// constants/messages/validations/auth.ts

export const AUTH_VALIDATION_MESSAGES = {
   USERNAME: {
      MIN: (value: number) =>
         `El usuario debe tener al menos ${value} caracteres.`,

      MAX: (value: number) =>
         `El usuario debe tener menos de ${value} caracteres.`,
   },

   IDENTIFIER: {
      MIN: (value: number) =>
         `El usuario o correo electrónico debe tener al menos ${value} caracteres.`,
   },

   EMAIL: {
      INVALID: "Ingresa un correo electrónico válido.",
   },

   PASSWORD: {
      MIN: (value: number) =>
         `La contraseña debe tener al menos ${value} caracteres.`,

      MAX: (value: number) =>
         `La contraseña debe tener menos de ${value} caracteres.`,

      MATCH: "Las contraseñas no coinciden.",
   },

   PASSWORD_RESET: {
      INVALID_CODE: "El código para restablecer la contraseña no es válido.",
   },
} as const;
