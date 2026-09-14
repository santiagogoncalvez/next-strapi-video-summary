"use client";

import { useActionState, useState } from "react";

import { actions } from "@/actions";
import { SUMMARY_FORM_STYLES } from "@/constants/styles";
import { FormState } from "@/types/definitions";
import { SubmitButtonSummary } from "./submit-button-summary";
import {
   InputGroup,
   InputGroupAddon,
   InputGroupInput,
} from "../ui/input-group";
import { LinkIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Field, FieldError } from "../ui/field";
import { parseFieldErrors } from "@/lib/parsers";

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function HomeSummaryForm() {
   const [videoId, setVideoId] = useState("");

   const [formState, formAction, isPending] = useActionState(
      actions.summarize.createHomeSummaryAction,
      INITIAL_STATE,
   );

   return (
      <div className={SUMMARY_FORM_STYLES.container}>
         <form action={formAction} className="w-full">
            <Card>
               <CardContent className={SUMMARY_FORM_STYLES.content}>
                  <fieldset disabled={isPending}>
                     <Field
                        className="w-full"
                        data-invalid={!!formState.zodErrors?.videoId}
                     >
                        <InputGroup className="h-14 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                           <InputGroupInput
                              id="videoId"
                              name="videoId"
                              type="text"
                              placeholder="https://youtu.be/dQw4w9WgXcQ"
                              value={videoId}
                              onChange={(event) =>
                                 setVideoId(event.target.value)
                              }
                              required
                              aria-invalid={!!formState.zodErrors?.videoId}
                              disabled={false}
                              className="h-14"
                           />

                           <InputGroupAddon className="h-14">
                              <LinkIcon
                                 className="text-muted-foreground ml-2 mr-2"
                                 strokeWidth={1.5}
                              />
                           </InputGroupAddon>

                           <InputGroupAddon align="inline-end" className="h-14">
                              <SubmitButtonSummary
                                 className={SUMMARY_FORM_STYLES.button}
                                 disabled={!videoId.trim()}
                                 loading={isPending}
                              />
                           </InputGroupAddon>
                        </InputGroup>
                     </Field>
                  </fieldset>
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
                     Gratis para empezar · Videos de hasta 60 minutos
                  </p>
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
