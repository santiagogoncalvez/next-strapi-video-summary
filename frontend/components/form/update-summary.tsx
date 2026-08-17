"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { EditorWrapper } from "@/components/custom/editor/editor-wrapper";

import { Card, CardContent } from "@/components/ui/card";

import { FormError } from "@/components/form/form-error";

import { Summary } from "@/types/strapi";
import { SUMMARY_UPDATE_FORM_STYLES } from "@/constants/styles";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { getFormErrorMessage } from "@/actions/helpers";

interface SummaryUpdateFormProps {
   summary: Summary;
   onPendingChange: (pending: boolean) => void;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function SummaryUpdateForm({
   summary,
   onPendingChange,
}: Readonly<SummaryUpdateFormProps>) {
   const [updateFormState, updateFormAction, updateIsPending] = useActionState(
      actions.summarize.updateSummaryAction,
      INITIAL_STATE,
   );
   const [content, setContent] = useState(
      updateFormState.data?.content ?? summary.content,
   );
   const lastTimestamp = useRef<number | null>(null);

   useEffect(() => {
      onPendingChange(updateIsPending);
   }, [updateIsPending, onPendingChange]);

   useEffect(() => {
      if (!updateFormState.timestamp) return;

      if (updateFormState.timestamp === lastTimestamp.current) return;

      lastTimestamp.current = updateFormState.timestamp;

      if (updateFormState.success) {
         if (updateFormState.message) {
            toast.success(updateFormState.message, {
               position: "top-center",
               duration: 3000,
            });
         }

         return;
      }

      const errorMessage = getFormErrorMessage(updateFormState);

      if (errorMessage) {
         toast.error(errorMessage, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [updateFormState]);

   return (
      <div className={SUMMARY_UPDATE_FORM_STYLES.container}>
         <form
            id="summary-update-form"
            action={updateFormAction}
            className="w-full"
         >
            <Card>
               <CardContent className={SUMMARY_UPDATE_FORM_STYLES.content}>
                  <div className={SUMMARY_UPDATE_FORM_STYLES.fieldGroup}>
                     <input
                        type="hidden"
                        name="content"
                        value={content}
                        readOnly
                     />

                     <FormError error={updateFormState.zodErrors?.content} />

                     <EditorWrapper
                        key={summary.documentId}
                        markdown={
                           updateFormState.data?.content ?? summary.content
                        }
                        onChange={setContent}
                        className={SUMMARY_UPDATE_FORM_STYLES.editor}
                     />
                  </div>

                  <input
                     type="hidden"
                     name="documentId"
                     value={summary.documentId}
                  />
               </CardContent>
            </Card>
         </form>
      </div>
   );
}
