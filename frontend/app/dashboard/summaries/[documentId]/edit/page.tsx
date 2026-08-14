import { loaders } from "@/data/loaders";
import { Params } from "@/types/strapi";
import { notFound } from "next/navigation";
import EditPage from "@/components/custom/edit-page";

interface PageProps {
   params: Params;
}

export default async function SummarySingleEditRoute({ params }: PageProps) {
   const resolvedParams = await params;
   const documentId = resolvedParams?.documentId;

   if (!documentId) notFound();

   const { data: summary } = await loaders.getSummaryByDocumentId(documentId);
   
   const { title, thumbnailUrl } = summary;

   return (
      <EditPage
         headerTitle={title}
         documentId={documentId}
         summary={summary}
         thumbnailUrl={thumbnailUrl}
      />
   );
}
