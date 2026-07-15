"use client";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { cn, extractYouTubeID } from "@/lib/utils";
import { api } from "@/data/data-api";

import { Input } from "@/components/ui/input";
import { TranscriptResponse } from "@/types/summary";
import { SubmitButton } from "./submit-button";

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

   const errorStyles = error.message
      ? "outline-1 outline outline-red-500 placeholder:text-red-700"
      : "";

   return (
      <div className="w-full flex-1 mx-4">
         <form onSubmit={handleFormSubmit} className="flex gap-2 items-center">
            <Input
               name="videoId"
               placeholder={
                  error.message ? error.message : "Youtube Video ID or URL"
               }
               value={value}
               onChange={(e) => setValue(e.target.value)}
               onMouseDown={clearError}
               className={cn(
                  "w-full focus:text-black focus-visible:ring-pink-500",
                  errorStyles,
               )}
               required
            />

            <SubmitButton
               text="Create Summary"
               loadingText="Creating Summary"
               className="bg-pink-500"
               loading={loading}
            />
         </form>
      </div>
   );
}
