import { Search } from "@/components/custom/search";
import { SummariesGrid } from "@/components/custom/summaries-grid";
import { loaders } from "@/data/loaders";
import { SearchParams } from "@/types/strapi";

interface SummariesRouteProps {
   searchParams: SearchParams;
}

export default async function SummariesRoute({ searchParams }: SummariesRouteProps) {
    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams?.query as string;
   const { data: summaries } = await loaders.getSummaries(query);

   return (
      <div className="flex flex-col gap-4">
         <Search className="w-full" />
         <SummariesGrid summaries={summaries} className="" />
      </div>
   );
}
