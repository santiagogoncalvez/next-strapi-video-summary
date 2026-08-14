import DashboardContent from "@/components/custom/dashboard-content";
import { loaders } from "@/data/loaders";
import { Params } from "@/types/strapi";
import { notFound } from "next/navigation";

export default async function Layout({
   children,
   params,
}: {
   children: React.ReactNode;
   params: Params;
}) {
   const resolvedParams = await params;
   const documentId = resolvedParams?.documentId;

   if (!documentId) notFound();

   const { data: summary } = await loaders.getSummaryByDocumentId(documentId);

   const { title, thumbnailUrl } = summary;

   return (
      <DashboardContent
         headerTitle={title}
         documentId={documentId}
         thumbnailUrl={thumbnailUrl}
      >
         {children}
      </DashboardContent>
   );
}
