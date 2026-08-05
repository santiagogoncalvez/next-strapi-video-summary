"use client";

import { useActionState, useEffect } from "react";

import { actions } from "@/actions";
import { cn } from "@/lib/utils";

import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

import { SubmitButton } from "@/components/form/submit-button";
import { FormError } from "@/components/form/form-error";
import ImagePicker from "@/components/custom/image-picker";

import { FormState } from "@/types/definitions";
import { Image } from "@/types/strapi";
import {
   IMAGE_FORM_STYLES,
   PROFILE_FORM_STYLES,
   SIGN_IN_FORM_STYLES,
} from "@/constants/styles";
import { toast } from "sonner";

interface ProfileImageFormProps {
   image?: Image | null;
   className?: string;
}

const INITIAL_STATE: FormState = {
   success: false,
   message: undefined,
   strapiErrors: null,
   zodErrors: null,
};

export function ProfileImageForm({ image, className }: ProfileImageFormProps) {
   const [formState, formAction, isPending] = useActionState(
      actions.profile.updateProfileImageAction,
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

   return (
      <div className={IMAGE_FORM_STYLES.container}>
         <form action={formAction} className={cn("w-full", className)}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={PROFILE_FORM_STYLES.title}>
                     Imagen de perfil
                  </CardTitle>
                  <CardDescription>
                     Sube una imagen para personalizar tu perfil.
                  </CardDescription>
               </CardHeader>

               <CardContent className={SIGN_IN_FORM_STYLES.content}>
                  <input
                     hidden
                     id="id"
                     name="id"
                     defaultValue={image?.documentId ?? ""}
                  />

                  <div className={IMAGE_FORM_STYLES.fieldGroup}>
                     <ImagePicker
                        id="image"
                        name="image"
                        label="Imagen de perfil"
                        defaultValue={image?.url ?? ""}
                     />

                     <FormError error={formState.zodErrors?.image} />
                  </div>
               </CardContent>

               <CardFooter className={SIGN_IN_FORM_STYLES.footer}>
                  <SubmitButton
                     className={SIGN_IN_FORM_STYLES.button}
                     text="Guardar imagen"
                     loadingText="Guardando imagen"
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
