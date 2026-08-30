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
import { actions } from "@/actions";
import { useActionState, useEffect } from "react";
import { FormError } from "./form-error";
import { SIGN_UP_FORM_STYLES } from "@/constants/styles";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { FormState } from "@/types/definitions";
import { SubmitButton } from "./submit-button";
import { PasswordInput } from "../custom/password-input";

export function ChangePassword() {
   const INITIAL_STATE: FormState = {
      success: false,
      message: undefined,
      strapiErrors: null,
      zodErrors: null,
      data: {},
      timestamp: undefined,
   };

   const [formState, formAction, isPending] = useActionState(
      actions.auth.changePasswordAction,
      INITIAL_STATE,
   );

   // 2. Este efecto reacciona ÚNICAMENTE cuando el servidor responde con éxito
   useEffect(() => {
      if (formState.success) {
         toast.success(formState.message, {
            position: "top-center",
            duration: 3000,
         });

         redirect("/dashboard");
      }
   }, [formState.success, formState.message, formState.timestamp]);

   return (
      <div className={SIGN_UP_FORM_STYLES.container}>
         <form className="w-full" action={formAction}>
            <Card>
               <CardHeader className={SIGN_UP_FORM_STYLES.header}>
                  <CardTitle className={SIGN_UP_FORM_STYLES.title}>
                     Cambiar la contraseña
                  </CardTitle>
                  <CardDescription className="text-center">
                     Introduce tu nueva contraseña a continuación para
                     actualizar tus credenciales.
                  </CardDescription>
               </CardHeader>
               <CardContent className={SIGN_UP_FORM_STYLES.content}>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="password">Constraseña</Label>
                     <PasswordInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Ingresar contraseña"
                        defaultValue={formState.data?.password ?? ""}
                     />
                     <FormError error={formState.zodErrors?.password} />
                  </div>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="newPassword">Nueva constraseña</Label>
                     <PasswordInput
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Ingresar nueva contraseña"
                        defaultValue={formState.data?.newPassword ?? ""}
                     />
                     <FormError error={formState.zodErrors?.newPassword} />
                  </div>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="confirmPassword">
                        Confirmar contraseña
                     </Label>
                     <PasswordInput
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
                     text="Cambiar la contraseña"
                     loadingText="Cambiando la contraseña"
                     loading={isPending}
                  />

                  {formState.strapiErrors && (
                     <FormError error={[formState.strapiErrors.message]} />
                  )}
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
