"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import {
   Check,
   Copy,
   Eye,
   MoreHorizontal,
   Pencil,
   PencilLine,
} from "lucide-react";
import { SubmitButton } from "../form/submit-button";
import { ThumbnailAvatar } from "./thumbnail-avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { SummaryDeleteForm } from "../form/delete-summary";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SummaryTitleForm } from "../form/edit-summary-title";
import { toast } from "sonner";
import { SummaryFavoriteForm } from "../form/favorite-summary";
import { SummaryWithFavorite } from "@/types/strapi";

function getSummaryRoute(pathname: string) {
   if (!/^\/dashboard\/summaries\/[^/]+(?:\/edit)?$/.test(pathname)) {
      return null;
   }

   return pathname.endsWith("/edit") ? "edit" : "view";
}

export default function DashboardHeader({
   title,
   summary,
   updateIsPending = false,
   updateIsDirty = false,
}: {
   title?: string;
   summary?: SummaryWithFavorite;
   updateIsPending?: boolean;
   updateIsDirty?: boolean;
}) {
   const [isEditingTitle, setIsEditingTitle] = useState(false);
   const [titleEditKey, setTitleEditKey] = useState(0);
   const titleInputRef = useRef<HTMLInputElement>(null);
   const shouldFocusTitleInput = useRef(false);

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
             : pathname === "/dashboard/favorites"
               ? "Favoritos"
               : "");

   const summaryAction = summaryRoute
      ? {
           href:
              summaryRoute === "edit"
                 ? pathname.replace(/\/edit$/, "")
                 : `${pathname}/edit`,
           label: summaryRoute === "edit" ? "Vista previa" : "Editar resumen",
           icon: summaryRoute === "edit" ? Eye : Pencil,
        }
      : null;

   async function handleCopySummary() {
      const content =
         summaryRoute === "edit"
            ? (
                 document.getElementById(
                    "summary-content",
                 ) as HTMLInputElement | null
              )?.value
            : summary?.content;

      if (!content) return;

      await navigator.clipboard.writeText(content);

      toast.success("Resumen copiado", {
         position: "top-center",
         duration: 3000,
      });
   }

   useEffect(() => {
      if (isEditingTitle) {
         titleInputRef.current?.focus();
         titleInputRef.current?.select();
      }
   }, [isEditingTitle]);

   const isSummaryPage = summaryRoute && summary?.documentId;

   return (
      <header className="max-w-full w-full p-4 shadow-none border-b-0 border-sidebar-border/50 flex justify-between items-center gap-4">
         <div className="flex gap-4 items-center min-w-0 flex-1">
            <SidebarTrigger className={cn("size-8 md:hidden flex")} />

            <div className="flex gap-2 items-center justify-start min-w-0 flex-1">
               {summaryRoute && summary?.thumbnailUrl && title && (
                  <ThumbnailAvatar
                     src={summary.thumbnailUrl}
                     alt={title}
                     size="xs"
                  />
               )}

               <SummaryTitleForm
                  key={titleEditKey}
                  title={title}
                  documentId={summary?.documentId}
                  onFinishEditing={() => {
                     shouldFocusTitleInput.current = false;
                     setIsEditingTitle(false);
                  }}
                  inputRef={titleInputRef}
                  className={isEditingTitle ? "" : "hidden"}
               />
               <h1
                  className={`text-normal text-black font-medium whitespace-nowrap overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden ${isEditingTitle ? "hidden" : ""}`}
                  onClick={() => {
                     setTitleEditKey((key) => key + 1);
                     setIsEditingTitle(true);
                  }}
               >
                  {pageTitle}
               </h1>
            </div>
         </div>

         <div className="flex items-center gap-2">
            {isSummaryPage ? (
               <>
                  {summaryRoute === "edit" && (
                     <>
                        <SubmitButton
                           form="summary-update-form"
                           text="Guardar"
                           loadingText="Guardando"
                           disabled={!updateIsDirty}
                           loading={updateIsPending}
                           size="default"
                           className="md:flex hidden"
                           icon={<Check />}
                        />
                        <SubmitButton
                           form="summary-update-form"
                           text=""
                           loadingText=""
                           disabled={!updateIsDirty}
                           loading={updateIsPending}
                           size="icon"
                           className="md:hidden flex"
                           icon={<Check />}
                        />
                     </>
                  )}

                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button
                           aria-label="Opciones del documento"
                           variant="ghost"
                           size="icon"
                        >
                           <MoreHorizontal />
                        </Button>
                     </DropdownMenuTrigger>

                     <DropdownMenuContent
                        align="end"
                        sideOffset={4}
                        className="w-56"
                        onCloseAutoFocus={(event) => {
                           if (shouldFocusTitleInput.current) {
                              event.preventDefault();
                              shouldFocusTitleInput.current = true;
                              titleInputRef.current?.focus();
                           }
                        }}
                     >
                        {summaryAction && (
                           <DropdownMenuItem asChild>
                              <Link
                                 href={summaryAction!.href}
                                 className="hover:cursor-pointer"
                              >
                                 <summaryAction.icon />
                                 {summaryAction.label}
                              </Link>
                           </DropdownMenuItem>
                        )}

                        <SummaryFavoriteForm
                           isFavorite={summary.isFavorite}
                           summaryId={summary.documentId}
                           favoriteId={summary.favoriteDocumentId}
                           variant="dropdown"
                        />

                        <DropdownMenuItem
                           onSelect={() => {
                              void handleCopySummary();
                           }}
                           className="hover:cursor-pointer"
                        >
                           <Copy />
                           Copiar resumen
                        </DropdownMenuItem>

                        <DropdownMenuItem
                           onSelect={() => {
                              shouldFocusTitleInput.current = true;
                              setTitleEditKey((key) => key + 1);
                              setIsEditingTitle(true);
                           }}
                           className="hover:cursor-pointer"
                        >
                           <PencilLine />
                           Cambiar nombre
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-transparent" />

                        <SummaryDeleteForm summaryId={summary.documentId} />
                     </DropdownMenuContent>
                  </DropdownMenu>
               </>
            ) : (
               <div className="size-8 opacity-0" />
            )}
         </div>
      </header>
   );
}
