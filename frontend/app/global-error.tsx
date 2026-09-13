"use client";

import { Footer } from "@/components/custom/footer";
import Header from "@/components/custom/header";
import { plusJakartaSans } from "./ui/fonts";
import { ErrorContent } from "@/components/custom/error-content";

interface IGlobalError {
   error: Error & { digest?: string };
   reset: () => void;
}

export const HEADER_DATA = {
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
      label: "resu",
   },
};

export default function GlobalError({ reset }: IGlobalError) {
   return (
      <html
         lang="es"
         className={`${plusJakartaSans.className} h-full antialiased`}
      >
         <body className="flex min-h-full flex-col">
            <div className="flex min-h-full flex-1 flex-col">
               <Header data={HEADER_DATA} />

               <ErrorContent
                  title="Algo salió mal"
                  description="Ocurrió un problema al cargar la aplicación. Intentá nuevamente o volvé a la página anterior."
                  retry={reset}
               />

               <Footer
                  data={{
                     text: "®resu. Todos los derechos reservados.",
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
                        label: "resu",
                     },
                  }}
               />
            </div>
         </body>
      </html>
   );
}
