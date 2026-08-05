// constants/messages/auth.ts

export const AUTH_MESSAGES = {
   SUCCESS: {
      EMAIL_CONFIRMATION_SENT:
         "Se envió el correo de confirmación correctamente.",

      PASSWORD_RESET_EMAIL_SENT:
         "Se envió un correo para restablecer tu contraseña.",

      PASSWORD_RESET: "La contraseña se restableció correctamente.",

      PASSWORD_CHANGED: "La contraseña se actualizó correctamente.",

      ACCOUNT_CONFIRMED: "La cuenta se confirmó correctamente.",
   },

} as const;
