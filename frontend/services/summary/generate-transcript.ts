import {
   TranscriptData,
   TranscriptSegment,
   YouTubeTranscriptSegment,
   YouTubeAPIVideoInfo,
} from "@/types/summary";
import { Log } from "youtubei.js";

const processTranscriptSegments = (
   segments: YouTubeTranscriptSegment[],
): TranscriptSegment[] => {
   return segments.map((segment) => ({
      text: segment.snippet.text,
      start: Number(segment.start_ms),
      end: Number(segment.end_ms),
      duration: Number(segment.end_ms) - Number(segment.start_ms),
   }));
};

const cleanImageUrl = (url: string): string => url.split("?")[0];

const validateIdentifier = (identifier: string): void => {
   if (!identifier || typeof identifier !== "string") {
      throw new Error("Invalid YouTube video identifier");
   }
};

const extractBasicInfo = (info: YouTubeAPIVideoInfo) => {
   const { title, id: videoId, thumbnail } = info.basic_info;
   const thumbnailUrl = thumbnail?.[0]?.url;

   return {
      title: title || "Untitled Video",
      videoId,
      thumbnailUrl: thumbnailUrl ? cleanImageUrl(thumbnailUrl) : undefined,
   };
};

const getTranscriptSegments = async (
   info: YouTubeAPIVideoInfo,
): Promise<YouTubeTranscriptSegment[]> => {
   try {
      const transcriptData = await info.getTranscript();

      if (!transcriptData?.transcript?.content?.body?.initial_segments) {
         throw new Error("No transcript available for this video");
      }

      return transcriptData.transcript.content.body.initial_segments;
   } catch (error: any) {
      // Si es un error 400 o un error de la librería al buscar la transcripción
      if (
         error.message.includes("400") ||
         error.message.includes("Precondition")
      ) {
         throw new Error(
            "This video does not have subtitles available to generate a summary.",
         );
      }
      throw error; // Lanza cualquier otro error inesperado
   }
};

export const generateTranscript = async (
   identifier: string,
): Promise<TranscriptData> => {
   // console.log(identifier);
   try {
      const { Innertube } = await import("youtubei.js");

      // Silencia los logs de introspección y JIT del parser de YouTube
      Log.setLevel(Log.Level.ERROR);

      const youtube = await Innertube.create({
         lang: "en",
         location: "US",
         // retrieve_player: false,
      });

      // console.log("IDENTIFIER", identifier, "VS", "LCYBVpSB0Wo");

      validateIdentifier(identifier);

      const info = await youtube.getInfo(identifier);

      // console.log("INFO:", info);
      if (!info) {
         throw new Error("No video information found");
      }

      const { title, videoId, thumbnailUrl } = extractBasicInfo(
         info as YouTubeAPIVideoInfo,
      );
      const segments = await getTranscriptSegments(info as YouTubeAPIVideoInfo);

      // console.log("SEGMENTS TRANSCRIPT:", segments);

      const transcriptWithTimeCodes = processTranscriptSegments(segments);
      const fullTranscript = segments
         .map((segment) => segment.snippet.text)
         .join(" ");

      return {
         title,
         videoId,
         thumbnailUrl,
         fullTranscript,
         transcriptWithTimeCodes,
      };
   } catch (error) {
      console.error("Error fetching transcript:", error);
      throw new Error(
         error instanceof Error ? error.message : "Failed to fetch transcript",
      );
   }
};
