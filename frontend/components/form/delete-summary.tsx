"use client";

import { useActionState, useEffect } from "react";

import { DeleteButton } from "@/components/custom/delete-button";

import { FormError } from "@/components/form/form-error";

import { SUMMARY_UPDATE_FORM_STYLES } from "@/constants/styles";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SummaryDeleteFormProps {
   summaryId: string;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function SummaryDeleteForm({
   summaryId,
}: Readonly<SummaryDeleteFormProps>) {
   const router = useRouter();

   const [deleteFormState, deleteFormAction, deleteIsPending] = useActionState(
      actions.summarize.deleteSummaryAction,
      INITIAL_STATE,
   );

   useEffect(() => {
      if (deleteFormState.success) {
         toast.success(deleteFormState.message, {
            position: "top-center",
            duration: 3000,
         });

         router.push("/dashboard/summaries");
      }
   }, [
      deleteFormState.success,
      deleteFormState.message,
      deleteFormState.timestamp,
      router,
   ]);

   return (
      <div className={SUMMARY_UPDATE_FORM_STYLES.container}>
         <form action={deleteFormAction} className="min-w-full">
            <input type="hidden" name="documentId" value={summaryId} />

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
