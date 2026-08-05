"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

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
import { Textarea } from "@/components/ui/textarea";

import { actions } from "@/actions";
import { cn } from "@/lib/utils";
import { AuthUser } from "@/types/strapi";
import { FormState } from "@/types/definitions";
import { PROFILE_FORM_STYLES, SIGN_IN_FORM_STYLES } from "@/constants/styles";

import { SubmitButton } from "./submit-button";
import { FormError } from "./form-error";

interface ProfileFormProps {
   user?: AuthUser | null;
   className?: string;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function ProfileForm({ user, className }: Readonly<ProfileFormProps>) {
   const [formState, formAction, isPending] = useActionState(
      actions.profile.updateProfileAction,
      INITIAL_STATE,
   );

   useEffect(() => {
      if (formState.success) {
         toast.success(formState.message, {
            position: "top-center",
            duration: 3000,
         });
      }
   }, [formState.success, formState.message, formState.timestamp]);

   if (!user) {
      return (
         <div className={cn(SIGN_IN_FORM_STYLES.container, className)}>
            No se pudieron cargar los datos del perfil.
         </div>
      );
   }

   return (
      <div className={PROFILE_FORM_STYLES.container}>
         <form action={formAction} className={cn("w-full", className)}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={PROFILE_FORM_STYLES.title}>
                     Información del perfil
                  </CardTitle>

                  <CardDescription>
                     Actualiza tu información personal y tu biografía.
                  </CardDescription>
               </CardHeader>

               <CardContent className={PROFILE_FORM_STYLES.content}>
                  <div className={PROFILE_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="username">Nombre de usuario</Label>

                     <Input
                        id="username"
                        name="username"
                        placeholder="pablo"
                        defaultValue={user.username ?? ""}
                        disabled
                     />
                  </div>

                  <div className={PROFILE_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="email">Correo electrónico</Label>

                     <Input
                        id="email"
                        name="email"
                        placeholder="pablo@gmail.com"
                        defaultValue={user.email ?? ""}
                        disabled
                     />
                  </div>

                  <div className={PROFILE_FORM_STYLES.fieldGroup}>
                     <Label>Créditos</Label>

                     <CountBox text={user.credits ?? 0} />
                  </div>

                  <div className={PROFILE_FORM_STYLES.nameRow}>
                     <div className={PROFILE_FORM_STYLES.fieldGroup}>
                        <Label htmlFor="firstName">Nombre</Label>

                        <Input
                           id="firstName"
                           name="firstName"
                           placeholder="Nombre"
                           defaultValue={
                              formState.data?.firstName ?? user.firstName ?? ""
                           }
                        />

                        <FormError error={formState.zodErrors?.firstName} />
                     </div>

                     <div className={PROFILE_FORM_STYLES.fieldGroup}>
                        <Label htmlFor="lastName">Apellido</Label>

                        <Input
                           id="lastName"
                           name="lastName"
                           placeholder="Apellido"
                           defaultValue={
                              formState.data?.lastName ?? user.lastName ?? ""
                           }
                        />

                        <FormError error={formState.zodErrors?.lastName} />
                     </div>
                  </div>

                  <div className={PROFILE_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="bio">Biografía</Label>

                     <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Escribe tu biografía aquí..."
                        className={PROFILE_FORM_STYLES.textarea}
                        defaultValue={formState.data?.bio ?? user.bio ?? ""}
                     />

                     <FormError error={formState.zodErrors?.bio} />
                  </div>
               </CardContent>

               <CardFooter className={PROFILE_FORM_STYLES.footer}>
                  <SubmitButton
                     className={PROFILE_FORM_STYLES.button}
                     text="Guardar perfil"
                     loadingText="Guardando perfil"
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

function CountBox({ text }: { text: number }) {
   return (
      <div className={PROFILE_FORM_STYLES.countBox}>
         Tú tienes
         <span className={PROFILE_FORM_STYLES.creditText}>{text}</span>
         crédito(s)
      </div>
   );
}
