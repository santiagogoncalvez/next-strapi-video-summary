"use client";

// import { Separator } from "@/components/ui/separator";
import { AppLink } from "./custom-link";
import { SiGithub, SiGoogle } from "react-icons/si";

export function AuthProviders({
   variant = "login",
}: {
   variant?: "login" | "signup";
}) {
   return (
      <div className="space-y-8 mb-8 mt-4">
         <div className="flex flex-col gap-4">
            <AppLink
               variant="highlighted"
               href={`/api/auth/google?from=${variant}`}
            >
               <SiGoogle />
               {variant === "login"
                  ? "Iniciar sesión con Google"
                  : "Crear cuenta con Google"}
            </AppLink>

            <AppLink
               variant="outline"
               href={`/api/auth/github?from=${variant}`}
            >
               <SiGithub />
               {variant === "login"
                  ? "Iniciar sesión con GitHub"
                  : "Crear cuenta con GitHub"}
            </AppLink>
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
