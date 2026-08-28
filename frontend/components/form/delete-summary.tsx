"use client";

import { useActionState, useEffect } from "react";
import { SUMMARY_UPDATE_FORM_STYLES } from "@/constants/styles";
import { actions } from "@/actions";
import { FormState } from "@/types/definitions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFormErrorMessage } from "@/actions/helpers";
import { SubmitButtonDropdown } from "./submit-button-dropwdown";
import { SubmitButton } from "./submit-button";

interface SummaryDeleteFormProps {
   summaryId: string;
   className?: string;
   variant?: "dropdown" | "drawer";
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
   variant = "dropdown",
}: Readonly<SummaryDeleteFormProps>) {
   const router = useRouter();

   const [deleteFormState, deleteFormAction, deleteIsPending] = useActionState(
      actions.summarize.deleteSummaryAction,
      INITIAL_STATE,
   );

   useEffect(() => {
      if (!deleteFormState.timestamp) return;

      if (deleteFormState.success) {
         if (deleteFormState.message) {
            toast.success(deleteFormState.message, {
               position: "top-center",
               duration: 3000,
            });

            router.push("/dashboard/summaries");
            router.refresh();
         }

         return;
      }

      const errorMessage = getFormErrorMessage(deleteFormState);

      if (errorMessage) {
         toast.error(errorMessage, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [deleteFormState, router]);

   return (
      <form action={deleteFormAction}>
         <input type="hidden" name="documentId" value={summaryId} />

         {variant === "dropdown" && (
            <SubmitButtonDropdown
               className={cn(
                  SUMMARY_UPDATE_FORM_STYLES.deleteButton,
                  className,
               )}
               text="Eliminar"
               loadingText="Eliminando"
               loading={deleteIsPending}
               icon={<Trash strokeWidth={1.5} />}
            />
         )}

         {variant === "drawer" && (
            <SubmitButton
               className={cn(
                  SUMMARY_UPDATE_FORM_STYLES.deleteButton,
                  "justify-start",
                  className,
               )}
               text="Eliminar"
               loadingText="Eliminando"
               loading={deleteIsPending}
               icon={<Trash strokeWidth={1.5} />}
               variant="ghost"
               size="default"
            />
         )}
      </form>
   );
}
