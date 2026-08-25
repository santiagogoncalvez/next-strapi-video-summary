import { Suspense } from "react";
import { ClearSearchButton } from "@/components/custom/clear-search-button";
import { AppLink } from "@/components/custom/custom-link";
import { EmptySummaries } from "@/components/custom/empty-state-card";
import { PaginationComponent } from "@/components/custom/pagination-component";
import { Search } from "@/components/custom/search";
import { SummariesGrid } from "@/components/custom/summaries-grid";
import { loaders } from "@/data/loaders";
import { SearchParams } from "@/types/strapi";
import Loading from "./loading";

interface SummariesRouteProps {
   searchParams: SearchParams;
}

export default async function SummariesRoute({
   searchParams,
}: SummariesRouteProps) {
   const resolvedSearchParams = await searchParams;
   const query = (resolvedSearchParams?.query as string) || "";
   const currentPage = Number(resolvedSearchParams?.page) || 1;

   return (
      <div className="flex flex-1 flex-col gap-8">
         <Search className="w-full" />

         {/* La key fuerza a React a mostrar el Skeleton instantáneamente al filtrar o cambiar de página */}
         <Suspense key={`${query}-${currentPage}`} fallback={<Loading />}>
            <SummariesData query={query} currentPage={currentPage} />
         </Suspense>
      </div>
   );
}

// Componente asíncrono para la obtención de datos
async function SummariesData({
   query,
   currentPage,
}: {
   query: string;
   currentPage: number;
}) {
   const { data: summaries, meta } = await loaders.getSummaries(
      query,
      currentPage,
   );
   const pageCount = meta?.pagination?.pageCount || 1;

   if (!summaries || summaries.length === 0) {
      return (
         <EmptySummaries
            title={
               query
                  ? "No encontramos resúmenes"
                  : "No tienes resúmenes todavía"
            }
            description={
               query
                  ? `No hay resultados para "${query}". Prueba con otra búsqueda.`
                  : "Crea tu primer resumen pegando un enlace de YouTube y deja que la IA transforme el contenido por ti."
            }
            action={
               query ? (
                  <ClearSearchButton />
               ) : (
                  <AppLink href="/dashboard" variant="outline">
                     Crear nuevo resumen
                  </AppLink>
               )
            }
         />
      );
   }

   return (
      <>
         <SummariesGrid summaries={summaries} />
         <PaginationComponent pageCount={pageCount} />
      </>
   );
}
