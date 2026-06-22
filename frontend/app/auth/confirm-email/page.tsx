import Logo from "@/components/Logo";
import {
   Card,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { SIGN_IN_FORM_STYLES } from "@/constants/styles";

export default function ConfirmEmail() {
   return (
      <div className={SIGN_IN_FORM_STYLES.container}>
         <Logo />
         <div className="w-full">
            <Card>
               <CardHeader className={SIGN_IN_FORM_STYLES.header}>
                  <CardTitle className={SIGN_IN_FORM_STYLES.title}>
                     Confirma tu correo electrónico
                  </CardTitle>
                  <CardDescription className="text-center">
                     Confirma tu correo electrónico. Hemos enviado un enlace de
                     confirmación a tu dirección de correo electrónico. Por
                     favor, revisa tu bandeja de entrada y haz clic en el enlace
                     para verificar tu cuenta antes de iniciar sesión.
                  </CardDescription>
               </CardHeader>
            </Card>
         </div>
      </div>
   );
}
