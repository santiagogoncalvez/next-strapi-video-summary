import { SummariesList } from "@/components/custom/summaries-list";
import { ClearSearchButton } from "@/components/custom/clear-search-button";
import { AppLink } from "@/components/custom/custom-link";

import { loaders, SummarySort } from "@/data/loaders";
import { SearchParams } from "@/types/strapi";

interface FavoritesRouteProps {
   searchParams: SearchParams;
}

export default async function FavoritesRoute({
   searchParams,
}: FavoritesRouteProps) {
   const resolvedSearchParams = await searchParams;

   const query = (resolvedSearchParams?.query as string) || "";
   const currentPage = Number(resolvedSearchParams?.page) || 1;
   const sort = (resolvedSearchParams?.sort as SummarySort) || "newest";

   return (
      <SummariesList
         query={query}
         currentPage={currentPage}
         sort={sort}
         getSummaries={loaders.getFavoriteSummaries}
         emptyTitle={{
            search: "No encontramos favoritos",
            default: "No tienes favoritos todavía",
         }}
         emptyDescription={{
            search: (query) =>
               `No hay favoritos para "${query}". Prueba con otra búsqueda.`,
            default:
               "Los resúmenes que marques como favoritos aparecerán aquí.",
         }}
         emptyAction={{
            search: <ClearSearchButton />,
            default: (
               <AppLink href="/dashboard/summaries" variant="outline">
                  Explorar resúmenes
               </AppLink>
            ),
         }}
      />
   );
}
