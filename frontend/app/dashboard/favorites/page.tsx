import { ClearSearchButton } from "@/components/custom/clear-search-button";
import { AppLink } from "@/components/custom/custom-link";
import { EmptySummaries } from "@/components/custom/empty-state-card";
import { PaginationComponent } from "@/components/custom/pagination-component";
import { Search } from "@/components/custom/search";
import { SummariesGrid } from "@/components/custom/summaries-grid";
import { loaders } from "@/data/loaders";
import { SearchParams } from "@/types/strapi";

interface FavoritesRouteProps {
   searchParams: SearchParams;
}

export default async function FavoritesRoute({
   searchParams,
}: FavoritesRouteProps) {
   const resolvedSearchParams = await searchParams;
   const query = resolvedSearchParams?.query as string;
   const currentPage = Number(resolvedSearchParams?.page) || 1;
   const { data: summaries, meta } = await loaders.getFavoriteSummaries(
      query,
      currentPage,
   );
   const pageCount = meta?.pagination?.pageCount || 1;

   // console.log("summaries:", summaries);

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
                     ? "No encontramos favoritos"
                     : "No tienes favoritos todavía"
               }
               description={
                  query
                     ? `No hay favoritos para "${query}". Prueba con otra búsqueda.`
                     : "Los resúmenes que marques como favoritos aparecerán aquí."
               }
               action={
                  query ? (
                     <ClearSearchButton />
                  ) : (
                     <AppLink href="/dashboard/summaries" variant="outline">
                        Explorar resúmenes
                     </AppLink>
                  )
               }
            />
         )}
      </div>
   );
}
