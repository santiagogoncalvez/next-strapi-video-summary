"use client";

import { useActionState, useEffect, useState } from "react";

import { EditorWrapper } from "@/components/custom/editor/editor-wrapper";

import {
   Card,
   CardContent,
   CardFooter,
} from "@/components/ui/card";

import { FormError } from "@/components/form/form-error";

import { Summary } from "@/types/strapi";
import { SUMMARY_UPDATE_FORM_STYLES } from "@/constants/styles";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { SummaryDeleteForm } from "./delete-summary";

interface SummaryUpdateFormProps {
   summary: Summary;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function SummaryUpdateForm({
   summary,
}: Readonly<SummaryUpdateFormProps>) {
   const [updateFormState, updateFormAction] = useActionState(
      actions.summarize.updateSummaryAction,
      INITIAL_STATE,
   );
   const [content, setContent] = useState(
      updateFormState.data?.content ?? summary.content,
   );

   useEffect(() => {
      if (updateFormState.success) {
         toast.success(updateFormState.message, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [
      updateFormState.success,
      updateFormState.message,
      updateFormState.timestamp,
   ]);

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

                     <EditorWrapper
                        key={summary.documentId}
                        markdown={
                           updateFormState.data?.content ?? summary.content
                        }
                        onChange={setContent}
                        className={SUMMARY_UPDATE_FORM_STYLES.editor}
                     />

                     <FormError error={updateFormState.zodErrors?.content} />
                  </div>

                  <input
                     type="hidden"
                     name="documentId"
                     value={summary.documentId}
                  />
               </CardContent>

               <CardFooter className={SUMMARY_UPDATE_FORM_STYLES.footer}>
                  {updateFormState.strapiErrors && (
                     <FormError
                        error={[updateFormState.strapiErrors.message]}
                     />
                  )}
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
