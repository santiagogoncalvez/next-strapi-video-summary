"use server";

import { FormState } from "@/types/definitions";
import { getValidationErrorState, handleActionError } from "./helpers";
import { SummarySchema } from "@/validations/summary";
import { services } from "@/services";
import { redirect } from "next/navigation";
import { getUserMeService } from "@/services/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function createSummaryAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      videoId: formData.get("videoId") as string,
   };

   const validatedFields = SummarySchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   const videoId = validatedFields.data.videoId;

   console.log("videoId:", videoId);

   try {
      const user = await getUserMeService();

      if ((user.credits || 0) < 1) {
         throw new Error("Insufficient credits");
      }

      const transcriptData = await services.summary.generateTranscript(videoId);

      const fullTranscript = transcriptData.fullTranscript;

      if (!fullTranscript) {
         throw new Error("No transcript data found");
      }

      // console.log("TRANSCRIPT:\n", fullTranscript);

      const summary = await services.summary.generateSummary(fullTranscript);

      if (!summary) {
         throw new Error("No summary generated");
      }

      // console.log("SUMMARY:\n", summary);

      const payload = {
         title: transcriptData.title || `Resumen para ${videoId}`,
         content: summary,
         videoId: videoId,
      };

      const saveResponse = await services.summary.saveSummaryService(payload);

      // Redirect to the summary details page
      redirect("/dashboard/summaries/" + saveResponse.data.documentId);
   } catch (error) {
      if (isRedirectError(error)) {
         throw error;
      }

      return handleActionError(error, fields);
   }
}
