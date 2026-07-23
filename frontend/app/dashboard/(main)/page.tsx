import { SummaryForm } from "@/components/form/summary-form";
import { getUserMeService } from "@/services/auth";

export default async function DashboardPage() {
   const user = await getUserMeService();

   return (
      <div className="h-full flex flex-col items-center justify-center gap-8  ">
         <SummaryForm username={user?.username} />
      </div>
   );
}
