"use client";

import { actions } from "@/actions";
import { FormError } from "@/components/form/form-error";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SIGN_IN_FORM_STYLES, SIGN_UP_FORM_STYLES } from "@/constants/styles";
import { useCountdown } from "@/hooks/use-countdown";
import { FormState } from "@/types/definitions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { SubmitButton } from "./submit-button";
import { AppLink } from "../custom/custom-link";

const COOLDOWN_TIME = 30;

export default function ForgotPassword() {
   const [count, { startCountdown, resetCountdown, isRunning }] = useCountdown({
      countStart: COOLDOWN_TIME,
   });

   useEffect(() => {
      if (count === 0) resetCountdown();
   }, [count, resetCountdown]);

   // useActionState to manage the state of the action
   // create initial state
   const INITIAL_STATE: FormState = {
      success: false,
      message: undefined,
      strapiErrors: null,
      zodErrors: null,
      data: { email: "" },
      timestamp: undefined,
   };

   const [formState, formAction, isPending] = useActionState(
      actions.auth.forgotPasswordAction,
      INITIAL_STATE,
   );

   // 2. Este efecto reacciona ÚNICAMENTE cuando el servidor responde con éxito
   useEffect(() => {
      if (formState.success) {
         toast.success(formState.message, { position: "top-center", duration: 3000 });
         startCountdown();
      }
   }, [
      formState.success,
      formState.message,
      startCountdown,
      formState.timestamp,
   ]);

   return (
      <div className={SIGN_IN_FORM_STYLES.container}>
         <form className="w-full" action={formAction}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={SIGN_IN_FORM_STYLES.title}>
                     Has olvidado tu contraseña
                  </CardTitle>

                  <CardDescription className="text-center">
                     <p>
                        Introduce tu correo electrónico y te enviaremos un
                        enlace para restablecer tu contraseña.
                     </p>
                  </CardDescription>
               </CardHeader>
               <CardContent className={SIGN_IN_FORM_STYLES.content}>
                  <div className={SIGN_IN_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="email">Correo electrónico</Label>
                     <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="pablo@gmail.com"
                        defaultValue={formState.data?.email ?? ""}
                     />
                     <FormError error={formState.zodErrors?.email} />
                  </div>
               </CardContent>

               <CardFooter className={`${SIGN_IN_FORM_STYLES.footer}`}>
                  <SubmitButton
                     className={SIGN_IN_FORM_STYLES.button}
                     text={
                        isRunning
                           ? `Reintentar en ${count}s`
                           : "Enviar enlace de restablecimiento"
                     }
                     loadingText="Enviando enlace de restablecimiento"
                     loading={isPending}
                     disabled={isRunning}
                  />
                  {!formState.success && formState.message && (
                     <FormError error={[formState.message]} />
                  )}
                  {formState.strapiErrors && (
                     <FormError error={[formState.strapiErrors.message]} />
                  )}

                  <div className={SIGN_UP_FORM_STYLES.prompt}>
                     ¿Recuerdas tu contraseña?
                     <AppLink href="/auth/login" variant="link" size="none">
                        Iniciar sesión
                     </AppLink>
                  </div>
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
