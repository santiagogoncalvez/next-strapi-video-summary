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
   summary: SummaryWithFavorite;
}

function SummaryCard({ summary }: SummaryCardProps) {
   return (
      <div className="relative block h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-xs rounded-2xl  border border-border/50  p-4 group">
         <Link
            href={`/dashboard/summaries/${summary.documentId}`}
            className="block h-full"
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

         {/* <div className="absolute right-3 top-3 z-10 group-hover:opacity-100 opacity-0 transition-all">
            <SummaryFavoriteForm
               summaryId={summary.documentId}
               favoriteId={summary.favoriteDocumentId}
               isFavorite={summary.isFavorite}
            />
         </div> */}
      </div>
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
