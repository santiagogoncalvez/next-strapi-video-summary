import { getYoutubeData, TranscriptData } from "youtube-transcript-plus";

function validateIdentifier(identifier: string): void {
   if (!identifier || typeof identifier !== "string") {
      throw new Error("Invalid YouTube video identifier");
   }
}

export async function generateTranscript(
   identifier: string,
): Promise<TranscriptData> {
   try {
      validateIdentifier(identifier);

      const youtubeData = await getYoutubeData(identifier);

      return {
         title: youtubeData.title,
         videoId: youtubeData.videoId,
         thumbnailUrl: youtubeData.thumbnailUrl,
         fullTranscript: youtubeData.fullTranscript,
         transcriptWithTimeCodes: youtubeData.transcriptWithTimeCodes,
      };
   } catch (error) {
      console.error("Error fetching transcript:", error);
      throw new Error(
         error instanceof Error ? error.message : "Failed to fetch transcript",
      );
   }
}
