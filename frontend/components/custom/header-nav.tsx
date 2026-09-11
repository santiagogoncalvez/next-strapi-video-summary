"use client";

import { AppLink } from "./custom-link";

const links = [
   {
      label: "Cómo funciona",
      href: "#como-funciona",
   },
   {
      label: "Funcionalidades",
      href: "#funcionalidades",
   },
   {
      label: "Beneficios",
      href: "#beneficios",
   },
];

export function HeaderNav() {
   return (
      <nav className="flex items-center gap-8 text-sm" aria-label="Producto">
         {links.map((link) => (
            <AppLink
               key={link.href}
               className="h-fit"
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
         ))}
      </nav>
   );
}
