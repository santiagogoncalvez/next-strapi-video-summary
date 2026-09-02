"use client";

import {
   CardTitle,
   CardDescription,
   CardHeader,
   CardContent,
   CardFooter,
   Card,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { actions } from "@/actions";
import { useActionState } from "react";
import { SIGN_IN_FORM_STYLES } from "@/constants/styles";
import { FormState } from "@/types/definitions";
import { SubmitButton } from "./submit-button";
import { AppLink } from "../custom/custom-link";
import { PasswordInput } from "../custom/password-input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { parseFieldErrors } from "@/lib/parsers";
import { AuthProviders } from "../custom/auth-providers";

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
                  {/* <CardDescription className="text-center">
                     Introduce tus datos para iniciar sesión en tu cuenta.
                  </CardDescription> */}
               </CardHeader>
               <CardContent className={SIGN_IN_FORM_STYLES.content}>
                  <AuthProviders />

                  <Field
                     className={SIGN_IN_FORM_STYLES.fieldGroup}
                     data-invalid={!!formState.zodErrors?.identifier}
                  >
                     <FieldLabel htmlFor="identifier">
                        Nombre de usuario o correo electrónico
                     </FieldLabel>

                     <Input
                        id="identifier"
                        name="identifier"
                        type="text"
                        placeholder="pablo o pablo@gmail.com"
                        defaultValue={formState.data?.identifier ?? ""}
                        aria-invalid={!!formState.zodErrors?.identifier}
                     />

                     <FieldError
                        errors={parseFieldErrors(
                           formState.zodErrors?.identifier,
                        )}
                     />
                  </Field>

                  <Field
                     className={SIGN_IN_FORM_STYLES.fieldGroup}
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

                     <AppLink
                        href="/auth/forgot-password"
                        variant="link"
                        size="none"
                        className="w-fit!"
                     >
                        ¿Olvidaste tu contraseña?
                     </AppLink>
                  </Field>
               </CardContent>
               <CardFooter className={`${SIGN_IN_FORM_STYLES.footer}`}>
                  <SubmitButton
                     className={SIGN_IN_FORM_STYLES.button}
                     text="Iniciar sesión"
                     loadingText="Iniciando sesión"
                     loading={isPending}
                  />

                  {formState.strapiErrors && (
                     <FieldError
                        errors={parseFieldErrors(
                           formState.strapiErrors.message,
                        )}
                     />
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
