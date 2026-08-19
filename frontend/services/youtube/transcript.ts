import { TRANSCRIPT_MESSAGES } from "@/constants/messages/transcript";
import { YouTubeServiceError } from "@/errors/youtube-service-error";
import { removeRepeatedTranscriptSegments } from "@/lib/parsers";
import { extractTranscript } from "@/lib/utils";
import { TranscriptResult } from "@/types/summary";
import axios from "axios";

const BASE_URL = "https://youtube-transcript.ai/transcript";

export async function getTranscript(
   videoId: string,
): Promise<TranscriptResult> {
   if (!videoId?.trim()) {
      throw new Error(TRANSCRIPT_MESSAGES.ERROR.VIDEO_ID_REQUIRED);
   }

   try {
      const { data } = await axios.get<string>(
         `${BASE_URL}/${encodeURIComponent(videoId)}.txt`,
         {
            headers: {
               Accept: "text/plain",
            },
            responseType: "text",
            timeout: 15_000,
         },
      );

      if (data.includes("# No captions available")) {
         throw new YouTubeServiceError(
            "NO_TRANSCRIPT",
            "No captions available for this video",
            400,
         );
      }

      const segments = extractTranscript(data);

      if (!segments.length) {
         throw new YouTubeServiceError(
            "EMPTY_TRANSCRIPT",
            "Transcript segments are empty",
            400,
         );
      }

      const cleanedSegments = removeRepeatedTranscriptSegments(segments);

      const text = cleanedSegments.map((segment) => segment.text).join(" ");

      return {
         text,
         segments: cleanedSegments,
      };
   } catch (error) {
      if (error instanceof YouTubeServiceError) throw error;

      if (axios.isAxiosError(error)) {
         if (error.code === "ECONNABORTED") {
            throw new YouTubeServiceError("TIMEOUT", "Request timed out", 408);
         }

         switch (error.response?.status) {
            case 400:
               throw new YouTubeServiceError(
                  "INVALID_VIDEO_ID",
                  "Invalid video ID",
                  400,
               );
            case 404:
               throw new YouTubeServiceError(
                  "NOT_FOUND",
                  "Video or transcript not found",
                  404,
               );
            case 429:
               throw new YouTubeServiceError(
                  "RATE_LIMIT",
                  "Rate limit exceeded",
                  429,
               );
            default:
               throw new YouTubeServiceError(
                  "SERVICE_UNAVAILABLE",
                  "External service unavailable",
                  503,
               );
         }
      }

      throw new YouTubeServiceError(
         "UNKNOWN_ERROR",
         "An unexpected error occurred",
         500,
      );
   }
}
