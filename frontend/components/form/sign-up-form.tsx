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
import { actions } from "@/actions";
import { useActionState } from "react";
import { FormError } from "./form-error";
import { SIGN_UP_FORM_STYLES } from "@/constants/styles";
import { FormState } from "@/types/definitions";
import { SubmitButton } from "./submit-button";
import { AppLink } from "../custom/custom-link";
import { PasswordInput } from "../custom/password-input";

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
   data: { username: "", email: "", password: "", confirmPassword: "" },
};

export function SignupForm() {
   const [formState, formAction, isPending] = useActionState(
      actions.auth.registerUserAction,
      INITIAL_STATE,
   );

   // console.log(formState);

   return (
      <div className={SIGN_UP_FORM_STYLES.container}>
         <form className="w-full" action={formAction}>
            <Card>
               <CardHeader className={SIGN_UP_FORM_STYLES.header}>
                  <CardTitle className={SIGN_UP_FORM_STYLES.title}>
                     Crear cuenta
                  </CardTitle>
                  <CardDescription className="text-center">
                     Introduce tus datos para crear una nueva cuenta.
                  </CardDescription>
               </CardHeader>
               <CardContent className={SIGN_UP_FORM_STYLES.content}>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="username">Nombre de usuario</Label>
                     <Input
                        id="username"
                        name="username"
                        type="text"
                        placeholder="pablo"
                        defaultValue={formState.data?.username ?? ""}
                     />
                     <FormError error={formState.zodErrors?.username} />
                  </div>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
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
                     text="Crear cuenta"
                     loadingText="Creando cuenta"
                     loading={isPending}
                  />
                  {formState.strapiErrors && (
                     <FormError error={[formState.strapiErrors.message]} />
                  )}

                  <div className={SIGN_UP_FORM_STYLES.prompt}>
                     ¿Tienes una cuenta?
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
