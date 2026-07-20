import z from "zod";
import { extractYouTubeID } from "@/lib/utils";

export const SummarySchema = z.object({
   videoId: z
      .string()
      .min(1, "YouTube video is required")
      .transform((value, ctx) => {
         const videoId = extractYouTubeID(value);

         if (!videoId) {
            ctx.addIssue({
               code: "custom",
               message: "Invalid YouTube URL or ID",
            });

            return z.NEVER;
         }

         return videoId;
      }),
});

export type SummaryFormValues = z.infer<typeof SummarySchema>;
