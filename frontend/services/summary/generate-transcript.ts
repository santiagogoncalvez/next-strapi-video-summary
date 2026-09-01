import { getYoutubeData } from "../youtube";
import { SUMMARY_VALIDATION_MESSAGES } from "@/constants/validations/summary";
import { handleYouTubeError } from "../error-handler";
import { TranscriptData } from "@santiagogoncalvez1/youtube-transcript-plus";

function validateIdentifier(identifier: string): void {
   if (!identifier || typeof identifier !== "string") {
      throw new Error(SUMMARY_VALIDATION_MESSAGES.VIDEO.INVALID_IDENTIFIER);
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
         duration: youtubeData.duration,
      };
   } catch (error) {
      handleYouTubeError(error);
   }
}
