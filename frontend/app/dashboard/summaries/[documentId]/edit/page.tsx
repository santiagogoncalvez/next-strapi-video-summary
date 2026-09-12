import { loaders } from "@/data/loaders";
import { Params } from "@/types/strapi";
import { notFound } from "next/navigation";
import EditPage from "@/components/custom/edit-page";
import { Metadata } from "next";

interface PageProps {
   params: Params;
}

export async function generateMetadata({
   params,
}: {
   params: Params;
}): Promise<Metadata> {
   const { documentId } = await params;

   if (!documentId) {
      return {
         title: "Editar resumen",
         description: "Editá tu resumen de video en resu.",
      };
   }

   const res = await loaders.getSummaryWithFavoriteByDocumentId(documentId);
   const summary = res?.data ?? res; // Adaptado según la respuesta de tu API/Strapi

   return {
      title: `Editar ${summary.title ?? "resumen"}`,
      description: "Editá tu resumen de video en resu.",
   };
}

export default async function SummarySingleEditRoute({ params }: PageProps) {
   const resolvedParams = await params;
   const documentId = resolvedParams?.documentId;

   if (!documentId) notFound();

   const { data: summary } =
      await loaders.getSummaryWithFavoriteByDocumentId(documentId);

   return <EditPage headerTitle={summary.title} summary={summary} />;
}
