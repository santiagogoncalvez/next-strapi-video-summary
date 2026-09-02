"use client";

import {
   CardTitle,
   CardDescription,
   CardHeader,
   CardContent,
   CardFooter,
   Card,
} from "@/components/ui/card";

import { actions } from "@/actions";
import { useActionState, useEffect } from "react";
import { SIGN_UP_FORM_STYLES } from "@/constants/styles";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { FormState } from "@/types/definitions";
import { SubmitButton } from "./submit-button";
import { PasswordInput } from "../custom/password-input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { parseFieldErrors } from "@/lib/parsers";

export function ResetPassword({ code }: { code: string }) {
   const INITIAL_STATE: FormState = {
      success: false,
      message: undefined,
      strapiErrors: null,
      zodErrors: null,
      data: { code },
      timestamp: undefined,
   };

   const [formState, formAction, isPending] = useActionState(
      actions.auth.resetPasswordAction,
      INITIAL_STATE,
   );

   // 2. Este efecto reacciona ÚNICAMENTE cuando el servidor responde con éxito
   useEffect(() => {
      if (formState.success) {
         toast.success(formState.message, {
            position: "top-center",
            duration: 3000,
         });

         redirect("/auth/login");
      }
   }, [formState.success, formState.message, formState.timestamp]);

   return (
      <div className={SIGN_UP_FORM_STYLES.container}>
         <form className="w-full" action={formAction}>
            <Card>
               <CardHeader className={SIGN_UP_FORM_STYLES.header}>
                  <CardTitle className={SIGN_UP_FORM_STYLES.title}>
                     Restablecer su contraseña
                  </CardTitle>
                  <CardDescription className="text-center">
                     Introduce tu nueva contraseña a continuación para
                     actualizar tus credenciales.
                  </CardDescription>
               </CardHeader>
               <CardContent className={SIGN_UP_FORM_STYLES.content}>
                  <Field
                     className={SIGN_UP_FORM_STYLES.fieldGroup}
                     data-invalid={!!formState.zodErrors?.password}
                  >
                     <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                     <PasswordInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Ingresar contraseña"
                        defaultValue={formState.data?.password ?? ""}
                        aria-invalid={!!formState.zodErrors?.password}
                     />

                     <FieldError
                        errors={parseFieldErrors(formState.zodErrors?.password)}
                     />
                  </Field>

                  <Field
                     className={SIGN_UP_FORM_STYLES.fieldGroup}
                     data-invalid={!!formState.zodErrors?.confirmPassword}
                  >
                     <FieldLabel htmlFor="confirmPassword">
                        Confirmar contraseña
                     </FieldLabel>
                     <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmar contraseña"
                        defaultValue={formState.data?.confirmPassword ?? ""}
                        aria-invalid={!!formState.zodErrors?.confirmPassword}
                     />
                     <FieldError
                        errors={parseFieldErrors(
                           formState.zodErrors?.confirmPassword,
                        )}
                     />
                  </Field>
               </CardContent>
               <CardFooter className={`${SIGN_UP_FORM_STYLES.footer}`}>
                  <SubmitButton
                     className={SIGN_UP_FORM_STYLES.button}
                     text="Restablecer contraseña"
                     loadingText="Restableciendo contraseña"
                     loading={isPending}
                  />
                  {formState.strapiErrors && (
                     <FieldError
                        errors={parseFieldErrors(
                           formState.strapiErrors.message,
                        )}
                     />
                  )}
               </CardFooter>
            </Card>

            <input type="hidden" name="code" value={code} />
            <input type="hidden" name="passwordType" value="reset" />
         </form>
      </div>
   );
}
