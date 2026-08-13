import { loaders } from "@/data/loaders";
import { Params } from "@/types/strapi";
import { notFound } from "next/navigation";
import { SummaryUpdateForm } from "@/components/form/update-summary";

interface PageProps {
   params: Params;
}

export default async function SummarySingleEditRoute({ params }: PageProps) {
   const resolvedParams = await params;
   const documentId = resolvedParams?.documentId;

   if (!documentId) notFound();

   const { data: summary } = await loaders.getSummaryByDocumentId(documentId);

   return (
      <div className="h-fit w-full flex justify-center">
         <div className="h-fit w-full flex flex-col gap-8 max-w-2xl">
            <div className="h-full">
               <SummaryUpdateForm summary={summary} />
            </div>
         </div>
      </div>
   );
}
