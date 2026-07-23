import { SummariesGrid } from "@/components/custom/summaries-grid";
import { loaders } from "@/data/loaders";
// import { SummariesGrid } from "@/components/custom/summaries-grid";

export default async function SummariesRoute() {
   const { data: summaries } = await loaders.getSummaries();

//    console.log(summaries);

   return (
      <div className="flex flex-col gap-6">
         <SummariesGrid summaries={summaries} className="" />
      </div>
   );
}
