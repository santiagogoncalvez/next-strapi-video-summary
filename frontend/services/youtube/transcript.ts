import { TRANSCRIPT_MESSAGES } from "@/constants/messages/transcript";
import {
   removeRepeatedTranscriptSegments,
} from "@/lib/parsers";
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

      const segments = extractTranscript(data);

      if (!segments.length) {
         throw new Error(TRANSCRIPT_MESSAGES.ERROR.EMPTY);
      }

      const cleanedSegments = removeRepeatedTranscriptSegments(segments);

      const text = cleanedSegments.map((segment) => segment.text).join(" ");

      return {
         text,
         segments: cleanedSegments,
      };
   } catch (error) {
      if (axios.isAxiosError(error)) {
         if (error.code === "ECONNABORTED") {
            throw new Error(TRANSCRIPT_MESSAGES.ERROR.TIMEOUT);
         }

         switch (error.response?.status) {
            case 400:
               throw new Error(TRANSCRIPT_MESSAGES.ERROR.INVALID_VIDEO_ID);
            case 404:
               throw new Error(TRANSCRIPT_MESSAGES.ERROR.NOT_FOUND);
            case 429:
               throw new Error(TRANSCRIPT_MESSAGES.ERROR.RATE_LIMIT);
            case 500:
            case 502:
            case 503:
            case 504:
               throw new Error(TRANSCRIPT_MESSAGES.ERROR.SERVICE_UNAVAILABLE);
            default:
               throw new Error(TRANSCRIPT_MESSAGES.ERROR.FETCH_FAILED);
         }
      }

      if (error instanceof Error) {
         throw error;
      }

      throw new Error(TRANSCRIPT_MESSAGES.ERROR.UNKNOWN);
   }
}
