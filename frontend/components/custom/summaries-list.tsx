import { Suspense } from "react";

import { SummariesData } from "@/components/custom/summaries-data";
import { SummariesToolbar } from "@/components/custom/summaries-toolbar";
import { SummarySort } from "@/data/loaders";
import { ReactNode } from "react";
import { SummariesGridSkeleton } from "./summaries-page-loading";

interface SummariesListProps {
   query: string;
   currentPage: number;
   sort?: SummarySort;

   getSummaries: (
      query: string,
      page: number,
      sort?: SummarySort,
   ) => Promise<{
      data: any[];
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

export function SummariesList({
   query,
   currentPage,
   sort,
   getSummaries,
   emptyTitle,
   emptyDescription,
   emptyAction,
}: SummariesListProps) {
   return (
      <div className="flex flex-1 flex-col gap-4">
         <SummariesToolbar sort={sort} />

         <Suspense
            key={`${query}-${currentPage}-${sort}`}
            fallback={<SummariesGridSkeleton />}
         >
            <SummariesData
               query={query}
               currentPage={currentPage}
               sort={sort}
               getSummaries={getSummaries}
               emptyTitle={emptyTitle}
               emptyDescription={emptyDescription}
               emptyAction={emptyAction}
            />
         </Suspense>
      </div>
   );
}
