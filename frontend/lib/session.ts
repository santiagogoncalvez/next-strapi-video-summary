// Path: nextjs-frontend/src/app/auth/confirm-email/page.tsx

import "server-only";

import { JWTVerifyResult, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AuthResponse, SessionPayload } from "@/types/strapi";

// Recuperar el secreto de sesión de las variables de entorno y codificarlo.
const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// Cifra y firma la carga útil de la sesión como un JWT con una caducidad de 7 días.
export async function encrypt(payload: SessionPayload) {
   return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodedKey);
}

// Verifica y decodifica el token de sesión JWT
export async function decrypt(session: string | undefined = "") {
   // Si la cookie viene vacía o no existe, salimos inmediatamente sin romper
   // SI NO HAY COOKIE, CORRE QUE NO INTENTE VALIDAR NADA
   if (!session || session.trim() === "") return null;

   try {
      const { payload } = await jwtVerify(session, encodedKey, {
         algorithms: ["HS256"],
      });
      return payload as SessionPayload;
   } catch (error) {
      console.error(error as JWTVerifyResult);
   }
}

// Crea una nueva sesión cifrando la carga útil y almacenándola en una cookie segura.
export async function createSession(payload: AuthResponse) {
   const sessionPayload: SessionPayload = {
      ...payload,
   };

   // Cifrar la carga útil de la sesión
   const session = await encrypt(sessionPayload);

   // Configurar la cookie para que caduque en 7 días
   const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

   // Establece la cookie de sesión con la carga útil cifrada.
   const cookieStore = await cookies();

   // Establece la cookie con el token de sesión.
   cookieStore.set("session", session, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true, // Impide que JavaScript del lado del cliente acceda a la cookie.
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
   });
}

// Elimina la cookie de sesión para cerrar la sesión del usuario.
export async function deleteSession() {
   const cookieStore = await cookies();
   cookieStore.delete("session");
}