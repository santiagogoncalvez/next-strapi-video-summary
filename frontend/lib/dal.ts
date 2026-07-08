import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";
import { decrypt } from "./session";
import { VerifySessionResult } from "@/types/definitions";
import { redirect } from "next/navigation";

export const verifySession = cache(async (): Promise<VerifySessionResult> => {
   const cookie = (await cookies()).get("session")?.value;

   const session = await decrypt(cookie);

   // Si no hay cookie, no se pudo desencriptar o no existe el JWT, no está autenticado
   if (!session || !session.jwt) {
      return { isAuth: false, session: null };
   }

   return { isAuth: true, session };
});

export async function requireSession() {
   const result = await verifySession();

   if (!result.isAuth) {
      redirect("/auth/login");
   }

   return result.session;
}