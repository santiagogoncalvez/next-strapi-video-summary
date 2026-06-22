export default function ConfirmEmail() {
   return (
      <div className="flex min-h-screen items-center justify-center px-4">
         <div className="w-full max-w-md p-6 space-y-6   text-center">
            <h2 className="text-2xl font-semibold">
               Confirma tu correo electrónico
            </h2>
            <p className="text-gray-700 text-sm">
               Confirma tu correo electrónico. Hemos enviado un enlace de
               confirmación a tu dirección de correo electrónico. Por favor,
               revisa tu bandeja de entrada y haz clic en el enlace para
               verificar tu cuenta antes de iniciar sesión.
            </p>
         </div>
      </div>
   );
}
