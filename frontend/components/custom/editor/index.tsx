"use client";

import { useActionState, useEffect, useState } from "react";

import { EditorWrapper } from "@/components/custom/editor/editor-wrapper";
import { DeleteButton } from "@/components/custom/delete-button";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { SubmitButton } from "@/components/form/submit-button";
import { FormError } from "@/components/form/form-error";

import { Summary } from "@/types/strapi";
import { SUMMARY_UPDATE_FORM_STYLES } from "@/constants/styles";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";

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
   const [updateFormState, updateFormAction, updateIsPending] = useActionState(
      actions.summarize.updateSummaryAction,
      INITIAL_STATE,
   );
   const [deleteFormState, deleteFormAction, deleteIsPending] = useActionState(
      actions.summarize.deleteSummaryAction,
      INITIAL_STATE,
   );
   const [content, setContent] = useState(
      updateFormState.data?.content ?? summary.content,
   );

   useEffect(() => {
      if (updateFormState.success) {
         toast.success(updateFormState.message, {
            position: "top-center",
         });
      }
   }, [
      updateFormState.success,
      updateFormState.message,
      updateFormState.timestamp,
   ]);

   useEffect(() => {
      if (deleteFormState.success) {
         toast.success(deleteFormState.message, {
            position: "top-center",
         });
      }
   }, [
      deleteFormState.success,
      deleteFormState.message,
      deleteFormState.timestamp,
   ]);

   return (
      <div className={SUMMARY_UPDATE_FORM_STYLES.container}>
         <form action={updateFormAction} className="w-full">
            <Card>
               <CardHeader className={SUMMARY_UPDATE_FORM_STYLES.header}>
                  <CardTitle className={SUMMARY_UPDATE_FORM_STYLES.title}>
                     Editar resumen
                  </CardTitle>

                  <CardDescription>
                     Modifica el título o el contenido de tu resumen antes de
                     guardarlo.
                  </CardDescription>
               </CardHeader>

               <CardContent className={SUMMARY_UPDATE_FORM_STYLES.content}>
                  <div className={SUMMARY_UPDATE_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="title">Título</Label>

                     <Input
                        id="title"
                        name="title"
                        defaultValue={
                           updateFormState.data?.title ?? summary.title
                        }
                        placeholder="Título del resumen"
                     />

                     <FormError error={updateFormState.zodErrors?.title} />
                  </div>

                  <div className={SUMMARY_UPDATE_FORM_STYLES.fieldGroup}>
                     <Label>Contenido</Label>

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
                  <SubmitButton
                     className={SUMMARY_UPDATE_FORM_STYLES.submitButton}
                     text="Guardar cambios"
                     loadingText="Guardando cambios"
                     loading={updateIsPending}
                  />

                  {!updateFormState.success && updateFormState.message && (
                     <FormError error={[updateFormState.message]} />
                  )}
               </CardFooter>
            </Card>
         </form>

         <form action={deleteFormAction} className="min-w-full">
            <input type="hidden" name="documentId" value={summary.documentId} />

            <DeleteButton
               className={SUMMARY_UPDATE_FORM_STYLES.deleteButton}
               loading={deleteIsPending}
            />

            {!deleteFormState.success && deleteFormState.message && (
               <FormError error={[deleteFormState.message]} />
            )}
         </form>
      </div>
   );
}
