"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { AppLink } from "./custom-link";
import { Check, Eye, Pencil } from "lucide-react";
import { SummaryDeleteForm } from "../form/delete-summary";
import { SubmitButton } from "../form/submit-button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getMediaUrl } from "./media-image";
import { UserImage } from "@/types/strapi";

function getSummaryRoute(pathname: string) {
   if (!/^\/dashboard\/summaries\/[^/]+(?:\/edit)?$/.test(pathname)) {
      return null;
   }

   return pathname.endsWith("/edit") ? "edit" : "view";
}

export default function DashboardHeader({
   title,
   documentId,
   updateIsPending = false,
   summaryImage,
}: {
   title?: string;
   documentId?: string;
   updateIsPending?: boolean;
   summaryImage?: UserImage;
}) {
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
           icon: summaryRoute === "edit" ? Eye : Pencil,
        }
      : null;

   const summaryImageSrc = getMediaUrl(summaryImage?.url ?? "");

   return (
      <header className="max-w-full w-full p-4 shadow-none border-b-0 border-sidebar-border/50 flex justify-between items-center gap-4">
         <div className="flex gap-4 items-center min-w-0 flex-1">
            <SidebarTrigger className={cn("size-8 md:hidden flex")} />

            <div className="flex gap-2 items-center justify-center">
               {summaryRoute && (
                  <Avatar className="rounded-full" size="sm">
                     {summaryImage && summaryImageSrc ? (
                        <AvatarImage
                           src={summaryImageSrc}
                           alt={summaryImage.alternativeText || ""}
                        />
                     ) : (
                        <AvatarFallback className="rounded-full">
                           {title?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                     )}
                  </Avatar>
               )}

               <h1 className="text-normal text-black font-medium whitespace-nowrap overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden">
                  {pageTitle}
               </h1>
            </div>
         </div>

         <div className="flex items-center gap-2">
            {summaryAction && documentId && (
               <>
                  <SummaryDeleteForm summaryId={documentId} />

                  <AppLink
                     href={summaryAction.href}
                     variant="outline"
                     size="default"
                     className="md:flex hidden"
                  >
                     <summaryAction.icon />

                     {summaryAction.label}
                  </AppLink>
                  <AppLink
                     href={summaryAction.href}
                     variant="outline"
                     size="icon"
                     className="md:hidden flex"
                  >
                     <summaryAction.icon />
                  </AppLink>

                  {summaryRoute === "edit" && (
                     <>
                        <SubmitButton
                           form="summary-update-form"
                           text="Guardar"
                           loadingText="Guardando"
                           loading={updateIsPending}
                           size="default"
                           className="md:flex hidden"
                           icon={<Check />}
                        />
                        <SubmitButton
                           form="summary-update-form"
                           text=""
                           loadingText=""
                           loading={updateIsPending}
                           size="icon"
                           className="md:hidden flex"
                           icon={<Check />}
                        />
                     </>
                  )}
               </>
            )}
            {!summaryAction && <div className="size-8 opacity-0" />}
         </div>
      </header>
   );
}
