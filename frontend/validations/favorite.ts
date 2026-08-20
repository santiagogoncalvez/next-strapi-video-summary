import { z } from "zod";

export const ToggleFavoriteSummaryFormSchema = z.object({
   summaryDocumentId: z.string().min(1),
   favoriteDocumentId: z.string().optional(),
   isFavorite: z.boolean(),
});
