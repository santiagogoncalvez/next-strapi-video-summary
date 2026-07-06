"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";

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
import { useActionState } from "react";
import { FormError } from "./form-error";
import { BUTTON_VARIANTS, SIGN_IN_FORM_STYLES } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { FormState } from "@/types/definitions";
import { SubmitButton } from "./submit-button";
import { AppLink } from "../custom/CustomLink";

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
   data: { identifier: "", password: "" },
};

export function SigninForm() {
   const [formState, formAction, isPending] = useActionState(
      actions.auth.loginUserAction,
      INITIAL_STATE,
   );

   return (
      <div className={SIGN_IN_FORM_STYLES.container}>
         <form className="w-full" action={formAction}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={SIGN_IN_FORM_STYLES.title}>
                     Iniciar sesión
                  </CardTitle>
                  <CardDescription className="text-center">
                     Introduce tus datos para iniciar sesión en tu cuenta.
                  </CardDescription>
               </CardHeader>
               <CardContent className={SIGN_IN_FORM_STYLES.content}>
                  <div className={SIGN_IN_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="identifier">
                        Nombre de usuario o correo electrónico
                     </Label>
                     <Input
                        id="identifier"
                        name="identifier"
                        type="text"
                        placeholder="pablo o pablo@gmail.com"
                        defaultValue={formState.data?.identifier ?? ""}
                     />

                     <FormError error={formState.zodErrors?.identifier} />
                  </div>
                  <div className={SIGN_IN_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="password">Contraseña</Label>
                     <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Ingresar contraseña"
                        defaultValue={formState.data?.password ?? ""}
                     />

                     <FormError error={formState.zodErrors?.password} />

                     <AppLink
                        href="/auth/forgot-password"
                        variant="link"
                        size="none"
                     >
                        ¿Olvidaste tu contraseña?
                     </AppLink>
                  </div>
               </CardContent>
               <CardFooter className={`${SIGN_IN_FORM_STYLES.footer}`}>
                  <SubmitButton
                     className={SIGN_IN_FORM_STYLES.button}
                     text="Iniciar sesión"
                     loadingText="Iniciando sesión"
                     loading={isPending}
                  />

                  {formState.strapiErrors && (
                     <FormError error={[formState.strapiErrors.message]} />
                  )}

                  <div className={SIGN_IN_FORM_STYLES.prompt}>
                     ¿No tienes una cuenta?
                     <AppLink href="/auth/signup" variant="link" size="none">
                        Crear cuenta
                     </AppLink>
                  </div>
               </CardFooter>
            </Card>
         </form>
      </div>
   );
}
