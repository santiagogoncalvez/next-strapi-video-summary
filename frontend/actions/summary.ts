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
   SummaryTitleUpdateFormSchema,
   SummaryUpdateFormSchema,
} from "@/validations/summary";
import { services } from "@/services";
import { getUserMeService } from "@/services/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { revalidatePath } from "next/cache";
import { SUMMARY_MESSAGES } from "@/constants/messages/summary";
import { SYSTEM_PROMPT } from "@/constants/prompts";
import { MAX_SUMMARY_INPUT_TOKENS } from "@/constants/ia";
import { summaryRateLimit } from "@/lib/rate-limit";

const MAX_VIDEO_DURATION = 3600; // 60 minutos

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

      const { success } = await summaryRateLimit.limit(`user:${user.id}`);

      if (!success) {
         throw new Error(SUMMARY_MESSAGES.ERROR.RATE_LIMIT_EXCEEDED);
      }

      const transcriptData = await services.summary.generateTranscript(videoId);

      if (transcriptData.duration > MAX_VIDEO_DURATION) {
         throw new Error(SUMMARY_MESSAGES.ERROR.VIDEO_TOO_LONG);
      }

      const fullTranscript = transcriptData.fullTranscript;

      if (!fullTranscript) {
         throw new Error(SUMMARY_MESSAGES.ERROR.TRANSCRIPT_NOT_FOUND);
      }

      // console.log("TRANSCRIPT:\n", fullTranscript);

      const tokenCount = await services.summary.countTokens(
         fullTranscript,
         SYSTEM_PROMPT,
      );

      console.log("Transcript tokens:", tokenCount);

      if (tokenCount > MAX_SUMMARY_INPUT_TOKENS) {
         throw new Error(SUMMARY_MESSAGES.ERROR.TOKEN_LIMIT_EXCEEDED);
      }

      const summary = await services.summary.generateSummary(fullTranscript);

      if (!summary) {
         throw new Error(SUMMARY_MESSAGES.ERROR.SUMMARY_NOT_GENERATED);
      }

      // console.log("SUMMARY:\n", summary);

      const payload = {
         title: transcriptData.title || `Resumen para ${videoId}`,
         content: summary,
         videoId: videoId,
         thumbnailUrl: transcriptData.thumbnailUrl,
      };

      const saveResponse = await services.summary.saveSummaryService(payload);

      const extendedFields = {
         ...fields,
         documentId: saveResponse.data.documentId,
      };

      revalidatePath("/dashboard");
      revalidatePath("/dashboard/summaries");

      return getSuccessFormState(
         SUMMARY_MESSAGES.SUCCESS.CREATED,
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
      // title: formData.get("title") as string,
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
      revalidatePath(`/dashboard/summaries/${documentId}/edit`);
      revalidatePath("/dashboard/summaries");

      return getSuccessFormState(
         SUMMARY_MESSAGES.SUCCESS.UPDATED,
         validatedFields.data,
      );
   } catch (error) {
      if (isRedirectError(error)) {
         throw error;
      }

      return handleActionError(error, fields);
   }
}

export async function updateSummaryTitleAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      title: formData.get("title") as string,
      documentId: formData.get("documentId") as string,
   };

   const validatedFields = SummaryTitleUpdateFormSchema.safeParse(fields);

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
         SUMMARY_MESSAGES.SUCCESS.UPDATED_TITLE,
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

      // Redirect after successful deletion (outside try/catch)
      return getSuccessFormState(
         SUMMARY_MESSAGES.SUCCESS.DELETED,
         validatedFields.data,
      );
   } catch (error) {
      if (isRedirectError(error)) {
         throw error;
      }

      return handleActionError(error, fields);
   }
}
