"use server";

import { FormState } from "@/types/definitions";
import { ToggleFavoriteSummaryFormSchema } from "@/validations/favorite";
import {
   getSuccessFormState,
   getValidationErrorState,
   handleActionError,
} from "./helpers";
import { services } from "@/services";
import { FAVORITE_MESSAGES } from "@/constants/messages/favorite";
import { revalidatePath } from "next/cache";

export async function toggleFavoriteSummaryAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      summaryDocumentId: formData.get("summaryDocumentId") as string,
      favoriteDocumentId:
         (formData.get("favoriteDocumentId") as string) || undefined,
      isFavorite: formData.get("isFavorite") === "true",
   };

   const validatedFields = ToggleFavoriteSummaryFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      const { summaryDocumentId, favoriteDocumentId, isFavorite } =
         validatedFields.data;

      if (isFavorite) {
         if (!favoriteDocumentId) {
            throw new Error("Favorite document ID is required.");
         }

         await services.favorite.deleteFavoriteSummaryService(
            favoriteDocumentId,
         );
      } else {
         await services.favorite.addFavoriteSummaryService(summaryDocumentId);
      }

      revalidatePath("/dashboard");
      revalidatePath("/dashboard/summaries");

      return getSuccessFormState(
         isFavorite
            ? FAVORITE_MESSAGES.SUCCESS.REMOVED
            : FAVORITE_MESSAGES.SUCCESS.ADDED,
         validatedFields.data,
      );
   } catch (error) {
      return handleActionError(error, fields);
   }
}
