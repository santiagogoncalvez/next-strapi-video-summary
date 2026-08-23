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

   const { data: summary } =
      await loaders.getSummaryWithFavoriteByDocumentId(documentId);

   return (
      <DashboardContent headerTitle={summary.title} summary={summary}>
         {children}
      </DashboardContent>
   );
}
