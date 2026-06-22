import { SIGN_UP_FORM_STYLES } from "@/constants/styles";
import Link from "next/link";

export default function EmailConfirmed() {
   return (
      <div className="flex min-h-screen items-center justify-center px-4">
         <div className="w-full max-w-md p-6 space-y-6 rounded-lg  text-center">
            <h2 className="text-2xl font-semibold">
               Correo electrónico confirmado
            </h2>

            <p className="text-gray-700 text-sm">
               Tu correo electrónico ha sido verificado correctamente. Ahora
               puedes iniciar sesión en tu cuenta.
            </p>

            <Link className={SIGN_UP_FORM_STYLES.link} href="/auth/login">
               Iniciar sesión
            </Link>
         </div>
      </div>
   );
}
