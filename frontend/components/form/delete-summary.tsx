"use client";

import { useActionState, useEffect } from "react";

import { SUMMARY_UPDATE_FORM_STYLES } from "@/constants/styles";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryDeleteFormProps {
   summaryId: string;
   className?: string;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function SummaryDeleteForm({
   summaryId,
   className,
}: Readonly<SummaryDeleteFormProps>) {
   const router = useRouter();

   const [deleteFormState, deleteFormAction, deleteIsPending] = useActionState(
      actions.summarize.deleteSummaryAction,
      INITIAL_STATE,
   );

   useEffect(() => {
      if (!deleteFormState.timestamp) return;

      if (deleteFormState.success) {
         toast.success(deleteFormState.message, {
            position: "top-center",
            duration: 3000,
         });

         router.push("/dashboard/summaries");
         router.refresh();

         return;
      }

      if (deleteFormState.message) {
         toast.error(deleteFormState.message, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [deleteFormState, router]);

   return (
      <form action={deleteFormAction}>
         <input type="hidden" name="documentId" value={summaryId} />

         <SubmitButton
            className={cn(SUMMARY_UPDATE_FORM_STYLES.deleteButton, className)}
            text="Eliminar"
            loadingText="Eliminando"
            loading={deleteIsPending}
            size="default"
            variant="ghost"
            icon={<Trash />}
         ></SubmitButton>
      </form>
   );
}
