"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { Check, Eye, Pencil } from "lucide-react";
import { SubmitButton } from "../form/submit-button";
import { ThumbnailAvatar } from "./thumbnail-avatar";

import { useEffect, useRef, useState } from "react";
import { SummaryTitleForm } from "../form/edit-summary-title";
import { toast } from "sonner";
import { SummaryWithFavorite } from "@/types/strapi";
import removeMarkdown from "remove-markdown";
import MarkdownPDFDocument from "@/utils/pdfRenderer";
import { pdf } from "@react-pdf/renderer";
import { SummaryOptions } from "./summary-options";

function getSummaryRoute(pathname: string) {
   if (!/^\/dashboard\/summaries\/[^/]+(?:\/edit)?$/.test(pathname)) {
      return null;
   }

   return pathname.endsWith("/edit") ? "edit" : "view";
}

function getSummaryMarkdown(
   summaryRoute: string | null,
   summaryContent: string | undefined,
) {
   const contentMarkdown =
      summaryRoute === "edit"
         ? (
              document.getElementById(
                 "summary-content",
              ) as HTMLInputElement | null
           )?.value
         : summaryContent;

   return contentMarkdown;
}

function downloadFile(content: string, filename: string, type: string) {
   const blob = new Blob([content], { type });
   const url = URL.createObjectURL(blob);

   const link = document.createElement("a");
   link.href = url;
   link.download = filename;

   document.body.appendChild(link);
   link.click();
   link.remove();

   URL.revokeObjectURL(url);
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
      const contentMarkdown = getSummaryMarkdown(
         summaryRoute,
         summary?.content,
      );

      if (!contentMarkdown) return;

      const plainText = removeMarkdown(contentMarkdown);

      await navigator.clipboard.writeText(plainText);

      toast.success("Resumen copiado.", {
         position: "top-center",
         duration: 3000,
      });
   }

   function handleDownloadMarkdown() {
      const contentMarkdown = getSummaryMarkdown(
         summaryRoute,
         summary?.content,
      );

      if (!contentMarkdown) return;

      const fileName = summary?.title
         ? `Resumen de video ${summary.title}.md`
         : "Resumen de video.md";

      downloadFile(contentMarkdown, fileName, "text/markdown");

      toast.success("Markdown descargado.", {
         position: "top-center",
         duration: 3000,
      });
   }

   const handleDownloadPdf = async () => {
      const markdown = getSummaryMarkdown(summaryRoute, summary?.content);

      if (!markdown || markdown.trim() === "") {
         toast.error(
            "No hay nada que exportar. Por favor, escriba primero algún contenido.",
            {
               position: "top-center",
               duration: 3000,
            },
         );
         return;
      }

      // setIsGenerating(true);

      try {
         // Generate PDF using @react-pdf/renderer
         const blob = await pdf(
            <MarkdownPDFDocument markdown={markdown} />,
         ).toBlob();

         // Create download link
         const url = URL.createObjectURL(blob);
         const link = document.createElement("a");
         link.href = url;
         link.download = summary?.title
            ? `Resumen de video ${summary.title}.pdf`
            : "Resumen de video.pdf";
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);

         toast.success("PDF descargado.", {
            position: "top-center",
            duration: 3000,
         });
      } catch (error) {
         console.error("Error generating PDF:", error);
         toast.error(`Error al generar el PDF.`, {
            position: "top-center",
            duration: 3000,
         });
      } finally {
         // setIsGenerating(false);
      }
   };

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
                  onClick={
                     summaryRoute
                        ? () => {
                             setTitleEditKey((key) => key + 1);
                             setIsEditingTitle(true);
                          }
                        : undefined
                  }
               >
                  {pageTitle}
               </h1>
            </div>
         </div>

         <div className="relative flex items-center gap-2">
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

                  <SummaryOptions
                     summary={summary}
                     summaryAction={summaryAction}
                     onCopy={handleCopySummary}
                     onDownloadMarkdown={handleDownloadMarkdown}
                     onDownloadPdf={handleDownloadPdf}
                     onEditTitle={() => {
                        shouldFocusTitleInput.current = true;
                        setTitleEditKey((key) => key + 1);
                        setIsEditingTitle(true);
                     }}
                     titleInputRef={titleInputRef}
                     shouldFocusTitleInput={shouldFocusTitleInput}
                  />
               </>
            ) : (
               <div className="size-8 opacity-0" />
            )}
         </div>
      </header>
   );
}
