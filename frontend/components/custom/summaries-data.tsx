import { EmptySummaries } from "@/components/custom/empty-state-card";
import { PaginationComponent } from "@/components/custom/pagination-component";
import { SummariesGrid } from "@/components/custom/summaries-grid";
import { SummarySort } from "@/data/loaders";
import { SummaryWithFavorite } from "@/types/strapi";
import { ReactNode } from "react";

interface SummariesDataProps {
   query: string;
   currentPage: number;
   sort?: SummarySort;

   getSummaries: (
      query: string,
      page: number,
      sort?: SummarySort,
   ) => Promise<{
      data: SummaryWithFavorite[];
      meta?: {
         pagination?: {
            pageCount?: number;
         };
      };
   }>;

   emptyTitle: {
      search: string;
      default: string;
   };

   emptyDescription: {
      search: (query: string) => string;
      default: string;
   };

   emptyAction: {
      search: ReactNode;
      default: ReactNode;
   };
}

export async function SummariesData({
   query,
   currentPage,
   sort,
   getSummaries,
   emptyTitle,
   emptyDescription,
   emptyAction,
}: SummariesDataProps) {
   const { data: summaries, meta } = await getSummaries(
      query,
      currentPage,
      sort,
   );

   const pageCount = meta?.pagination?.pageCount || 1;

   if (summaries.length === 0) {
      return (
         <EmptySummaries
            title={query ? emptyTitle.search : emptyTitle.default}
            description={
               query
                  ? emptyDescription.search(query)
                  : emptyDescription.default
            }
            action={query ? emptyAction.search : emptyAction.default}
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
