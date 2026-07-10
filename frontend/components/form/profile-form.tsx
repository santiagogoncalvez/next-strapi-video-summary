"use client";
import { cn } from "@/lib/utils";
import { AuthUser } from "@/types/strapi";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SubmitButton } from "./submit-button";
import { FormState } from "@/types/definitions";
import { useActionState, useEffect } from "react";
import { actions } from "@/actions";
import { Label } from "../ui/label";
import { FormError } from "./form-error";
import { PROFILE_FORM_STYLES } from "@/constants/styles";
import { toast } from "sonner";

interface ProfileFormProps {
   user?: AuthUser | null;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function ProfileForm({
   user,
   className,
}: ProfileFormProps & {
   readonly className?: string;
}) {
   const [formState, formAction, isPending] = useActionState(
      actions.profile.updateProfileAction,
      INITIAL_STATE,
   );

   useEffect(() => {
      if (formState.success) {
         toast.success(formState.message, { position: "top-center" });
      }
   }, [formState.success, formState.message, formState.timestamp]);

   if (!user) {
      return (
         <div className={cn(PROFILE_FORM_STYLES.form, className)}>
            <p>No se pudieron cargar los datos del perfil.</p>
         </div>
      );
   }

   return (
      <form
         className={cn(PROFILE_FORM_STYLES.form, className)}
         action={formAction}
      >
         <div className={PROFILE_FORM_STYLES.container}>
            <div className={PROFILE_FORM_STYLES.topRow}>
               <div className={PROFILE_FORM_STYLES.fieldGroup}>
                  <Label>Nombre de usuario</Label>
                  <Input
                     id="username"
                     name="username"
                     placeholder="pablo"
                     defaultValue={user.username || ""}
                     disabled
                  />
               </div>
               <div className={PROFILE_FORM_STYLES.fieldGroup}>
                  <Label>Correo electrónico</Label>
                  <Input
                     id="email"
                     name="email"
                     placeholder="pablo@gmail.com"
                     defaultValue={user.email || ""}
                     disabled
                  />
               </div>
               <div className={PROFILE_FORM_STYLES.fieldGroup}>
                  <Label>Créditos</Label>
                  <CountBox text={user.credits || 0} />
               </div>
            </div>

            <div className={PROFILE_FORM_STYLES.nameRow}>
               <div className={PROFILE_FORM_STYLES.fieldGroup}>
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                     id="firstName"
                     name="firstName"
                     placeholder="Nombre"
                     defaultValue={
                        formState?.data?.firstName || user.firstName || ""
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
                        formState?.data?.lastName || user.lastName || ""
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
                  defaultValue={formState?.data?.bio || user.bio || ""}
               />
               <FormError error={formState.zodErrors?.bio} />
            </div>
         </div>
         <div className={PROFILE_FORM_STYLES.buttonContainer}>
            <SubmitButton
               className={PROFILE_FORM_STYLES.button}
               text="Guardar perfil"
               loadingText="Guardando perfil"
               loading={isPending}
            />

            {formState.strapiErrors && (
               <FormError error={[formState.strapiErrors.message]} />
            )}
         </div>
      </form>
   );
}

function CountBox({ text }: { text: number }) {
   const color = "text-primary";
   return (
      <div className={PROFILE_FORM_STYLES.countBox}>
         Tú tienes
         <span className={cn(PROFILE_FORM_STYLES.creditText, color)}>
            {text}
         </span>
         crédito(s)
      </div>
   );
}
