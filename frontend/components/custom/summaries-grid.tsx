import { cn, formatDate } from "@/lib/utils";
import { SummaryWithFavorite } from "@/types/strapi";

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
import { SummaryFavoriteForm } from "../form/favorite-summary";
// import { SummaryFavoriteForm } from "../form/favorite-summary";

export function getSummaryPreview(content: string, maxLength = 1000): string {
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
   summary: SummaryWithFavorite;
}

function SummaryCard({ summary }: SummaryCardProps) {
   return (
      <Link
         href={`/dashboard/summaries/${summary.documentId}`}
         className="relative block h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xs rounded-2xl  border-0 border-border/50 group"
      >
         <Card className={SUMMARY_GRID_STYLES.card}>
            <CardHeader className={SUMMARY_GRID_STYLES.header}>
               <CardTitle className={SUMMARY_GRID_STYLES.title}>
                  {summary.title || "Resumen sin título"}
               </CardTitle>

               <SummaryFavoriteForm
                  summaryId={summary.documentId}
                  favoriteId={summary.favoriteDocumentId}
                  isFavorite={summary.isFavorite}
                  className="flex h-fit text-muted-foreground"
               />
            </CardHeader>

            <CardContent className={SUMMARY_GRID_STYLES.content}>
               <div className="relative h-full">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                     {getSummaryPreview(summary.content)}
                  </p>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] bg-gradient-to-t from-card-surface to-transparent" />
               </div>
            </CardContent>

            <CardFooter className={SUMMARY_GRID_STYLES.footer}>
               {summary.thumbnailUrl !== "" && (
                  <ThumbnailAvatar
                     src={summary.thumbnailUrl}
                     alt={summary.title}
                     size="xs"
                  />
               )}
               <p className="text-sm text-muted-foreground/80">
                  {formatDate(summary.createdAt)}
               </p>
            </CardFooter>
         </Card>
      </Link>
   );
}

interface SummariesGridProps {
   summaries: SummaryWithFavorite[];
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
