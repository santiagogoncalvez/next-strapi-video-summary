import Logo from "@/components/logo";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   BUTTON_VARIANTS,
   SIGN_IN_FORM_STYLES,
} from "@/constants/styles";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function EmailConfirmed() {
   return (
      <div className={SIGN_IN_FORM_STYLES.container}>
         <Logo />
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
               <CardFooter
                  className={`${SIGN_IN_FORM_STYLES.footer}`}
               >
                  <Link
                     className={cn(
                        BUTTON_VARIANTS({
                           variant: "default",
                           size: "lg",
                           className: "w-full",
                        }),
                     )}
                     href="/auth/login"
                  >
                     Ir a iniciar sesión
                  </Link>
               </CardFooter>
            </Card>
         </div>
      </div>
   );
}
