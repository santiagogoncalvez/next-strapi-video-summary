// app/dashboard/summaries/[documentId]/_components/async-dashboard-header.tsx
import DashboardHeader from "@/components/custom/dashboard-header";
import { loaders } from "@/data/loaders";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { THUMBNAIL_AVATAR_VARIANTS } from "@/constants/styles";

export async function DashboardHeaderAsync({
   documentId,
}: {
   documentId: string;
}) {
   const res = await loaders.getSummaryWithFavoriteByDocumentId(documentId);
   const summary = res?.data ?? res; // Adaptado según la respuesta de tu API/Strapi

   if (!summary) return null;

   return <DashboardHeader title={summary.title} summary={summary} />;
}

export default function DashboardHeaderSkeleton() {
   return (
      <header className="max-w-full w-full p-4 shadow-none border-b-0 border-sidebar-border/50 flex justify-between items-center gap-4 h-16">
         <div className="flex gap-4 items-center min-w-0 flex-1">
            <Skeleton className="size-8 md:hidden flex rounded-md shrink-0" />

            <div className="flex gap-2 items-center justify-start min-w-0 flex-1">
               <Skeleton
                  className={cn(THUMBNAIL_AVATAR_VARIANTS({ size: "xs" }))}
               />
               <Skeleton className="h-5 w-36 sm:w-52 rounded-md" />
            </div>
         </div>

         <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24 rounded-md hidden md:flex" />
            <Skeleton className="size-8 rounded-md shrink-0" />
         </div>
      </header>
   );
}
