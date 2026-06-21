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
import { FormState } from "@/validations/auth";
import { actions } from "@/actions";
import { useActionState } from "react";
import { FormError } from "./form-error";

const styles = {
   container: "w-full max-w-md",
   header: "space-y-1",
   title: "text-3xl font-bold text-center",
   content: "space-y-4",
   fieldGroup: "space-y-2",
   footer: "flex flex-col",
   button: "w-full",
   prompt: "mt-4 text-center text-sm",
   link: "ml-2",
};

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
      <div className={styles.container}>
         <form action={formAction}>
            <Card>
               <CardHeader className={styles.header}>
                  <CardTitle className={styles.title}>Iniciar sesión</CardTitle>
                  <CardDescription className="text-center">
                     Introduce tus datos para iniciar sesión en tu cuenta.
                  </CardDescription>
               </CardHeader>
               <CardContent className={styles.content}>
                  <div className={styles.fieldGroup}>
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
                  <div className={styles.fieldGroup}>
                     <Label htmlFor="password">Contraseña</Label>
                     <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Ingresar contraseña"
                        defaultValue={formState.data?.password ?? ""}
                     />

                     <FormError error={formState.zodErrors?.password} />
                  </div>
               </CardContent>
               <CardFooter className={styles.footer}>
                  <Button className={styles.button} disabled={isPending}>
                     {isPending && <Loader2 className="animate-spin" />}
                     {!isPending && "Iniciar sesión"}
                  </Button>
                  {formState.strapiErrors && (
                     <FormError error={[formState.strapiErrors.message]} />
                  )}
               </CardFooter>
            </Card>
            <div className={styles.prompt}>
               ¿No tienes una cuenta?
               <Link className={styles.link} href="/auth/signup">
                  Crear cuenta
               </Link>
            </div>
         </form>
      </div>
   );
}
