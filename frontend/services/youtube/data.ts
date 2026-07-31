import { TranscriptData } from "@/types/summary";
import { getTranscript } from "./transcript";
import { getYouTubeMetadata } from "@santiagogoncalvez1/youtube-transcript-plus";

export async function getYoutubeData(videoId: string): Promise<TranscriptData> {
   console.log(`[YouTube] Production provider → ${videoId}`);

   const [metadata, transcript] = await Promise.all([
      getYouTubeMetadata(videoId),
      getTranscript(videoId),
   ]);

   return {
      title: metadata.title,
      videoId,
      thumbnailUrl: metadata.thumbnailUrl,
      fullTranscript: transcript.text,
      transcriptWithTimeCodes: transcript.segments,
   };
}
