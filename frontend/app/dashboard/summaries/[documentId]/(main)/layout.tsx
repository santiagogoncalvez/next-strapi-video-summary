// app/dashboard/summaries/[documentId]/(main)/layout.tsx
import { Suspense } from "react";
import DashboardContent from "@/components/custom/dashboard-content";
import { Params } from "@/types/strapi";
import { notFound } from "next/navigation";
import DashboardHeaderSkeleton, {
   DashboardHeaderAsync,
} from "@/components/custom/dashboard-header-async";
import { Skeleton } from "@/components/ui/skeleton";

function PageContentSkeleton() {
   return (
      <div className="space-y-4 p-4">
         <Skeleton className="h-8 w-1/3" />
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-3/4" />
      </div>
   );
}

// 1. El Layout ahora es SÍNCRONO (sin async)
export default function Layout({
   children,
   params,
}: {
   children: React.ReactNode;
   params: Params;
}) {
   return (
      <DashboardContent
         headerSlot={
            <Suspense fallback={<DashboardHeaderSkeleton />}>
               {/* 2. Pasamos params como promesa al wrapper asíncrono */}
               <AsyncHeaderWrapper params={params} />
            </Suspense>
         }
      >
         <Suspense fallback={<PageContentSkeleton />}>{children}</Suspense>
      </DashboardContent>
   );
}

// 3. El await params ocurre DENTRO del límite de Suspense
async function AsyncHeaderWrapper({ params }: { params: Params }) {
   const { documentId } = await params;
   if (!documentId) notFound();

   return <DashboardHeaderAsync documentId={documentId} />;
}
