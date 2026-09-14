"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { SubmitButton } from "./submit-button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { parseFieldErrors } from "@/lib/parsers";
import { Button } from "../ui/button";

interface SummaryTitleFormProps {
   title?: string;
   documentId?: string;
   onSuccess: () => void;
   onCancel: () => void;
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
   onCancel,
   onSuccess,
}: Readonly<SummaryTitleFormProps>) {
   const [formState, formAction, isPending] = useActionState(
      actions.summarize.updateSummaryTitleAction,
      INITIAL_STATE,
   );

   const [currentTitle, setCurrentTitle] = useState(title ?? "");
   const lastTimestamp = useRef<number | null>(null);

   const isDirty = currentTitle !== (title ?? "");

   useEffect(() => {
      if (!formState.timestamp) return;

      if (formState.timestamp === lastTimestamp.current) return;

      lastTimestamp.current = formState.timestamp;

      if (formState.success) {
         if (formState.message) {
            toast.success(formState.message, {
               position: "top-center",
               duration: 3000,
            });
         }

         onSuccess();
         return;
      }
   }, [formState, onSuccess]);

   return (
      <form action={formAction} className="space-y-5">
         <fieldset disabled={isPending}>
            <Field
               data-invalid={!!formState.zodErrors?.title}
               className="gap-2"
            >
               <FieldLabel htmlFor="title">Nombre</FieldLabel>

               <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Ingresar nombre del resumen"
                  value={currentTitle}
                  onChange={(event) => setCurrentTitle(event.target.value)}
                  aria-invalid={!!formState.zodErrors?.title}
                  disabled={isPending}
                  autoFocus
               />

               <FieldError
                  errors={parseFieldErrors(formState.zodErrors?.title)}
               />
            </Field>
         </fieldset>

         <input type="hidden" name="documentId" value={documentId ?? ""} />

         {formState.strapiErrors && (
            <FieldError
               errors={parseFieldErrors(formState.strapiErrors.message)}
               className="text-center"
            />
         )}

         <div className="flex justify-end gap-2">
            <Button
               type="button"
               variant="ghost"
               size="lg"
               onClick={onCancel}
               disabled={isPending}
            >
               Cancelar
            </Button>

            <SubmitButton
               text="Guardar"
               loadingText="Guardando"
               disabled={!isDirty}
               loading={isPending}
            />
         </div>
      </form>
   );
}
