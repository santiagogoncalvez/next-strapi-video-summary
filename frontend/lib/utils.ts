import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseTranscript } from "./parsers";
import { TranscriptSegment } from "@/types/summary";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function getStrapiURL() {
   return process.env.STRAPI_URL ?? "http://localhost:1337";
}

export function delay(ms: number = 1000): Promise<void> {
   return new Promise((resolve) => {
      setTimeout(resolve, ms);
   });
}

export function extractYouTubeID(urlOrID: string): string | null {
   // Regular expression for YouTube ID format
   const regExpID = /^[a-zA-Z0-9_-]{11}$/;

   // Check if the input is a YouTube ID
   if (regExpID.test(urlOrID)) {
      return urlOrID;
   }

   // Regular expression for standard YouTube links
   const regExpStandard = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

   // Regular expression for YouTube Shorts links
   const regExpShorts = /youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/;

   // Regular expression for shortened YouTube links
   const regExpShort = /youtu\.be\/([a-zA-Z0-9_-]+)/;

   // Check for standard YouTube link
   const matchStandard = urlOrID.match(regExpStandard);
   if (matchStandard) {
      return matchStandard[1];
   }

   // Check for YouTube Shorts link
   const matchShorts = urlOrID.match(regExpShorts);
   if (matchShorts) {
      return matchShorts[1];
   }

   // Check for YouTube Shorts link
   const matchShort = urlOrID.match(regExpShort);
   if (matchShort) {
      return matchShort[1];
   }

   // Return null if no match is found
   return null;
}

export function formatDate(date: string | Date, locale = "es-AR"): string {
   return new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      year: "numeric",
   }).format(new Date(date));
}

export function extractTranscript(text: string): TranscriptSegment[] {
   const transcriptHeader = /^## Transcript\s*$/m;
   const firstTimestamp = /^\[\d{1,2}:\d{2}(?::\d{2})?\]/m;

   let start = text.search(transcriptHeader);

   if (start !== -1) {
      start += text.match(transcriptHeader)![0].length;
   } else {
      start = text.search(firstTimestamp);
   }

   if (start === -1) {
      return [];
   }

   const transcript = text
      .slice(start)
      .replace(/^---[\s\S]*$/m, "")
      .replace(/\n{2,}/g, "\n")
      .trim();

   const segments = parseTranscript(transcript);

   return segments;
}

export function throwError(message = "An unexpected error occurred"): never {
   throw new Error(message);
}