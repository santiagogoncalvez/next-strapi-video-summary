"use client";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import { PROFILE_FORM_STYLES, SIGN_IN_FORM_STYLES } from "@/constants/styles";
import { AppLink } from "./custom-link";

interface Props {
   className?: string;
}

export function AccountSecuritySection({ className }: Readonly<Props>) {
   return (
      <div className={PROFILE_FORM_STYLES.container}>
         <div className={cn("w-full", className)}>
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={PROFILE_FORM_STYLES.title}>
                     Seguridad
                  </CardTitle>

                  <CardDescription>
                     Administra la seguridad de tu cuenta y cambia tu contraseña
                     cuando lo necesites.
                  </CardDescription>
               </CardHeader>

               <CardContent className={PROFILE_FORM_STYLES.content}>
                  <div className={PROFILE_FORM_STYLES.fieldGroup}>
                     <Label htmlFor="username">Contraseña</Label>

                     <AppLink href="/auth/change-password" variant="outline">
                        Cambiar contraseña
                     </AppLink>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}
