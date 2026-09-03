"use client";

import {
   CardTitle,
   // CardDescription,
   CardHeader,
   CardContent,
   CardFooter,
   Card,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { actions } from "@/actions";
import { useActionState, useEffect, useRef } from "react";
import { SIGN_UP_FORM_STYLES } from "@/constants/styles";
import { FormState } from "@/types/definitions";
import { SubmitButton } from "./submit-button";
import { AppLink } from "../custom/custom-link";
import { PasswordInput } from "../custom/password-input";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { parseFieldErrors, parseOAuthError } from "@/lib/parsers";
import { AuthProviders } from "../custom/auth-providers";
import { usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";

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

   const pathname = usePathname();
      const searchParams = useSearchParams();
      const oauthErrorShown = useRef(false);
   
      useEffect(() => {
         const message = parseOAuthError(searchParams, "signup");
   
         if (!message || oauthErrorShown.current) return;
   
         oauthErrorShown.current = true;
   
         toast.error(message, {
            position: "top-center",
            duration: 5000,
         });
   
         window.history.replaceState(null, "", pathname);
      }, [searchParams, pathname]);

   return (
      <div className={SIGN_UP_FORM_STYLES.container}>
         <form className="w-full" action={formAction}>
            <Card>
               <CardHeader className={SIGN_UP_FORM_STYLES.header}>
                  <CardTitle className={SIGN_UP_FORM_STYLES.title}>
                     Crear cuenta
                  </CardTitle>
                  {/* <CardDescription className="text-center">
                     Introduce tus datos para crear una nueva cuenta.
                  </CardDescription> */}
               </CardHeader>
               <CardContent className={SIGN_UP_FORM_STYLES.content}>
                  <AuthProviders variant="signup" />
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
                     <Field
                        className={SIGN_UP_FORM_STYLES.fieldGroup}
                        data-invalid={!!formState.zodErrors?.username}
                     >
                        <FieldLabel htmlFor="username">
                           Nombre de usuario
                        </FieldLabel>

                        <Input
                           id="username"
                           name="username"
                           type="text"
                           placeholder="pablo"
                           defaultValue={formState.data?.username ?? ""}
                           aria-invalid={!!formState.zodErrors?.username}
                        />

                        <FieldError
                           errors={parseFieldErrors(
                              formState.zodErrors?.username,
                           )}
                        />
                     </Field>
                  </div>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
                     <Field
                        className={SIGN_UP_FORM_STYLES.fieldGroup}
                        data-invalid={!!formState.zodErrors?.email}
                     >
                        <FieldLabel htmlFor="email">
                           Correo electrónico
                        </FieldLabel>

                        <Input
                           id="email"
                           name="email"
                           type="email"
                           placeholder="pablo@gmail.com"
                           defaultValue={formState.data?.email ?? ""}
                           aria-invalid={!!formState.zodErrors?.email}
                        />

                        <FieldError
                           errors={parseFieldErrors(formState.zodErrors?.email)}
                        />
                     </Field>
                  </div>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
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
                           errors={parseFieldErrors(
                              formState.zodErrors?.password,
                           )}
                        />
                     </Field>
                  </div>
                  <div className={SIGN_UP_FORM_STYLES.fieldGroup}>
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
                     <FieldError
                        errors={parseFieldErrors(
                           formState.strapiErrors.message,
                        )}
                     />
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
