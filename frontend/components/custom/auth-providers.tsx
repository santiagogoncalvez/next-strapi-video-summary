"use client";

// import { Separator } from "@/components/ui/separator";
import { AppLink } from "./custom-link";
import {
   // SiGithub,
   SiGoogle,
} from "react-icons/si";

const STRAPI_URL =
   process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export function AuthProviders() {
   return (
      <div className="space-y-8 mb-8 mt-4">
         <div className="flex flex-col gap-4">
            <AppLink
               variant="highlighted"
               href={`${STRAPI_URL}/api/connect/google`}
            >
               <SiGoogle />
               Continuar con Google
            </AppLink>

            {/* <AppLink
               variant="outline"
               href={`${STRAPI_URL}/api/connect/github`}
            >
               <SiGithub />
               Continuar con GitHub
            </AppLink> */}
         </div>

         <div className="flex items-center justify-center gap-2">
            {/* <Separator className="flex-1" /> */}
            <span className="text-muted-foreground text-sm">
               O continúa con correo electrónico
            </span>
            {/* <Separator className="flex-1" /> */}
         </div>
      </div>
   );
}
