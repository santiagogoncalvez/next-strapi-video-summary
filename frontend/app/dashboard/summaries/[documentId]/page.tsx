import { SummaryUpdateForm } from "@/components/custom/editor";
import { YouTubePlayer } from "@/components/custom/youtube-player";
import { loaders } from "@/data/loaders";
import { extractYouTubeID } from "@/lib/utils";
import { Params } from "@/types/strapi";
import { notFound } from "next/navigation";

interface PageProps {
   params: Params;
}

export default async function SummarySingleRoute({ params }: PageProps) {
   const resolvedParams = await params;
   const documentId = resolvedParams?.documentId;

   if (!documentId) notFound();

   const { data: summary } = await loaders.getSummaryByDocumentId(documentId);
   const videoId = extractYouTubeID(summary.videoId);

   return (
      <div className="h-fit w-full flex justify-center">
         <div className="h-fit w-full flex flex-col gap-8 max-w-2xl">
            <div className="h-full">
               <SummaryUpdateForm summary={summary}/>
            </div>
            <div className="h-fit">
               <div>
                  {videoId ? (
                     <YouTubePlayer videoId={videoId} />
                  ) : (
                     <p>Invalid video URL</p>
                  )}
                  <h1 className="text-2xl font-bold mt-4">{summary.title}</h1>
               </div>
            </div>
         </div>
      </div>
   );
}
