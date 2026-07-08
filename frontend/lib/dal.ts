import { cookies } from "next/headers";
import { cache } from "react";
import "server-only";
import { decrypt } from "./session";
import { VerifySessionResult } from "@/types/definitions";

export const verifySession = cache(async (): Promise<VerifySessionResult> => {
   const cookie = (await cookies()).get("session")?.value;

   const session = await decrypt(cookie);

   // Si no hay cookie, no se pudo desencriptar o no existe el JWT, no está autenticado
   if (!session || !session.jwt) {
      return { isAuth: false, session: null };
   }

   return { isAuth: true, session };
});
