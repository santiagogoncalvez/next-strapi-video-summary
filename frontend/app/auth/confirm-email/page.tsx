"use client";

import { actions } from "@/actions";
import { FormError } from "@/components/form-error";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
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
import { BUTTON_VARIANTS, SIGN_IN_FORM_STYLES } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { FormState } from "@/validations/auth";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function ConfirmEmail() {
   // useActionState to manage the state of the action
   const searchParams = useSearchParams();
   const userEmail = searchParams.get("email") || "";
   // create initial state
   const INITIAL_STATE: FormState = {
      success: false,
      message: undefined,
      strapiErrors: null,
      zodErrors: null,
      data: { email: userEmail },
   };

   const [formState, formAction, isPending] = useActionState(
      actions.auth.resendConfirmEmailAction,
      INITIAL_STATE,
   );

   useEffect(() => {
      if (formState.success) {
         toast.success(formState.message, { position: "top-center" });
      }
   }, [formState.success, formState.message]);

   return (
      <div className={SIGN_IN_FORM_STYLES.container}>
         <Logo />
         <form className="w-full" action={formAction}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={SIGN_IN_FORM_STYLES.title}>
                     Confirma tu correo electrónico
                  </CardTitle>

                  <CardDescription className="text-center">
                     <p>
                        Te hemos enviado un enlace de confirmación a tu correo
                        electrónico. Por favor, revisa tu bandeja de entrada y
                        haz clic en el enlace para verificar tu cuenta antes de
                        registrarte.
                     </p>
                  </CardDescription>
               </CardHeader>
               <CardContent className={SIGN_IN_FORM_STYLES.content}>
                  <div className={SIGN_IN_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="email">
                        ¿No recibiste el correo electrónico? Revisa tu carpeta
                        de correo no deseado o intenta reenviarlo abajo.
                     </Label>
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

               <CardFooter
                  className={`${SIGN_IN_FORM_STYLES.footer} ${SIGN_IN_FORM_STYLES.fieldGroup}`}
               >
                  <Button
                     className={cn(
                        BUTTON_VARIANTS({
                           variant: "default",
                           size: "lg",
                           className: SIGN_IN_FORM_STYLES.button,
                        }),
                     )}
                     disabled={isPending}
                     size="lg"
                  >
                     {isPending && <Loader2 className="animate-spin" />}
                     {!isPending &&
                        "Reenviar correo electrónico de confirmación"}
                  </Button>
                  {!formState.success && formState.message && (
                     <FormError error={[formState.message]} />
                  )}
                  {formState.strapiErrors && (
                     <FormError error={[formState.strapiErrors.message]} />
                  )}
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
