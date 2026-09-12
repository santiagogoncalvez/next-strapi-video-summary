"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import Logo from "@/components/custom/logo-page";
import NavBar from "./nav-bar";
import { cn } from "@/lib/utils";

const productLinks = [
   { label: "Cómo funciona", href: "#como-funciona" },
   { label: "Funcionalidades", href: "#funcionalidades" },
   { label: "Beneficios", href: "#beneficios" },
];

const accountLinks = [
   { label: "Crear cuenta", href: "/auth/signup" },
   { label: "Iniciar sesión", href: "/auth/login" },
];

export function SidebarHome() {
   const [open, setOpen] = useState(false);

   const handleSectionClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const href = event.currentTarget.getAttribute("href");
      if (!href) return;

      const id = href.replace("#", "");

      document.getElementById(id)?.scrollIntoView({
         behavior: "smooth",
      });

      window.history.replaceState(null, "", href);

      setOpen(false);
   };

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button
               type="button"
               variant="ghost"
               size="icon"
               className="size-8 lg:hidden"
               aria-label="Abrir menú"
            >
               <Menu strokeWidth={1.5} />
            </Button>
         </SheetTrigger>

         <SheetContent
            side="left"
            showCloseButton={false}
            className="w-72 bg-background p-0 text-foreground border-0!"
         >
            <SheetHeader className="sr-only">
               <SheetTitle>Menú de navegación</SheetTitle>
               <SheetDescription>
                  Navegación principal de resu.
               </SheetDescription>
            </SheetHeader>

            <div className="flex h-full w-full flex-col">
               <div className="flex items-center justify-between border-b-0 bg-background p-4">
                  <Logo
                     logoText={{
                        id: 0,
                        href: "/",
                        label: "resu",
                     }}
                     scrollToTop
                     onClick={() => setOpen(false)}
                  />

                  <SheetClose asChild>
                     <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "size-8 lg:hidden",
                           "bg-background! hover:bg-muted!",
                        )}
                        aria-label="Cerrar menú"
                     >
                        <X strokeWidth={1.5} />
                     </Button>
                  </SheetClose>
               </div>

               <div className="flex flex-1 flex-col">
                  <nav className="p-4">
                     <ul className="flex flex-col">
                        {productLinks.map((link) => (
                           <li key={link.href}>
                              <Link
                                 href={link.href}
                                 onClick={handleSectionClick}
                                 className="flex h-10 w-full items-center rounded-lg px-2 text-sm transition-colors hover:bg-muted"
                              >
                                 {link.label}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </nav>

                  <NavBar
                     link={accountLinks[0]}
                     secondaryLink={accountLinks[1]}
                     className="p-4"
                  />
               </div>
            </div>
         </SheetContent>
      </Sheet>
   );
}
