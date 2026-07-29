import { SummaryForm } from "@/components/form/summary-form";

export default async function DashboardPage() {
   return (
      <div className="h-full flex flex-col items-center justify-center gap-8  ">
         <SummaryForm />
      </div>
   );
}
