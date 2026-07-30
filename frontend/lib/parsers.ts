import { TranscriptSegment } from "@/types/summary";

export function parseTranscript(transcript: string): TranscriptSegment[] {
   const matches = [
      ...transcript.matchAll(
         /^\[(\d{1,2}:\d{2}(?::\d{2})?)\]\s*([\s\S]*?)(?=^\[\d{1,2}:\d{2}(?::\d{2})?\]|\s*$)/gm,
      ),
   ];

   return matches.map((match, index) => {
      const start = parseTimestamp(match[1]);
      const text = match[2].trim();

      const end =
         index < matches.length - 1
            ? parseTimestamp(matches[index + 1][1])
            : start;

      return {
         text,
         start,
         end,
         duration: end - start,
      };
   });
}

function parseTimestamp(timestamp: string): number {
   const parts = timestamp.split(":").map(Number);

   if (parts.length === 2) {
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
   }

   const [hours, minutes, seconds] = parts;
   return hours * 3600 + minutes * 60 + seconds;
}
