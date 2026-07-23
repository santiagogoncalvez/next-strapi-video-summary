"use client";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../ui/card";
import { FormError } from "./form-error";
import { Label } from "../ui/label";
import { SUMMARY_FORM_STYLES } from "@/constants/styles";
import { FormState } from "@/types/definitions";
import { actions } from "@/actions";
import { useRouter } from "next/navigation";

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function SummaryForm({ username }: { username: string }) {
   const router = useRouter();

   const [formState, formAction, isPending] = useActionState(
      actions.summarize.createSummaryAction,
      INITIAL_STATE,
   );

   useEffect(() => {
      let toastId: string | number | undefined;

      if (isPending) {
         toastId = toast.loading("Creating summary...", {
            position: "top-center",
         });
      }

      return () => {
         if (toastId) {
            toast.dismiss(toastId);
         }
      };
   }, [isPending]);

   useEffect(() => {
      if (formState.success) {
         toast.success(formState.message, {
            position: "top-center",
         });

         router.push(
            `/dashboard/summaries/${formState.data?.documentId ?? ""}`,
         );
         return;
      }

      if (formState.message) {
         toast.error(formState.message, {
            position: "top-center",
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
                  <div className={SUMMARY_FORM_STYLES.fieldGroup}>
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
                     />

                     <FormError error={formState.zodErrors?.videoId} />
                  </div>
               </CardContent>

               <CardFooter className={SUMMARY_FORM_STYLES.footer}>
                  <SubmitButton
                     className={SUMMARY_FORM_STYLES.button}
                     text="Crear resumen"
                     loadingText="Creando resumen"
                     loading={isPending}
                  />

                  {formState.success === false && formState.message && (
                     <FormError error={[formState.message]} />
                  )}
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
