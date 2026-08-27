import { Search } from "@/components/custom/search";
import { SummarySortSelect } from "@/components/custom/summary-sort-select";
import { SummarySort } from "@/data/loaders";

interface SummariesToolbarProps {
   sort?: SummarySort;
}

export function SummariesToolbar({ sort }: SummariesToolbarProps) {
   return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         <Search className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-3" />

         {sort && <SummarySortSelect />}
      </div>
   );
}
