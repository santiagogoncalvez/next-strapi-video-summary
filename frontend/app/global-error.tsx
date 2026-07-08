"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Footer } from "@/components/custom/footer";
import { NOT_FOUND_STYLES } from "@/constants/styles";
import FallbackHeader from "@/components/custom/fallback-header";
import { usePathname } from "next/navigation";
import { geistSans } from "./ui/fonts";
import { Button } from "@/components/ui/button";
import { AppLink } from "@/components/custom/custom-link";

interface IGlobalError {
   error: Error & { digest?: string };
   reset: () => void;
}

export default function GlobalError({ error, reset }: IGlobalError) {
   const pathname = usePathname();
   const isHomePage = pathname === "/";

   return (
      <html lang="en" className={`${geistSans.className} h-full antialiased`}>
         <body className="min-h-full flex flex-col">
            <div className="w-full h-full flex flex-1 flex-col justify-center items-center">
               <FallbackHeader
                  data={{
                     secondaryCtaButton: {
                        id: 32,
                        href: "/auth/login",
                        label: "Iniciar sesión",
                     },
                     ctaButton: {
                        id: 31,
                        href: "/auth/signup",
                        label: "Registrarse",
                     },
                     logoText: {
                        id: 30,
                        href: "/",
                        label: "RESU",
                     },
                  }}
               />

               <div className={NOT_FOUND_STYLES.container}>
                  <div className={NOT_FOUND_STYLES.content}>
                     {/* Large 404 Text */}
                     <div className={NOT_FOUND_STYLES.textSection}>
                        <h1 className={NOT_FOUND_STYLES.heading404}>
                           Error global
                        </h1>
                        <div className={NOT_FOUND_STYLES.headingContainer}>
                           <h2 className={NOT_FOUND_STYLES.pageTitle}>
                              Error de la aplicación
                           </h2>
                           <p className={NOT_FOUND_STYLES.description}>
                              Se ha producido un error crítico que impide que la
                              aplicación se cargue correctamente. Por favor,
                              intente actualizar la página.
                           </p>
                        </div>
                     </div>

                     {/* Illustration */}
                     <div className={NOT_FOUND_STYLES.illustrationContainer}>
                        <div className={NOT_FOUND_STYLES.illustration}>
                           <div className={NOT_FOUND_STYLES.searchCircle}>
                              <AlertTriangle
                                 className={NOT_FOUND_STYLES.searchIcon}
                              />
                           </div>
                           <div className={NOT_FOUND_STYLES.errorBadge}>
                              <span className={NOT_FOUND_STYLES.errorSymbol}>
                                 !
                              </span>
                           </div>
                        </div>
                     </div>

                     {/* Action Buttons */}
                     <div className={NOT_FOUND_STYLES.buttonContainer}>
                        <Button size={"lg"} onClick={reset}>
                           <div className="flex gap-2 justify-center items-center">
                              <RefreshCw
                                 className={NOT_FOUND_STYLES.buttonIcon}
                              />
                              <span>Intentar de nuevo</span>
                           </div>
                        </Button>

                        {isHomePage && (
                           <AppLink href="/">
                              <Home className={NOT_FOUND_STYLES.buttonIcon} />
                              <span>Ir al inicio</span>
                           </AppLink>
                        )}
                     </div>

                     {process.env.NODE_ENV === "development" && (
                        <div className={NOT_FOUND_STYLES.errorDetails}>
                           <div className={NOT_FOUND_STYLES.errorTitle}>
                              Detalles del error (solo para desarrollo):
                           </div>
                           <div>Mensaje: {error.message}</div>
                           {error.digest && <div>Resumen: {error.digest}</div>}
                           {error.stack && (
                              <details className="mt-2">
                                 <summary className="cursor-pointer font-medium">
                                    Seguimiento de la pila
                                 </summary>
                                 <pre className="mt-2 text-xs overflow-auto">
                                    {error.stack}
                                 </pre>
                              </details>
                           )}
                        </div>
                     )}
                  </div>
               </div>

               <Footer
                  data={{
                     text: "®RESU. Todos los derechos reservados.",
                     socialLink: [
                        {
                           id: 34,
                           href: "https://github.com/santiagogoncalvez/next-strapi-video-summary",
                           label: "GitHub",
                           isExternal: true,
                        },
                     ],
                     logoText: {
                        id: 33,
                        href: "/",
                        label: "RESU",
                     },
                  }}
               />
            </div>
         </body>
      </html>
   );
}
