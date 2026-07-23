"use server";

import { FormState } from "@/types/definitions";
import {
   getSuccessFormState,
   getValidationErrorState,
   handleActionError,
} from "./helpers";
import {
   SummaryDeleteFormSchema,
   SummarySchema,
   SummaryUpdateFormSchema,
} from "@/validations/summary";
import { services } from "@/services";
import { getUserMeService } from "@/services/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

      const extendedFields = {
         ...fields,
         documentId: saveResponse.data.documentId,
      };

      return getSuccessFormState(
         "Summary created successfully",
         extendedFields,
      );
   } catch (error) {
      if (isRedirectError(error)) {
         throw error;
      }

      return handleActionError(error, fields);
   }
}

export async function updateSummaryAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      documentId: formData.get("documentId") as string,
   };

   const validatedFields = SummaryUpdateFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   const { documentId, ...updateData } = validatedFields.data;

   try {
      await services.summary.updateSummaryService(documentId, updateData);

      // Revalidate the current page and summaries list to show updated data
      revalidatePath(`/dashboard/summaries/${documentId}`);
      revalidatePath("/dashboard/summaries");

      return getSuccessFormState(
         "Summary updated successfully",
         validatedFields.data,
      );
   } catch (error) {
      if (isRedirectError(error)) {
         throw error;
      }

      return handleActionError(error, fields);
   }
}

export async function deleteSummaryAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      documentId: formData.get("documentId") as string,
   };

   const validatedFields = SummaryDeleteFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await services.summary.deleteSummaryService(
         validatedFields.data.documentId,
      );

      // If we get here, deletion was successful
      revalidatePath("/dashboard/summaries");
   } catch (error) {
      if (isRedirectError(error)) {
         throw error;
      }

      return handleActionError(error, fields);
   }

   // Redirect after successful deletion (outside try/catch)
   redirect("/dashboard/summaries");
}
