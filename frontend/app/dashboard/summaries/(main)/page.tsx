import { EmptySummaries } from "@/components/custom/empty-state-card";
import { PaginationComponent } from "@/components/custom/pagination-component";
import { Search } from "@/components/custom/search";
import { SummariesGrid } from "@/components/custom/summaries-grid";
import { loaders } from "@/data/loaders";
import { SearchParams } from "@/types/strapi";

interface SummariesRouteProps {
   searchParams: SearchParams;
}

export default async function SummariesRoute({
   searchParams,
}: SummariesRouteProps) {
   const resolvedSearchParams = await searchParams;
   const query = resolvedSearchParams?.query as string;
   const currentPage = Number(resolvedSearchParams?.page) || 1;
   const { data: summaries, meta } = await loaders.getSummaries(
      query,
      currentPage,
   );
   const pageCount = meta?.pagination?.pageCount || 1;

   return (
      <div className="flex flex-1 flex-col gap-8">
         <Search className="w-full" />

         {summaries.length > 0 ? (
            <>
               <SummariesGrid summaries={summaries} />
               <PaginationComponent pageCount={pageCount} />
            </>
         ) : (
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
            />
         )}
      </div>
   );
}
