import { SummariesGrid } from "@/components/custom/summaries-grid";
import { loaders } from "@/data/loaders";
// import { SummariesGrid } from "@/components/custom/summaries-grid";

export default async function SummariesRoute() {
   const { data: summaries } = await loaders.getSummaries();

//    console.log(summaries);

   return (
      <div className="flex flex-col min-h-[calc(100vh-80px)] p-4 gap-6">
         <SummariesGrid summaries={summaries} className="grow" />
      </div>
   );
}
