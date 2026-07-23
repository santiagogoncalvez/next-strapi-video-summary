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


export const SummaryUpdateFormSchema = z.object({
   title: z
      .string()
      .min(1, "Title is required")
      .max(200, "Title must be less than 200 characters"),
   content: z
      .string()
      .min(10, "Content must be at least 10 characters")
      .max(50000, "Content must be less than 50,000 characters"),
   documentId: z.string().min(1, "Document ID is required"),
});

export type SummaryUpdateFormValues = z.infer<typeof SummaryUpdateFormSchema>;

export const SummaryDeleteFormSchema = z.object({
   documentId: z.string().min(1, "Document ID is required"),
});

export type SummaryDeleteFormValues = z.infer<typeof SummaryDeleteFormSchema>;