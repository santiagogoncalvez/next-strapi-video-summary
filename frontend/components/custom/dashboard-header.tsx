"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { Check, Eye, MoreHorizontal, Pencil, PencilLine } from "lucide-react";
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
   thumbnailUrl,
}: {
   title?: string;
   documentId?: string;
   updateIsPending?: boolean;
   thumbnailUrl?: string;
}) {
   const [isEditingTitle, setIsEditingTitle] = useState(false);

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
           label: summaryRoute === "edit" ? "Vista previa" : "Editar resumen",
           icon: summaryRoute === "edit" ? Eye : Pencil,
        }
      : null;

   const isSummaryPage = summaryRoute && documentId;

   const titleInputRef = useRef<HTMLInputElement>(null);
   const shouldFocusTitleInput = useRef(false);

   useEffect(() => {
      if (isEditingTitle) {
         titleInputRef.current?.focus();
         titleInputRef.current?.select();
      }
   }, [isEditingTitle]);

   return (
      <header className="max-w-full w-full p-4 shadow-none border-b-0 border-sidebar-border/50 flex justify-between items-center gap-4">
         <div className="flex gap-4 items-center min-w-0 flex-1">
            <SidebarTrigger className={cn("size-8 md:hidden flex")} />

            <div className="flex gap-2 items-center justify-start min-w-0 flex-1">
               {summaryRoute && thumbnailUrl && title && (
                  <ThumbnailAvatar src={thumbnailUrl} alt={title} size="xs" />
               )}

               <SummaryTitleForm
                  title={title}
                  documentId={documentId}
                  onFinishEditing={() => {
                     shouldFocusTitleInput.current = false;
                     setIsEditingTitle(false);
                  }}
                  inputRef={titleInputRef}
                  className={isEditingTitle ? "" : "hidden"}
               />
               <h1
                  className={`text-normal text-black font-medium whitespace-nowrap overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden ${isEditingTitle ? "hidden" : ""}`}
                  onClick={() => setIsEditingTitle(true)}
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
                        className="w-48"
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

                        <DropdownMenuItem
                           onSelect={() => {
                              shouldFocusTitleInput.current = true;
                              setIsEditingTitle(true);
                           }}
                           className="hover:cursor-pointer"
                        >
                           <PencilLine />
                           Cambiar nombre
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-transparent" />

                        <SummaryDeleteForm summaryId={documentId} />
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
