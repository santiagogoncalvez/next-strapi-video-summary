"use client";

import { useActionState, useEffect, useRef } from "react";

import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { getFormErrorMessage } from "@/actions/helpers";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { SubmitButton } from "./submit-button";
import { SubmitButtonDropdown } from "./submit-button-dropwdown";

interface SummaryFavoriteFormProps {
   summaryId: string;
   favoriteId?: string;
   isFavorite: boolean;
   className?: string;
   variant?: "card" | "dropdown" | "drawer";
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
   variant = "card",
}: Readonly<SummaryFavoriteFormProps>) {
   const [favoriteFormState, favoriteFormAction, favoriteIsPending] =
      useActionState(
         actions.favorite.toggleFavoriteSummaryAction,
         INITIAL_STATE,
      );
   const lastTimestamp = useRef<number | null>(null);

   useEffect(() => {
      if (!favoriteFormState.timestamp) return;

      if (favoriteFormState.timestamp === lastTimestamp.current) return;

      lastTimestamp.current = favoriteFormState.timestamp;

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

         {variant === "card" && (
            <SubmitButton
               disabled={favoriteIsPending}
               loading={favoriteIsPending}
               text=""
               loadingText=""
               icon={
                  <Heart
                     className={cn(isFavorite && "fill-current", " size-4")}
                     strokeWidth={1.5}
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
         )}

         {variant === "dropdown" && (
            <SubmitButtonDropdown
               loading={favoriteIsPending}
               text={
                  isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"
               }
               loadingText={
                  isFavorite
                     ? "Eliminando de favoritos"
                     : "Agregando a favoritos"
               }
               icon={
                  <Heart
                     className={cn(isFavorite && "fill-current", "size-4")}
                     strokeWidth={1.5}
                  />
               }
               variant="none"
               size="none"
               onClick={(event) => {
                  event.stopPropagation();
               }}
               className="hover:cursor-pointer w-full"
            />
         )}

         {variant === "drawer" && (
            <SubmitButton
               loading={favoriteIsPending}
               text={
                  isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"
               }
               loadingText={
                  isFavorite
                     ? "Eliminando de favoritos"
                     : "Agregando a favoritos"
               }
               icon={
                  <Heart
                     className={cn(isFavorite && "fill-current", "size-4")}
                     strokeWidth={1.5}
                  />
               }
               variant="ghost"
               size="default"
               onClick={(event) => {
                  event.stopPropagation();
               }}
               className="hover:cursor-pointer w-full justify-start"
            />
         )}
      </form>
   );
}
