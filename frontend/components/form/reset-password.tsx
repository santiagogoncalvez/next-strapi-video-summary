"use client";

import {
   CardTitle,
   CardDescription,
   CardHeader,
   CardContent,
   CardFooter,
   Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { actions } from "@/actions";
import { useActionState, useEffect } from "react";
import { FormError } from "./form-error";
import { BUTTON_VARIANTS, SIGN_UP_FORM_STYLES } from "@/constants/styles";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { FormState } from "@/types/definitions";
import { SubmitButton } from "./submit-button";

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
         toast.success(formState.message, { position: "top-center" });

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
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="password">Constraseña</Label>
                     <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Ingresar contraseña"
                        defaultValue={formState.data?.password ?? ""}
                     />
                     <FormError error={formState.zodErrors?.password} />
                  </div>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="confirmPassword">
                        Confirmar contraseña
                     </Label>
                     <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmar contraseña"
                        defaultValue={formState.data?.confirmPassword ?? ""}
                     />
                     <FormError error={formState.zodErrors?.confirmPassword} />
                  </div>
               </CardContent>
               <CardFooter className={`${SIGN_UP_FORM_STYLES.footer}`}>
                  <SubmitButton
                     className={SIGN_UP_FORM_STYLES.button}
                     text="Restablecer contraseña"
                     loadingText="Restableciendo contraseña"
                     loading={isPending}
                  />
                  {formState.strapiErrors && (
                     <FormError error={[formState.strapiErrors.message]} />
                  )}
               </CardFooter>
            </Card>

            <input type="hidden" name="code" value={code} />
            <input type="hidden" name="passwordType" value="reset" />
         </form>
      </div>
   );
}
