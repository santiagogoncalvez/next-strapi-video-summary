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

const MAX_SEQUENCE_WORDS = 30;

function removeRepeatedText(text: string): string {
   const words = text.trim().split(/\s+/);

   const result: string[] = [];

   let i = 0;

   while (i < words.length) {
      let matched = false;

      const maxLength = Math.min(
         MAX_SEQUENCE_WORDS,
         Math.floor((words.length - i) / 2),
      );

      for (let length = maxLength; length >= 2; length--) {
         const first = words.slice(i, i + length).join(" ");
         const second = words.slice(i + length, i + length * 2).join(" ");

         if (first !== second) continue;

         result.push(...words.slice(i, i + length));

         i += length * 2;

         while (
            words.slice(i - length, i).join(" ") ===
            words.slice(i, i + length).join(" ")
         ) {
            i += length;
         }

         matched = true;
         break;
      }

      if (!matched) {
         result.push(words[i]);
         i++;
      }
   }

   return result.join(" ");
}

const MAX_OVERLAP_WORDS = 30;

function removeSegmentOverlaps(
   segments: TranscriptSegment[],
): TranscriptSegment[] {
   if (segments.length <= 1) {
      return segments;
   }

   const cleaned: TranscriptSegment[] = [segments[0]];

   for (let i = 1; i < segments.length; i++) {
      const previous = cleaned[cleaned.length - 1];

      const previousWords = previous.text.trim().split(/\s+/);
      const currentWords = segments[i].text.trim().split(/\s+/);

      let overlap = 0;

      const maxOverlap = Math.min(
         MAX_OVERLAP_WORDS,
         previousWords.length,
         currentWords.length,
      );

      // Buscar el mayor solapamiento posible
      for (let length = maxOverlap; length >= 2; length--) {
         const previousSuffix = previousWords.slice(-length).join(" ");
         const currentPrefix = currentWords.slice(0, length).join(" ");

         if (previousSuffix === currentPrefix) {
            overlap = length;
            break;
         }
      }

      cleaned.push({
         ...segments[i],
         text: currentWords.slice(overlap).join(" "),
      });
   }

   return cleaned.filter((segment) => segment.text.length > 0);
}

export function removeRepeatedTranscriptSegments(
   segments: TranscriptSegment[],
): TranscriptSegment[] {
   const cleaned = segments.map((segment) => ({
      ...segment,
      text: removeRepeatedText(segment.text),
   }));

   return removeSegmentOverlaps(cleaned);
}
