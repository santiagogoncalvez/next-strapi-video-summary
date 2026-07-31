import { parseTranscript } from "@/lib/parsers";
import { extractTranscript } from "@/lib/utils";
import { TranscriptResult } from "@/types/summary";
import axios from "axios";

const BASE_URL = "https://youtube-transcript.ai/transcript";

export async function getTranscript(
   videoId: string,
): Promise<TranscriptResult> {
   if (!videoId?.trim()) {
      throw new Error("Video ID is required.");
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

      const transcriptWithTimestamps = extractTranscript(data, {
         includeTimestamps: true,
      });

      if (!transcriptWithTimestamps) {
         throw new Error("Transcript is empty.");
      }

      const segments = parseTranscript(transcriptWithTimestamps);

      const text = segments.map((segment) => segment.text).join(" ");

      return {
         text,
         segments,
      };
   } catch (error) {
      if (axios.isAxiosError(error)) {
         if (error.code === "ECONNABORTED") {
            throw new Error("Transcript request timed out.");
         }

         switch (error.response?.status) {
            case 400:
               throw new Error("Invalid YouTube video ID.");
            case 404:
               throw new Error("Transcript not found.");
            case 429:
               throw new Error("Transcript service rate limit exceeded.");
            case 500:
            case 502:
            case 503:
            case 504:
               throw new Error(
                  "Transcript service is temporarily unavailable.",
               );
            default:
               throw new Error(
                  error.response?.data
                     ? `Failed to fetch transcript: ${String(error.response.data)}`
                     : "Failed to fetch transcript.",
               );
         }
      }

      if (error instanceof Error) {
         throw error;
      }

      throw new Error("Unknown error while fetching transcript.");
   }
}
