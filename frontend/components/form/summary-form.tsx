"use client";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../ui/card";
import { FormError } from "./form-error";
import { SUMMARY_FORM_STYLES } from "@/constants/styles";
import { FormState } from "@/types/definitions";
import { actions } from "@/actions";
import { useRouter } from "next/navigation";
import { SUMMARY_MESSAGES } from "@/constants/messages/summary";
import { SubmitButtonSummary } from "./submit-button-summary";

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function SummaryForm() {
   const router = useRouter();

   const [formState, formAction, isPending] = useActionState(
      actions.summarize.createSummaryAction,
      INITIAL_STATE,
   );

   const lastTimestamp = useRef<number | null>(null);

   useEffect(() => {
      let toastId: string | number | undefined;

      if (isPending) {
         toastId = toast.loading(SUMMARY_MESSAGES.loading.CREATING, {
            position: "top-center",
            duration: 3000,
         });
      }

      return () => {
         if (toastId) {
            toast.dismiss(toastId);
         }
      };
   }, [isPending]);

   useEffect(() => {
      if (!formState.timestamp) return;

      if (formState.timestamp === lastTimestamp.current) return;

      lastTimestamp.current = formState.timestamp;

      if (formState.success) {
         toast.success(formState.message, {
            position: "top-center",
            duration: 3000,
         });

         router.push(
            `/dashboard/summaries/${formState.data?.documentId ?? ""}`,
         );

         return;
      }

      if (formState.message) {
         toast.error(formState.message, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [formState, router]);

   return (
      <div className={SUMMARY_FORM_STYLES.container}>
         <form action={formAction} className="w-full">
            <Card>
               <CardHeader className={SUMMARY_FORM_STYLES.header}>
                  <CardTitle className={SUMMARY_FORM_STYLES.title}>
                     {/* ¡Hola {username}! */}
                     ¿Qué video quieres resumir?
                  </CardTitle>

                  {/* <CardDescription className="text-center">
                     Introduce la URL o el identificador de un video de YouTube
                     para generar un resumen con IA.
                  </CardDescription> */}
               </CardHeader>

               <CardContent className={SUMMARY_FORM_STYLES.content}>
                  <div className={"relative"}>
                     {/* <Label htmlFor="videoId">
                        URL o ID del video de YouTube
                     </Label> */}

                     <Input
                        id="videoId"
                        name="videoId"
                        type="text"
                        placeholder="https://youtu.be/dQw4w9WgXcQ o dQw4w9WgXcQ"
                        defaultValue={formState.data?.videoId ?? ""}
                        required
                        className="h-14 pl-4 pr-14"
                     />

                     <SubmitButtonSummary
                        className={SUMMARY_FORM_STYLES.button}
                        loading={isPending}
                     />
                  </div>
               </CardContent>

               <CardFooter className={SUMMARY_FORM_STYLES.footer}>
                  <FormError error={formState.zodErrors?.videoId} />

                  {!formState.zodErrors &&
                     formState.success === false &&
                     formState.message && (
                        <FormError error={[formState.message]} />
                     )}
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
