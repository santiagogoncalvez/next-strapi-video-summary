import { AppLink } from "@/components/custom/custom-link";
import { ClearSearchButton } from "@/components/custom/clear-search-button";
import { SummariesList } from "@/components/custom/summaries-list";

import { loaders, SummarySort } from "@/data/loaders";
import { SearchParams } from "@/types/strapi";

interface SummariesRouteProps {
   searchParams: SearchParams;
}

export default async function SummariesRoute({
   searchParams,
}: SummariesRouteProps) {
   const resolvedSearchParams = await searchParams;

   const query = (resolvedSearchParams?.query as string) || "";
   const currentPage = Number(resolvedSearchParams?.page) || 1;
   const sort = (resolvedSearchParams?.sort as SummarySort) || "newest";

   return (
         <SummariesList
            query={query}
            currentPage={currentPage}
            sort={sort}
            getSummaries={loaders.getSummaries}
            emptyTitle={{
               search: "No encontramos resúmenes",
               default: "No tienes resúmenes todavía",
            }}
            emptyDescription={{
               search: (query) =>
                  `No hay resultados para "${query}". Prueba con otra búsqueda.`,
               default:
                  "Crea tu primer resumen pegando un enlace de YouTube y deja que la IA transforme el contenido por ti.",
            }}
            emptyAction={{
               search: <ClearSearchButton />,
               default: (
                  <AppLink href="/dashboard" variant="outline">
                     Crear nuevo resumen
                  </AppLink>
               ),
            }}
         />
   );
}
