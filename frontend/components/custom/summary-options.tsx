"use client";

import Link from "next/link";
import {
   ChevronLeftIcon,
   ChevronRightIcon,
   Copy,
   Download,
   Eye,
   FileDown,
   FileText,
   MoreHorizontal,
   Pencil,
   PencilLine,
} from "lucide-react";

import { Button } from "../ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from "../ui/drawer";

import { SummaryDeleteForm } from "../form/delete-summary";
import { SummaryFavoriteForm } from "../form/favorite-summary";
import { SummaryWithFavorite } from "@/types/strapi";
import { AppLink } from "./custom-link";
import { MutableRefObject, RefObject } from "react";

interface SummaryOptionsProps {
   summary: SummaryWithFavorite;
   summaryAction: {
      href: string;
      label: string;
      icon: typeof Eye | typeof Pencil;
   } | null;
   onCopy: () => void | Promise<void>;
   onDownloadMarkdown: () => void;
   onDownloadPdf: () => void;
   onEditTitle: () => void;
   titleInputRef: RefObject<HTMLInputElement | null>;
   shouldFocusTitleInput: MutableRefObject<boolean>;
}

export function SummaryOptions({
   summary,
   summaryAction,
   onCopy,
   onDownloadMarkdown,
   onDownloadPdf,
   onEditTitle,
   titleInputRef,
   shouldFocusTitleInput,
}: SummaryOptionsProps) {
   return (
      <>
         <SummaryFavoriteForm
            isFavorite={summary.isFavorite}
            summaryId={summary.documentId}
            favoriteId={summary.favoriteDocumentId}
            variant="header"
            className="md:flex hidden"
         />

         {/* Desktop */}
         <div className="hidden md:block">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button
                     aria-label="Opciones del documento"
                     variant="ghost"
                     size="icon"
                  >
                     <MoreHorizontal strokeWidth={1.5} />
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent
                  align="end"
                  sideOffset={4}
                  className="w-56"
                  onCloseAutoFocus={(event) => {
                     if (shouldFocusTitleInput.current) {
                        event.preventDefault();
                        titleInputRef.current?.focus();
                     }
                  }}
               >
                  {summaryAction && (
                     <DropdownMenuItem asChild>
                        <Link
                           href={summaryAction.href}
                           className="hover:cursor-pointer"
                        >
                           <summaryAction.icon strokeWidth={1.5} />
                           {summaryAction.label}
                        </Link>
                     </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                     onSelect={onEditTitle}
                     className="hover:cursor-pointer"
                  >
                     <PencilLine strokeWidth={1.5} />
                     Cambiar nombre
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-transparent" />

                  <DropdownMenuItem
                     onSelect={() => {
                        void onCopy();
                     }}
                     className="hover:cursor-pointer"
                  >
                     <Copy strokeWidth={1.5} />
                     Copiar resumen
                  </DropdownMenuItem>

                  <DropdownMenuSub>
                     <DropdownMenuSubTrigger className="cursor-pointer">
                        <Download strokeWidth={1.5} />
                        Exportar
                     </DropdownMenuSubTrigger>

                     <DropdownMenuSubContent>
                        <DropdownMenuItem
                           onSelect={onDownloadMarkdown}
                           className="cursor-pointer"
                        >
                           <FileText strokeWidth={1.5} />
                           Descargar Markdown
                        </DropdownMenuItem>

                        <DropdownMenuItem
                           onSelect={() => {
                              void onDownloadPdf();
                           }}
                           className="cursor-pointer"
                        >
                           <FileDown strokeWidth={1.5} />
                           Descargar PDF
                        </DropdownMenuItem>
                     </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuSeparator className="bg-transparent" />

                  <SummaryDeleteForm summaryId={summary.documentId} />
               </DropdownMenuContent>
            </DropdownMenu>
         </div>

         {/* Mobile */}
         <div className="md:hidden">
            <Drawer>
               <DrawerTrigger asChild>
                  <Button
                     aria-label="Opciones del documento"
                     variant="ghost"
                     size="icon"
                  >
                     <MoreHorizontal strokeWidth={1.5} />
                  </Button>
               </DrawerTrigger>

               <DrawerContent
                  onCloseAutoFocus={(event) => {
                     if (shouldFocusTitleInput.current) {
                        event.preventDefault();
                        titleInputRef.current?.focus();
                     }
                  }}
               >
                  <DrawerHeader>
                     <DrawerTitle>Opciones del documento</DrawerTitle>
                  </DrawerHeader>

                  <div className="flex flex-col px-4 pb-6">
                     {summaryAction && (
                        <DrawerClose asChild>
                           <AppLink
                              href={summaryAction.href}
                              variant="ghost"
                              size="default"
                              className="justify-start font-normal"
                           >
                              <summaryAction.icon strokeWidth={1.5} />
                              <span>{summaryAction.label}</span>
                           </AppLink>
                        </DrawerClose>
                     )}

                     <SummaryFavoriteForm
                        isFavorite={summary.isFavorite}
                        summaryId={summary.documentId}
                        favoriteId={summary.favoriteDocumentId}
                        variant="drawer"
                     />

                     <DrawerClose asChild>
                        <Button
                           type="button"
                           onClick={onEditTitle}
                           variant="ghost"
                           className="justify-start font-normal"
                        >
                           <PencilLine strokeWidth={1.5} />
                           Cambiar nombre
                        </Button>
                     </DrawerClose>

                     <div className="my-2 h-px bg-transparent" />

                     <DrawerClose asChild>
                        <Button
                           type="button"
                           onClick={() => {
                              void onCopy();
                           }}
                           variant="ghost"
                           className="justify-start font-normal"
                        >
                           <Copy strokeWidth={1.5} />
                           Copiar resumen
                        </Button>
                     </DrawerClose>

                     <Drawer>
                        <DrawerTrigger asChild>
                           <Button
                              type="button"
                              variant="ghost"
                              className="w-full justify-start font-normal"
                           >
                              <div className="flex items-center justify-center gap-2">
                                 <Download strokeWidth={1.5} />
                                 Exportar
                              </div>

                              <ChevronRightIcon
                                 className="ml-auto"
                                 strokeWidth={1.5}
                              />
                           </Button>
                        </DrawerTrigger>

                        <DrawerContent>
                           <DrawerHeader className="flex flex-row justify-between items-center">
                              <DrawerClose asChild>
                                 <Button
                                    aria-label="Volver hacia atrás"
                                    variant="ghost"
                                    size="icon"
                                 >
                                    <ChevronLeftIcon strokeWidth={1.5} />
                                 </Button>
                              </DrawerClose>
                              <DrawerTitle>Exportar resumen</DrawerTitle>
                              <div className="size-8"></div>
                           </DrawerHeader>

                           <div className="flex flex-col px-4 pb-6">
                              <DrawerClose asChild>
                                 <Button
                                    type="button"
                                    onClick={onDownloadMarkdown}
                                    variant="ghost"
                                    className="justify-start font-normal"
                                 >
                                    <FileText strokeWidth={1.5} />
                                    Descargar Markdown
                                 </Button>
                              </DrawerClose>

                              <DrawerClose asChild>
                                 <Button
                                    type="button"
                                    onClick={() => {
                                       void onDownloadPdf();
                                    }}
                                    variant="ghost"
                                    className="justify-start font-normal"
                                 >
                                    <FileDown strokeWidth={1.5} />
                                    Descargar PDF
                                 </Button>
                              </DrawerClose>
                           </div>
                        </DrawerContent>
                     </Drawer>

                     <div className="my-2 h-px bg-transparent" />

                     <SummaryDeleteForm
                        summaryId={summary.documentId}
                        variant="drawer"
                     />
                  </div>
               </DrawerContent>
            </Drawer>
         </div>
      </>
   );
}
