import z from "zod";
import { extractYouTubeID } from "@/lib/utils";
import { SUMMARY_VALIDATION_MESSAGES } from "@/constants/validations/summary";

export const SummarySchema = z.object({
   videoId: z
      .string()
      .min(1, SUMMARY_VALIDATION_MESSAGES.VIDEO.REQUIRED)
      .transform((value, ctx) => {
         const videoId = extractYouTubeID(value);

         if (!videoId) {
            ctx.addIssue({
               code: "custom",
               message: SUMMARY_VALIDATION_MESSAGES.VIDEO.INVALID,
            });

            return z.NEVER;
         }

         return videoId;
      }),
});

export type SummaryFormValues = z.infer<typeof SummarySchema>;


export const SummaryUpdateFormSchema = z.object({
   // title: z
   //    .string()
   //    .min(1, SUMMARY_VALIDATION_MESSAGES.TITLE.REQUIRED)
   //    .max(200, SUMMARY_VALIDATION_MESSAGES.TITLE.MAX(200)),
   content: z
      .string()
      .min(10, SUMMARY_VALIDATION_MESSAGES.CONTENT.MIN(10))
      .max(50000, SUMMARY_VALIDATION_MESSAGES.CONTENT.MAX(50000)),
   documentId: z.string().min(1, SUMMARY_VALIDATION_MESSAGES.DOCUMENT.REQUIRED),
});

export type SummaryUpdateFormValues = z.infer<typeof SummaryUpdateFormSchema>;

export const SummaryDeleteFormSchema = z.object({
   documentId: z.string().min(1, SUMMARY_VALIDATION_MESSAGES.DOCUMENT.REQUIRED),
});

export type SummaryDeleteFormValues = z.infer<typeof SummaryDeleteFormSchema>;