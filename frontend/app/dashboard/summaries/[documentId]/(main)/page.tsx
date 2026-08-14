// import { SummaryUpdateForm } from "@/components/form/update-summary";
import { YouTubePlayer } from "@/components/custom/youtube-player";
import { loaders } from "@/data/loaders";
import { extractYouTubeID } from "@/lib/utils";
import { Params } from "@/types/strapi";
import { notFound } from "next/navigation";
import { MarkdownViewer } from "@/components/custom/markdown-viewer";

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
               {/* <SummaryUpdateForm summary={summary}/>
                */}
               <MarkdownViewer content={summary.content} />
            </div>
            <div className="h-fit">
               <div>
                  {videoId ? (
                     <YouTubePlayer videoId={videoId} />
                  ) : (
                     <p>URL de vídeo no válida</p>
                  )}
                  {/* <h1 className="text-base font-medium mt-4">{summary.title}</h1> */}
               </div>
            </div>
         </div>
      </div>
   );
}
