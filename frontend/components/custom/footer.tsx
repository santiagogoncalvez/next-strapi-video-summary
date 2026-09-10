import { type Footer } from "@/types/strapi";

import Logo from "./logo-page";
import { AppLink } from "./custom-link";
import { SiGithub, SiYoutube } from "react-icons/si";
import { ScrollToTop } from "./scroll-to-top";

interface FooterProps {
   data?: Footer | null;
}

const productLinks = [
   { label: "Cómo funciona", href: "#como-funciona" },
   { label: "Funcionalidades", href: "#funcionalidades" },
   { label: "Beneficios", href: "#beneficios" },
];

const accountLinks = [
   { label: "Crear cuenta", href: "/auth/signup" },
   { label: "Iniciar sesión", href: "/auth/login" },
];

function selectSocialIcon(url: string) {
   if (url.includes("youtube")) {
      return <SiYoutube />;
   }

   if (url.includes("github")) {
      return <SiGithub />;
   }

   return null;
}

export function Footer({ data }: FooterProps) {
   if (!data) return null;

   const { logoText, socialLink } = data;

   return (
      <footer className="w-full px-4 pb-8 pt-10 md:px-16">
         <div className="mx-auto max-w-screen-2xl">
            <div className="flex justify-between">
               {/* Brand */}
               <div className="md:col-span-2">
                  <Logo logoText={logoText} />

                  <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                     Resumí videos sin perder horas mirándolos.
                  </p>
               </div>

               {/* Product */}
               <div className="flex gap-32">
                  <nav aria-label="Producto">
                     <h2 className="text-sm font-medium">Producto</h2>

                     <ul className="mt-4 flex flex-col gap-4">
                        {productLinks.map((link) => (
                           <li key={link.href}>
                              <AppLink
                                 href={link.href}
                                 variant="subtle"
                                 size="none"
                              >
                                 {link.label}
                              </AppLink>
                           </li>
                        ))}
                     </ul>
                  </nav>

                  {/* Account */}
                  <nav aria-label="Cuenta">
                     <h2 className="text-sm font-medium">Cuenta</h2>

                     <ul className="mt-4 flex flex-col gap-4">
                        {accountLinks.map((link) => (
                           <li key={link.href}>
                              <AppLink
                                 href={link.href}
                                 variant="subtle"
                                 size="none"
                              >
                                 {link.label}
                              </AppLink>
                           </li>
                        ))}
                     </ul>
                  </nav>
               </div>
            </div>

            {/* Bottom */}
            <div className="mt-16 flex flex-col gap-4 border-t-0 border-sidebar-border/50 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-center">
               <p>© 2026 RESU</p>

               <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  {socialLink.map((link) => {
                     const icon = selectSocialIcon(link.href);

                     if (!icon) return null;

                     return (
                        <AppLink
                           key={link.id}
                           href={link.href}
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label={`RESU en ${link.label}`}
                           variant="ghost"
                        >
                           {icon}
                        </AppLink>
                     );
                  })}

                  <ScrollToTop />
               </div>
            </div>
         </div>
      </footer>
   );
}
