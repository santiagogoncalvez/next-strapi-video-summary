"use client";

import { useActionState, useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { SubmitButton } from "./submit-button";
import { cn } from "@/lib/utils";

interface SummaryTitleFormProps {
   title?: string;
   documentId?: string;
   onFinishEditing: () => void;
   inputRef: React.RefObject<HTMLInputElement | null>;
   className?: string;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function SummaryTitleForm({
   title,
   documentId,
   onFinishEditing,
   inputRef,

   className,
}: Readonly<SummaryTitleFormProps>) {
   const [updateTitleFormState, updateTitleFormAction, updateTitleIsPending] =
      useActionState(actions.summarize.updateSummaryTitleAction, INITIAL_STATE);

   const lastTimestamp = useRef<number | null>(null);

   useEffect(() => {
      if (!updateTitleFormState.timestamp) return;

      if (updateTitleFormState.timestamp === lastTimestamp.current) return;

      lastTimestamp.current = updateTitleFormState.timestamp;

      if (updateTitleFormState.success) {
         toast.success(updateTitleFormState.message, {
            position: "top-center",
            duration: 3000,
         });

         onFinishEditing();

         return;
      }

      if (updateTitleFormState.message) {
         toast.error(updateTitleFormState.message, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [
      updateTitleFormState.success,
      updateTitleFormState.message,
      updateTitleFormState.timestamp,
      onFinishEditing,
   ]);

   function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
      if (event.key === "Escape") {
         event.preventDefault();
         onFinishEditing();
      }
   }

   function handleBlur() {
      if (!updateTitleIsPending) {
         onFinishEditing();
      }
   }

   useEffect(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
   }, [inputRef]);

   return (
      <form
         action={updateTitleFormAction}
         className={cn(`flex items-center gap-1`, className)}
      >
         <Input
            ref={inputRef}
            id="title"
            name="title"
            type="text"
            placeholder="Ingresar título de resumen"
            defaultValue={title}
            disabled={updateTitleIsPending}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            inputSize="sm"
         />

         <input type="hidden" name="documentId" value={documentId} />

         <SubmitButton
            text=""
            loadingText=""
            loading={updateTitleIsPending}
            variant="ghost"
            size="icon"
            icon={<Check />}
            onMouseDown={(event) => {
               // Evita que el blur cierre el editor antes de enviar el formulario.
               event.preventDefault();
            }}
         />
      </form>
   );
}
