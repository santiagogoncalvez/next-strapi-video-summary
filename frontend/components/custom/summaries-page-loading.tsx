// /dashboard/summaries/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from "@/components/ui/card";

const styles = {
   grid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",

   card: "group flex h-full flex-col p-4 border-0 border-border/50 bg-card-surface",

   header: "p-0 pb-4",

   title: "h-5 w-3/4",

   content: "flex-1 p-0",

   preview: "space-y-2",

   line: "h-3 w-full",
   shortLine: "h-3 w-4/5",
   shorterLine: "h-3 w-2/3",

   footer: "p-0 pb-4",
   date: "h-3 w-24",
};

function SummaryCardSkeleton() {
   return (
      <div className="aspect-square">
         <Card className={styles.card}>
            <CardHeader className={styles.header}>
               <Skeleton className={styles.title} />
            </CardHeader>

            <CardContent className={styles.content}>
               <div className={styles.preview}>
                  <Skeleton className={styles.line} />
                  <Skeleton className={styles.line} />
                  <Skeleton className={styles.shortLine} />
                  <Skeleton className={styles.shorterLine} />
               </div>
            </CardContent>

            <CardFooter className={styles.footer}>
               <Skeleton className={styles.date} />
            </CardFooter>
         </Card>
      </div>
   );
}

export function ToolbarLoading() {
   return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
         <Skeleton className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-3 h-10" />

         <Skeleton className="w-full h-10" />
      </div>
   );
}

export function SummariesGridSkeleton() {
   return (
      <div className={styles.grid}>
         {Array.from({ length: 8 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
         ))}
      </div>
   );
}

export default function SummariesLoading() {
   return (
      <div className="flex flex-col gap-4">
         <ToolbarLoading />

         <SummariesGridSkeleton/>

         <div className="w-full flex justify-center">
            <Skeleton className="w-100 max-w-full h-10" />
         </div>
      </div>
   );
}
