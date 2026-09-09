import Image from "next/image";

const steps = [
   {
      number: "1.",
      title: "Pegá el enlace",
      description:
         "Copiá el link de cualquier video de YouTube y dejá que RESU haga el resto.",
      image: "/images/dashboard-section-home.png",
      alt: "Dashboard de RESU",
   },
   {
      number: "2.",
      title: "Dejá que RESU lo procese",
      description:
         "RESU analiza el contenido y lo transforma en un resumen claro, ordenado y fácil de entender.",
      image: "/images/dashboard-section-home.png",
      alt: "Procesamiento de un video en RESU",
   },
   {
      number: "3.",
      title: "Leé, editá y guardá",
      description:
         "Revisá el resultado, ajustalo a tu gusto y guardalo para volver cuando quieras.",
      image: "/images/dashboard-section-home.png",
      alt: "Resumen de un video en RESU",
   },
];

export function HowItWorksSection() {
   return (
      <section className="w-full">
         <div className="mx-auto max-w-screen-2xl">
            <div className="max-w-2xl text-start">
               <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                  Cómo funciona RESU
               </h2>

               <p className="mt-4 text-lg text-muted-foreground">
                  De un video largo a un resumen útil en solo tres pasos.
               </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
               {steps.map((step) => (
                  <article
                     key={step.number}
                     className="flex min-h-112 flex-col overflow-hidden rounded-3xl border border-sidebar-border/50"
                  >
                     <div className="flex flex-1 flex-col p-8">
                        <span className="text-sm font-medium text-muted-foreground">
                           {step.number}
                        </span>

                        <h3 className="mt-4 text-xl font-medium">
                           {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-6 text-muted-foreground">
                           {step.description}
                        </p>
                     </div>

                     <div className="mt-auto border-t-0 border-sidebar-border/50">
                        <Image
                           src={step.image}
                           alt={step.alt}
                           width={1920}
                           height={1080}
                           className="h-auto w-full"
                        />
                     </div>
                  </article>
               ))}
            </div>
         </div>
      </section>
   );
}
