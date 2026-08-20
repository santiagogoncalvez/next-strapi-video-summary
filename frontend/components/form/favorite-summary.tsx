"use client";

import { useActionState, useEffect, useOptimistic } from "react";

import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { getFormErrorMessage } from "@/actions/helpers";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmitButton } from "./submit-button";
import { useRouter } from "next/navigation";

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
   const router = useRouter();

   const [optimisticIsFavorite, setOptimisticIsFavorite] =
      useOptimistic(isFavorite);

   const [favoriteFormState, favoriteFormAction, favoriteIsPending] =
      useActionState(
         actions.favorite.toggleFavoriteSummaryAction,
         INITIAL_STATE,
      );

   const optimisticFavoriteAction = async (formData: FormData) => {
      setOptimisticIsFavorite(!optimisticIsFavorite);

      await favoriteFormAction(formData);
   };

   useEffect(() => {
      if (!favoriteFormState.timestamp) return;

      if (favoriteFormState.success) {
         if (favoriteFormState.message) {
            toast.success(favoriteFormState.message, {
               position: "top-center",
               duration: 3000,
            });
         }

         router.refresh();

         return;
      }

      const errorMessage = getFormErrorMessage(favoriteFormState);

      if (errorMessage) {
         toast.error(errorMessage, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [favoriteFormState, router]);

   return (
      <form action={optimisticFavoriteAction} className={className}>
         <input type="hidden" name="summaryDocumentId" value={summaryId} />

         <input
            type="hidden"
            name="favoriteDocumentId"
            value={favoriteId ?? ""}
         />

         <input type="hidden" name="isFavorite" value={String(isFavorite)} />

         <SubmitButton
            disabled={favoriteIsPending}
            text=""
            loadingText=""
            icon={
               <Heart className={cn(optimisticIsFavorite && "fill-current")} />
            }
            aria-label={
               optimisticIsFavorite
                  ? "Eliminar de favoritos"
                  : "Añadir a favoritos"
            }
            className={cn(
               "transition-opacity",
               favoriteIsPending && "opacity-50",
            )}
         />
      </form>
   );
}
