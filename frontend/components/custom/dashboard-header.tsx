"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { AppLink } from "./custom-link";

function getSummaryRoute(pathname: string) {
   if (!/^\/dashboard\/summaries\/[^/]+(?:\/edit)?$/.test(pathname)) {
      return null;
   }

   return pathname.endsWith("/edit") ? "edit" : "view";
}

export default function DashboardHeader({ title }: { title?: string }) {
   const pathname = usePathname();

   const summaryRoute = getSummaryRoute(pathname);

   const pageTitle =
      title ||
      (pathname === "/dashboard"
         ? "Nuevo resumen"
         : pathname === "/dashboard/account"
           ? "Cuenta"
           : pathname === "/dashboard/summaries"
             ? "Resúmenes"
             : "");

   const summaryAction = summaryRoute
      ? {
           href:
              summaryRoute === "edit"
                 ? pathname.replace(/\/edit$/, "")
                 : `${pathname}/edit`,
           label: summaryRoute === "edit" ? "Vista previa" : "Editar",
        }
      : null;

   return (
      <header className="max-w-full w-full p-4 shadow-none border-b-0 border-sidebar-border/50 flex justify-between items-center">
         <div className="flex gap-4 items-center min-w-0 flex-1">
            <SidebarTrigger className={cn("size-8 md:hidden flex")} />
            <h1 className="text-normal text-black font-medium whitespace-nowrap overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden">
               {pageTitle}
            </h1>
         </div>

         <div className="flex items-center gap-2">
            {summaryAction && (
               <>
                  <AppLink href={""} variant="ghost" size="default">
                     Eliminar
                  </AppLink>
                  <AppLink
                     href={summaryAction.href}
                     variant="outline"
                     size="default"
                  >
                     {summaryAction.label}
                  </AppLink>
                  {summaryRoute === "edit" && (
                     <AppLink
                        href={summaryAction.href}
                        variant="default"
                        size="default"
                     >
                        Guardar cambios
                     </AppLink>
                  )}
               </>
            )}
            {!summaryAction && <div className="size-8 opacity-0" />}
         </div>
      </header>
   );
}
