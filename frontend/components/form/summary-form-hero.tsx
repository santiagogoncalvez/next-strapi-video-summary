"use client"

import { Input } from "@/components/ui/input";
import { SubmitButtonSummary } from "./submit-button-summary";
import { SUMMARY_FORM_STYLES } from "@/constants/styles";

export function HomeSummaryForm() {
   return (
      <div className="relative w-full max-w-2xl">
         <Input
            id="videoId"
            name="videoId"
            type="text"
            placeholder="https://youtu.be/dQw4w9WgXcQ"
            value={""}
            onChange={() => {}}
            required
            className="h-14 pl-4 pr-14 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
         />

         <SubmitButtonSummary className={SUMMARY_FORM_STYLES.button} />
      </div>
   );
}
