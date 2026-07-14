"use client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { cn, extractYouTubeID } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "./submit-button";

// type TranscriptResponse = {
//    fullTranscript: string;
//    title?: string;
//    videoId?: string;
//    thumbnailUrl?: string;
// };

interface Errors {
   message: string | null;
   name: string;
}

const INITIAL_STATE = {
   message: null,
   name: "",
};

export function SummaryForm() {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<Errors>(INITIAL_STATE);
   const [value, setValue] = useState<string>("");

   async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setLoading(true);

      const formData = new FormData(event.currentTarget);
      const videoId = formData.get("videoId") as string;
      const processedVideoId = extractYouTubeID(videoId);

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
         // Step 1: Get transcript
         currentToastId = toast.loading("Getting transcript...");

         // Step 2: Generate summary
         toast.dismiss(currentToastId);
         currentToastId = toast.loading("Generating summary...");

         // Step 3: Save summary to database
         toast.dismiss(currentToastId);
         currentToastId = toast.loading("Saving summary...");

         toast.success("Summary Created and Saved!");
         setValue("");

         // Redirect to the summary details page
      } catch (error) {
         if (currentToastId) toast.dismiss(currentToastId);
         console.error("Error:", error);
         toast.error(
            error instanceof Error ? error.message : "Failed to create summary",
         );
      } finally {
         setLoading(false);
      }
   }

   function clearError() {
      setError(INITIAL_STATE);
      if (error.message) setValue("");
   }

   const errorStyles = error.message
      ? "outline-1 outline outline-red-500 placeholder:text-red-700"
      : "";

   return (
      <div className="w-full">
         <form onSubmit={handleFormSubmit} className="flex gap-2 items-center">
            <Input
               name="videoId"
               placeholder={
                  error.message
                     ? error.message
                     : "ID o URL del vídeo de YouTube"
               }
               value={value}
               onChange={(e) => setValue(e.target.value)}
               onMouseDown={clearError}
               className={cn("w-full", errorStyles)}
               required
            />

            <SubmitButton
               text="Crear resumen"
               loadingText="Creando resumen"
               loading={loading}
               size="default"
            />
         </form>
      </div>
   );
}
