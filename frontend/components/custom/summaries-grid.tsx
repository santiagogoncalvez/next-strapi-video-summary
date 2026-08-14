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
import { SUMMARY_GRID_STYLES } from "@/constants/styles";
import { ThumbnailAvatar } from "./thumbnail-avatar";

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
            </CardHeader>

            <CardContent className={SUMMARY_GRID_STYLES.content}>
               <p className="line-clamp-4 text-sm text-muted-foreground">
                  {getSummaryPreview(summary.content)}
               </p>
            </CardContent>

            <CardFooter className={SUMMARY_GRID_STYLES.footer}>
               {summary.thumbnailUrl !== "" && (
                  <ThumbnailAvatar
                     src={summary.thumbnailUrl}
                     alt={summary.title}
                     size="xs"
                  />
               )}
               <p className="text-xs text-muted-foreground/80">
                  {formatDate(summary.createdAt)}
               </p>
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
