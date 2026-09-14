"use client";

import { useState } from "react";
// import { Separator } from "@/components/ui/separator";
import { AppLink } from "./custom-link";
import { SiGithub, SiGoogle } from "react-icons/si";
import { Loader2 } from "lucide-react";

export function AuthProviders({
   variant = "login",
   disabled = false,
   onProviderClick = () => {},
}: {
   variant?: "login" | "signup";
   disabled?: boolean;
   onProviderClick?: () => void;
}) {
   const [loadingProvider, setLoadingProvider] = useState<
      "google" | "github" | null
   >(null);

   const isLoading = loadingProvider !== null;

   return (
      <div className="space-y-8 mb-8 mt-4">
         <div className="flex flex-col gap-4">
            <AppLink
               variant="outline"
               href={`/api/auth/google?from=${variant}`}
               onClick={() => {
                  onProviderClick();
                  setLoadingProvider("google");
               }}
               aria-disabled={isLoading || disabled}
            >
               {loadingProvider === "google" ? (
                  <Loader2 className="animate-spin" />
               ) : (
                  <SiGoogle />
               )}

               {loadingProvider === "google"
                  ? variant === "login"
                     ? "Iniciando sesión con Google"
                     : "Creando cuenta con Google"
                  : variant === "login"
                    ? "Iniciar sesión con Google"
                    : "Crear cuenta con Google"}
            </AppLink>

            <AppLink
               variant="outline"
               href={`/api/auth/github?from=${variant}`}
               onClick={() => {
                  onProviderClick();
                  setLoadingProvider("github");
               }}
               aria-disabled={isLoading || disabled}
            >
               {loadingProvider === "github" ? (
                  <Loader2 className="animate-spin" />
               ) : (
                  <SiGithub />
               )}

               {loadingProvider === "github"
                  ? variant === "login"
                     ? "Iniciando sesión con GitHub"
                     : "Creando cuenta con GitHub"
                  : variant === "login"
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
