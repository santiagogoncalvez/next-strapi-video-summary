"use client";

import { useActionState, useEffect, useRef } from "react";

import { EditorWrapper } from "@/components/custom/editor/editor-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { FormError } from "@/components/form/form-error";
import { Summary } from "@/types/strapi";
import { SUMMARY_UPDATE_FORM_STYLES } from "@/constants/styles";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { getFormErrorMessage } from "@/actions/helpers";
import { useRouter } from "next/navigation";

interface SummaryUpdateFormProps {
   summary: Summary;
   onPendingChange: (pending: boolean) => void;
   onDirtyChange: (dirty: boolean) => void;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

function normalizeContent(content: string) {
   return content.replace(/\r\n/g, "\n").trim();
}

export function SummaryUpdateForm({
   summary,
   onPendingChange,
   onDirtyChange,
}: Readonly<SummaryUpdateFormProps>) {
   const router = useRouter();
   const [updateFormState, updateFormAction, updateIsPending] = useActionState(
      actions.summarize.updateSummaryAction,
      INITIAL_STATE,
   );

   const contentRef = useRef(summary.content);
   const isDirtyRef = useRef(false);
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

         if (updateFormState.data?.content) {
            contentRef.current = updateFormState.data.content;
         }

         isDirtyRef.current = false;
         onDirtyChange(false);

         router.refresh();

         return;
      }

      const errorMessage = getFormErrorMessage(updateFormState);

      if (errorMessage) {
         toast.error(errorMessage, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [updateFormState, onDirtyChange, router]);

   const handleContentChange = (newContent: string) => {
      contentRef.current = newContent;

      const dirty =
         normalizeContent(newContent) !== normalizeContent(summary.content);

      if (dirty !== isDirtyRef.current) {
         isDirtyRef.current = dirty;
         onDirtyChange(dirty);
      }

      const input = document.getElementById(
         "summary-content",
      ) as HTMLInputElement | null;

      if (input) {
         input.value = newContent;
      }
   };

   useEffect(() => {
      contentRef.current = summary.content;
      isDirtyRef.current = false;
      onDirtyChange(false);

      const input = document.getElementById(
         "summary-content",
      ) as HTMLInputElement | null;

      if (input) {
         input.value = summary.content;
      }
   }, [summary.content, onDirtyChange]);

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
                        id="summary-content"
                        type="hidden"
                        name="content"
                        defaultValue={summary.content}
                        readOnly
                     />

                     <FormError error={updateFormState.zodErrors?.content} />

                     <EditorWrapper
                        key={summary.documentId}
                        markdown={summary.content}
                        onChange={handleContentChange}
                        className={SUMMARY_UPDATE_FORM_STYLES.editor}
                     />
                  </div>

                  <input
                     type="hidden"
                     name="documentId"
                     value={summary.documentId}
                     readOnly
                  />
               </CardContent>
            </Card>
         </form>
      </div>
   );
}
