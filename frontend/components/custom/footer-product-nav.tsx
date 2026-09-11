"use client";

import { AppLink } from "./custom-link";

const productLinks = [
   { label: "Cómo funciona", href: "#como-funciona" },
   { label: "Funcionalidades", href: "#funcionalidades" },
   { label: "Beneficios", href: "#beneficios" },
];

export function FooterProductNav() {
   return (
      <nav aria-label="Producto">
         <h2 className="text-sm font-medium">Producto</h2>

         <ul className="mt-4 flex flex-col gap-4">
            {productLinks.map((link) => (
               <li key={link.href}>
                  <AppLink
                     href={link.href}
                     variant="subtle"
                     size="none"
                     onClick={(event) => {
                        event.preventDefault();

                        const href = event.currentTarget.getAttribute("href");

                        if (!href) return;

                        const id = href.replace("#", "");

                        document.getElementById(id)?.scrollIntoView({
                           behavior: "smooth",
                        });

                        window.history.replaceState(null, "", href);
                     }}
                  >
                     {link.label}
                  </AppLink>
               </li>
            ))}
         </ul>
      </nav>
   );
}
