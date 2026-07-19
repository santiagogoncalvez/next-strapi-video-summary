"use client";
import { SubmitEvent, useState } from "react";
import { toast } from "sonner";
import { extractYouTubeID } from "@/lib/utils";
import { api } from "@/data/data-api";

import { Input } from "@/components/ui/input";
import { TranscriptResponse } from "@/types/summary";
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

interface Errors {
   message: string | null;
   name: string;
}

const INITIAL_STATE = {
   message: null,
   name: "",
};

export function SummaryForm({ username }: { username: string }) {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<Errors>(INITIAL_STATE);
   const [value, setValue] = useState<string>("");

   async function handleFormSubmit(event: SubmitEvent<HTMLFormElement>) {
      event.preventDefault();
      setLoading(true);

      const formData = new FormData(event.currentTarget);
      const videoId = formData.get("videoId") as string;
      const processedVideoId = extractYouTubeID(videoId);

      console.log(processedVideoId);

      if (!processedVideoId) {
         toast.error("Invalid Youtube Video ID");
         setLoading(false);
         setValue("");
         setError({
            ...INITIAL_STATE,
            message: "Invalid Youtube Video ID",
            name: "Invalid Id",
         });
         return;
      }

      let currentToastId: string | number | undefined;

      try {
         currentToastId = toast.loading("Getting transcript...");

         const transcriptResponse = await api.post<
            TranscriptResponse,
            { videoId: string }
         >("/api/transcript", {
            videoId: processedVideoId,
         });

         if (!transcriptResponse.data?.fullTranscript) {
            toast.dismiss(currentToastId);
            toast.error("No transcript data found");
            return;
         }

         console.log("Resume:\n", transcriptResponse.data?.fullTranscript);

         toast.dismiss(currentToastId);
         currentToastId = toast.loading("Generating summary...");

         // ...

         toast.dismiss(currentToastId);
         currentToastId = toast.loading("Saving summary...");

         // ...

         toast.dismiss(currentToastId);
         toast.success("Summary created successfully");

         setValue("");
      } catch (error: any) {
         if (currentToastId) {
            toast.dismiss(currentToastId);
         }

         console.error(error);

         toast.error(
            error?.error?.message ??
               error?.message ??
               "Failed to create summary",
         );
      } finally {
         setLoading(false);
      }
   }

   function clearError() {
      setError(INITIAL_STATE);
      if (error.message) setValue("");
   }

   return (
      <div className={SUMMARY_FORM_STYLES.container}>
         <form onSubmit={handleFormSubmit} className="w-full">
            <Card>
               <CardHeader className={SUMMARY_FORM_STYLES.header}>
                  <CardTitle className={SUMMARY_FORM_STYLES.title}>
                     ¡Hola {username}! ¿Qué video quieres resumir?
                  </CardTitle>

                  <CardDescription className="text-center">
                     Introduce la URL o el identificador de un video de YouTube
                     para generar un resumen con IA.
                  </CardDescription>
               </CardHeader>

               <CardContent className={SUMMARY_FORM_STYLES.content}>
                  <div className={SUMMARY_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="videoId">
                        URL o ID del video de YouTube
                     </Label>

                     <Input
                        id="videoId"
                        name="videoId"
                        type="text"
                        placeholder="https://youtu.be/dQw4w9WgXcQ o dQw4w9WgXcQ"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onMouseDown={clearError}
                        required
                     />
                  </div>
               </CardContent>

               <CardFooter className={SUMMARY_FORM_STYLES.footer}>
                  <SubmitButton
                     className={SUMMARY_FORM_STYLES.button}
                     text="Crear resumen"
                     loadingText="Creando resumen"
                     loading={loading}
                  />

                  {error.message && <FormError error={[error.message ?? ""]} />}
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
