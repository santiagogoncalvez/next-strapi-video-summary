"use client";

import { SubmitButtonSummary } from "./submit-button-summary";
import { SUMMARY_FORM_STYLES } from "@/constants/styles";
import {
   InputGroup,
   InputGroupAddon,
   InputGroupInput,
} from "../ui/input-group";
import { LinkIcon } from "lucide-react";

export function HomeSummaryForm() {
   return (
      <div className="relative w-full max-w-2xl">
         <InputGroup className="h-14 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
            <InputGroupInput
               id="videoId"
               name="videoId"
               type="text"
               placeholder="https://youtu.be/dQw4w9WgXcQ"
               value=""
               onChange={() => {}}
               required
               className="h-14"
            />

            <InputGroupAddon className="h-14">
               <LinkIcon
                  className="ml-2 mr-2 text-muted-foreground"
                  strokeWidth={1.5}
               />
            </InputGroupAddon>

            <InputGroupAddon align="inline-end" className="h-14">
               <SubmitButtonSummary className={SUMMARY_FORM_STYLES.button} />
            </InputGroupAddon>
         </InputGroup>
      </div>
   );
}
