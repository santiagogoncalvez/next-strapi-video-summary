export const STRAPI_ERROR_MESSAGES = {
   "Invalid identifier or password":
      "El correo o la contraseña son incorrectos.",
   "Your account email is not confirmed":
      "Tu correo electrónico todavía no está confirmado.",
   "Your account has been blocked by an administrator":
      "Tu cuenta fue bloqueada por un administrador.",
   "Email or Username are already taken":
      "El correo electrónico o nombre de usuario ya están en uso.",
   "Register action is currently disabled":
      "El registro de nuevas cuentas no está disponible.",
   "Passwords do not match": "Las contraseñas no coinciden.",
   "Incorrect code provided":
      "El código de recuperación no es válido o expiró.",
   "The provided current password is invalid":
      "La contraseña actual no es correcta.",
   "Your new password must be different than your current password":
      "La nueva contraseña debe ser diferente de la actual.",
   "Invalid token": "El enlace de confirmación no es válido o expiró.",
   "Already confirmed": "Tu correo electrónico ya está confirmado.",
   "User blocked": "Tu cuenta está bloqueada.",

   // Strapi genéricos
   ApplicationError: "Ocurrió un error al procesar la solicitud.",
   ValidationError: "Los datos enviados no son válidos.",
   YupValidationError: "Los datos enviados no son válidos.",
   PaginationError: "Los parámetros de paginación no son válidos.",
   NotFoundError: "No se encontró el recurso solicitado.",
   ForbiddenError: "No tenés permisos para realizar esta acción.",
   UnauthorizedError: "Tu sesión no es válida o ya expiró.",
   RateLimitError: "Demasiadas solicitudes. Intentá nuevamente más tarde.",
   PayloadTooLargeError: "El archivo o contenido es demasiado grande.",
   PolicyError: "No tenés permisos para realizar esta acción.",
   NotImplementedError: "Esta funcionalidad todavía no está disponible.",
} as const;
