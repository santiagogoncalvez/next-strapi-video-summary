import { loaders } from "@/data/loaders";
import { Params } from "@/types/strapi";
import { notFound } from "next/navigation";
import EditPage from "@/components/custom/edit-page";
import { getUserMeService } from "@/services/auth";

interface PageProps {
   params: Params;
}

export default async function SummarySingleEditRoute({ params }: PageProps) {
   const resolvedParams = await params;
   const documentId = resolvedParams?.documentId;

   if (!documentId) notFound();

   const { data: summary } = await loaders.getSummaryByDocumentId(documentId);
   const user = await getUserMeService();
   
   const userImage = user?.image;
   const { title } = summary;

   return (
      <EditPage
         headerTitle={title}
         documentId={documentId}
         summary={summary}
         summaryImage={userImage}
      />
   );
}
