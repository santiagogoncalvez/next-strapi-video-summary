"use client";

import { Summary } from "@/types/strapi";
import { SummaryUpdateForm } from "@/components/form/update-summary";
import DashboardContent from "@/components/custom/dashboard-content";
import { useState } from "react";

interface PageProps {
   headerTitle?: string;
   documentId?: string;
   summaryContent?: string;
   summary: Summary;
   thumbnailUrl?: string;
}

export default function EditPage({
   headerTitle = "",
   documentId = "",
   summaryContent = "",
   summary,
   thumbnailUrl,
}: PageProps) {
   // ✨ "Mini estado" solo para controlar el spinner del Header
   const [isSubmitting, setIsSubmitting] = useState(false);

   return (
      <DashboardContent
         headerTitle={headerTitle}
         documentId={documentId}
         summaryContent={summaryContent}
         updateIsPending={isSubmitting}
         thumbnailUrl={thumbnailUrl}
         className="md:pt-0 pt-0"
      >
         <div className="h-fit w-full flex justify-center  md:pt-8 pt-4">
            <div className="h-fit w-full flex flex-col gap-8 max-w-2xl">
               <div className="h-full">
                  <SummaryUpdateForm
                     summary={summary}
                     onPendingChange={setIsSubmitting}
                  />
               </div>
            </div>
         </div>
      </DashboardContent>
   );
}
