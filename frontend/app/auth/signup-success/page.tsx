import { AppLink } from "@/components/custom/CustomLink";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { BUTTON_VARIANTS, SIGN_IN_FORM_STYLES } from "@/constants/styles";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function EmailConfirmed() {
   return (
      <div className={SIGN_IN_FORM_STYLES.container}>
         <div className="w-full">
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={SIGN_IN_FORM_STYLES.title}>
                     Correo electrónico confirmado
                  </CardTitle>
                  <CardDescription className="text-center">
                     Tu correo electrónico ha sido verificado correctamente.
                     Ahora puedes iniciar sesión en tu cuenta.
                  </CardDescription>
               </CardHeader>
               <CardFooter className={`${SIGN_IN_FORM_STYLES.footer}`}>
                  <AppLink
                     href="/auth/login"
                     className={SIGN_IN_FORM_STYLES.button}
                  >
                     Ir al inicio
                  </AppLink>
               </CardFooter>
            </Card>
         </div>
      </div>
   );
}
