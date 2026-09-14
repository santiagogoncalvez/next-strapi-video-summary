import { cookies } from "next/headers";
import { SummaryForm } from "@/components/form/summary-form";

export default async function DashboardPage() {
   const cookieStore = await cookies();
   const pendingSummary = cookieStore.get("pending_summary")?.value;

   let pendingVideoId: string | undefined;
   let pendingVideoTimestamp: string | undefined;

   if (pendingSummary) {
      try {
         const data = JSON.parse(pendingSummary);

         if (typeof data.videoId === "string") {
            pendingVideoId = data.videoId;
         }

         if (typeof data.createdAt === "number") {
            pendingVideoTimestamp = String(data.createdAt);
         }
      } catch {
         pendingVideoId = undefined;
         pendingVideoTimestamp = undefined;
      }
   }

   console.log("PENDING VIDEO ID:", pendingVideoId);
   console.log("PENDING SUMMARY:", pendingSummary);

   return (
      <div className="h-full flex flex-col items-center justify-center gap-8">
         <SummaryForm
            pendingVideoId={pendingVideoId}
            pendingVideoTimestamp={pendingVideoTimestamp}
         />
      </div>
   );
}
