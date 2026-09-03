export type AuthAction = "login" | "signup";

export const GITHUB_OAUTH_ERRORS = {
   incorrect_client_credentials:
      "No pudimos conectar con GitHub. Intentá nuevamente más tarde.",

   email_already_taken: (action: AuthAction) =>
      action === "login"
         ? "Ya existe una cuenta con este correo electrónico. Iniciá sesión con correo electrónico y contraseña."
         : "Ya existe una cuenta con este correo electrónico. Creá una cuenta con correo electrónico y contraseña.",

   redirect_uri_mismatch: (action: AuthAction) =>
      action === "login"
         ? "No pudimos completar el inicio de sesión con GitHub."
         : "No pudimos completar la creación de tu cuenta con GitHub.",

   bad_verification_code: (action: AuthAction) =>
      action === "login"
         ? "La autorización de GitHub expiró. Intentá iniciar sesión nuevamente."
         : "La autorización de GitHub expiró. Intentá crear tu cuenta nuevamente.",

   unverified_user_email:
      "Verificá tu email principal en GitHub e intentá nuevamente.",

   application_suspended: (action: AuthAction) =>
      action === "login"
         ? "El inicio de sesión con GitHub no está disponible en este momento."
         : "La creación de cuentas con GitHub no está disponible en este momento.",

   access_denied: (action: AuthAction) =>
      action === "login"
         ? "Cancelaste el inicio de sesión con GitHub."
         : "Cancelaste la creación de tu cuenta con GitHub.",
} as const;

export const GOOGLE_OAUTH_ERRORS = {
   admin_policy_enforced:
      "Tu cuenta de Google no puede autorizar esta aplicación debido a las políticas de tu organización.",

   disallowed_useragent:
      "Google no permite iniciar sesión desde este navegador o entorno. Intentá nuevamente desde un navegador compatible.",

   org_internal: "Esta cuenta de Google no tiene acceso a esta aplicación.",

   invalid_client:
      "No pudimos conectar con Google. Intentá nuevamente más tarde.",

   email_already_taken: (action: AuthAction) =>
      action === "login"
         ? "Ya existe una cuenta con este correo electrónico. Iniciá sesión con correo electrónico y contraseña."
         : "Ya existe una cuenta con este correo electrónico. Creá una cuenta con correo electrónico y contraseña.",

   deleted_client: (action: AuthAction) =>
      action === "login"
         ? "El inicio de sesión con Google no está disponible en este momento."
         : "La creación de cuentas con Google no está disponible en este momento.",

   invalid_grant: (action: AuthAction) =>
      action === "login"
         ? "La autorización de Google expiró o dejó de ser válida. Intentá iniciar sesión nuevamente."
         : "La autorización de Google expiró o dejó de ser válida. Intentá crear tu cuenta nuevamente.",

   redirect_uri_mismatch: (action: AuthAction) =>
      action === "login"
         ? "No pudimos completar el inicio de sesión con Google."
         : "No pudimos completar la creación de tu cuenta con Google.",

   origin_mismatch: (action: AuthAction) =>
      action === "login"
         ? "No pudimos completar el inicio de sesión con Google."
         : "No pudimos completar la creación de tu cuenta con Google.",

   invalid_request: (action: AuthAction) =>
      action === "login"
         ? "No pudimos completar el inicio de sesión con Google. Intentá nuevamente."
         : "No pudimos completar la creación de tu cuenta con Google. Intentá nuevamente.",

   access_denied: (action: AuthAction) =>
      action === "login"
         ? "Cancelaste el inicio de sesión con Google."
         : "Cancelaste la creación de tu cuenta con Google.",
} as const;

const PROVIDER_NAMES = {
   google: "Google",
   github: "GitHub",
} as const;

export const OAUTH_DEFAULT_ERROR = (
   provider: keyof typeof PROVIDER_NAMES = "google",
   action: AuthAction,
) =>
   action === "login"
      ? `No pudimos completar el inicio de sesión con ${PROVIDER_NAMES[provider]}. Intentá nuevamente.`
      : `No pudimos completar la creación de tu cuenta con ${PROVIDER_NAMES[provider]}. Intentá nuevamente.`;
