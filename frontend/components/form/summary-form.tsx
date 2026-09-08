"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "../ui/card";
import { SUMMARY_FORM_STYLES } from "@/constants/styles";
import { FormState } from "@/types/definitions";
import { actions } from "@/actions";
import { useRouter } from "next/navigation";
import { SUMMARY_MESSAGES } from "@/constants/messages/summary";
import { SubmitButtonSummary } from "./submit-button-summary";
import { Field, FieldError } from "../ui/field";
import { getFormErrorMessage } from "@/actions/helpers";
import { parseFieldErrors } from "@/lib/parsers";

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

   const [videoId, setVideoId] = useState(formState.data?.videoId ?? "");

   const lastTimestamp = useRef<number | null>(null);

   useEffect(() => {
      if (!isPending) return;

      const loadingMessages = [
         SUMMARY_MESSAGES.loading.CREATING,
         "Analizando el video...",
         "Procesando el contenido...",
         "Generando el resumen...",
         "Preparando el resultado...",
      ];

      let currentMessage = 0;

      const toastId = toast.loading(loadingMessages[currentMessage], {
         position: "top-center",
      });

      const interval = setInterval(() => {
         currentMessage = (currentMessage + 1) % loadingMessages.length;

         toast.loading(
            <div
               key={loadingMessages[currentMessage]}
               className="animate-in fade-in slide-in-from-bottom-1 duration-300"
            >
               {loadingMessages[currentMessage]}
            </div>,
            {
               id: toastId,
               position: "top-center",
            },
         );
      }, 3000);

      return () => {
         clearInterval(interval);
         toast.dismiss(toastId);
      };
   }, [isPending]);
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

         router.push(
            `/dashboard/summaries/${formState.data?.documentId ?? ""}`,
         );

         return;
      }

      if (formState.zodErrors) return;

      const errorMessage = getFormErrorMessage(formState);

      if (errorMessage) {
         toast.error(errorMessage, {
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
                  <Field
                     className="w-full"
                     data-invalid={!!formState.zodErrors?.videoId}
                  >
                     <div className="relative w-full">
                        <Input
                           id="videoId"
                           name="videoId"
                           type="text"
                           placeholder="https://youtu.be/dQw4w9WgXcQ"
                           value={videoId}
                           onChange={(event) => setVideoId(event.target.value)}
                           required
                           className="h-14 pl-4 pr-14 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                           aria-invalid={!!formState.zodErrors?.videoId}
                        />

                        <SubmitButtonSummary
                           className={SUMMARY_FORM_STYLES.button}
                           disabled={!videoId.trim()}
                           loading={isPending}
                        />
                     </div>
                  </Field>
               </CardContent>

               <CardFooter className={SUMMARY_FORM_STYLES.footer}>
                  <FieldError
                     className="text-center"
                     errors={parseFieldErrors(formState.zodErrors?.videoId)}
                  />

                  {!formState.zodErrors &&
                     formState.success === false &&
                     formState.message && (
                        <FieldError
                           className="text-center"
                           errors={parseFieldErrors(formState.message)}
                        />
                     )}

                  <p className="text-muted-foreground text-center font-light text-sm">
                     Videos de hasta 60 minutos
                  </p>
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
