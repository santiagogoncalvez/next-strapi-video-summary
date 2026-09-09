import { Brain, Clock3, Library } from "lucide-react";

const benefits = [
   {
      icon: Clock3,
      title: "Ahorrá tiempo",
      description:
         "Llegá a las ideas importantes sin ver el video completo. Convertí horas de contenido en unos minutos de lectura.",
   },
   {
      icon: Brain,
      title: "Entendé mejor",
      description:
         "Encontrá los temas principales, las ideas clave y las conclusiones en una estructura clara y fácil de recorrer.",
   },
   {
      icon: Library,
      title: "Tené todo a mano",
      description:
         "Guardá tus resúmenes, marcá tus favoritos y volvé a ellos cuando quieras desde tu propia biblioteca.",
   },
];

export function BenefitsSection() {
   return (
      <section className="w-full">
         <div className="max-w-screen-2xl">
            <div className="max-w-2xl text-start">
               <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                  Beneficios
               </h2>

               <p className="mt-4 text-lg text-muted-foreground">
                  Más tiempo para entender. Menos tiempo buscando qué importa.
               </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
               {benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                     <article
                        key={benefit.title}
                        className="flex flex-col rounded-3xl border border-sidebar-border/50 p-8"
                     >
                        <Icon
                           className="size-6 text-muted-foreground"
                           strokeWidth={1.5}
                           aria-hidden="true"
                        />

                        <h3 className="mt-4 text-xl font-medium">
                           {benefit.title}
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-muted-foreground">
                           {benefit.description}
                        </p>
                     </article>
                  );
               })}
            </div>
         </div>
      </section>
   );
}
