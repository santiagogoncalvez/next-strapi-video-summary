"use client";

import { useActionState, useEffect } from "react";

import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { getFormErrorMessage } from "@/actions/helpers";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmitButton } from "./submit-button";

interface SummaryFavoriteFormProps {
   summaryId: string;
   favoriteId?: string;
   isFavorite: boolean;
   className?: string;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function SummaryFavoriteForm({
   summaryId,
   favoriteId,
   isFavorite,
   className,
}: Readonly<SummaryFavoriteFormProps>) {
   const [favoriteFormState, favoriteFormAction, favoriteIsPending] =
      useActionState(
         actions.favorite.toggleFavoriteSummaryAction,
         INITIAL_STATE,
      );

   useEffect(() => {
      if (!favoriteFormState.timestamp) return;

      if (favoriteFormState.success) {
         if (favoriteFormState.message) {
            toast.success(favoriteFormState.message, {
               position: "top-center",
               duration: 3000,
            });
         }

         return;
      }

      const errorMessage = getFormErrorMessage(favoriteFormState);

      if (errorMessage) {
         toast.error(errorMessage, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [favoriteFormState]);

   return (
      <form
         action={favoriteFormAction}
         className={className}
         id="summary-favorite-form"
      >
         <input type="hidden" name="summaryDocumentId" value={summaryId} />

         <input
            type="hidden"
            name="favoriteDocumentId"
            value={favoriteId ?? ""}
         />

         <input type="hidden" name="isFavorite" value={String(isFavorite)} />

         <SubmitButton
            disabled={favoriteIsPending}
            loading={favoriteIsPending}
            text=""
            loadingText=""
            icon={
               <Heart
                  className={cn(isFavorite && "fill-current", " size-4")}
                  
               />
            }
            aria-label={
               isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"
            }
            variant="none"
            size="none"
            onClick={(event) => {
               event.stopPropagation();
            }}
         />
      </form>
   );
}
