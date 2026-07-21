import { cn, formatDate } from "@/lib/utils";
import { Summary } from "@/types/strapi";

import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function getSummaryPreview(content: string, maxLength = 180): string {
   return content
      .replace(/#{1,6}\s/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/`/g, "")
      .replace(/\n+/g, " ")
      .trim()
      .slice(0, maxLength)
      .concat("...");
}

const SUMMARY_GRID_STYLES = {
   grid: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",

   card: cn(
      "group flex h-full flex-col p-4 border border-border/50",
      "transition-all duration-200 hover:-translate-y-1 hover:shadow-xs",
   ),

   header: "",

   title: cn(
      "line-clamp-2",
      "text-lg leading-tight",
      "group-hover:text-primary transition-colors",
   ),

   content: "flex-1",

   markdown: cn(
      "prose prose-sm max-w-none",
      "prose-headings:hidden",
      "prose-p:text-muted-foreground",
      "prose-p:leading-relaxed",
      "prose-p:mb-2",
      "prose-ul:text-muted-foreground",
      "prose-ol:text-muted-foreground",
      "prose-li:mb-1",
      "[&>*:nth-child(n+3)]:hidden",
   ),

   footer:
      "pt-0 pb-4 text-sm font-medium text-primary underline-offset-4 group-hover:underline",
};

interface SummaryCardProps {
   summary: Summary;
}

function SummaryCard({ summary }: SummaryCardProps) {
   return (
      <Link
         href={`/dashboard/summaries/${summary.documentId}`}
         className="block h-full"
      >
         <Card className={SUMMARY_GRID_STYLES.card}>
            <CardHeader className={SUMMARY_GRID_STYLES.header}>
               <CardTitle className={SUMMARY_GRID_STYLES.title}>
                  {summary.title || "Resumen sin título"}
               </CardTitle>

               <p className="text-xs text-muted-foreground/80">
                  {formatDate(summary.createdAt)}
               </p>
            </CardHeader>

            <CardContent className={SUMMARY_GRID_STYLES.content}>
               <p className="line-clamp-4 text-sm text-muted-foreground">
                  {getSummaryPreview(summary.content)}
               </p>
            </CardContent>

            <CardFooter className={SUMMARY_GRID_STYLES.footer}>
               Ver resumen
            </CardFooter>
         </Card>
      </Link>
   );
}

interface SummariesGridProps {
   summaries: Summary[];
   className?: string;
}

export function SummariesGrid({ summaries, className }: SummariesGridProps) {
   return (
      <div className={cn(SUMMARY_GRID_STYLES.grid, className)}>
         {summaries.map((summary) => (
            <div key={summary.documentId} className="aspect-square">
               <SummaryCard summary={summary} />
            </div>
         ))}
      </div>
   );
}
