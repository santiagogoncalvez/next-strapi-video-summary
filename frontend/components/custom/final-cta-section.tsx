import { AppLink } from "./custom-link";

export function FinalCTASection() {
   return (
      <section className="w-full">
         <div className="mx-auto max-w-screen-2xl">
            <div className="rounded-3xl bg-foreground px-6 text-background md:px-16 md:py-20 py-16">
               <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
                  <h2 className="text-3xl font-medium tracking-tight md:text-4xl text-pretty">
                     Tu próximo video merece un resumen
                  </h2>

                  <p className="mt-8 max-w-xl text-base leading-7 text-background/70 md:text-lg text-pretty">
                     Pegá un link de YouTube y convertí horas de contenido en
                     ideas claras.
                  </p>

                  <div className="flex gap-2">
                     <AppLink
                        href="/auth/login"
                        variant="outline"
                        className="dark mt-8"
                     >
                        Iniciar sesión
                     </AppLink>
                     <AppLink href="/auth/signup" className="dark mt-8">
                        Crear mi cuenta
                     </AppLink>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}
