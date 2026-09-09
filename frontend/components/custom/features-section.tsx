import Image from "next/image";

const features = [
   {
      number: "1.",
      title: "Editor integrado",
      description:
         "Editá cada resumen como si fuera tu propio documento. Agregá notas, resaltá ideas importantes, reorganizá el contenido y ajustalo antes de guardarlo.",
      image: "/images/dashboard-section-home.png",
      alt: "Editor de resúmenes de RESU",
   },
   {
      number: "2.",
      title: "Todo organizado",
      description:
         "Guardá tus resúmenes en un solo lugar, marcá tus favoritos y encontrá rápidamente los videos que ya procesaste.",
      image: "/images/dashboard-section-home.png",
      alt: "Biblioteca de resúmenes de RESU",
   },
   {
      number: "3.",
      title: "Resúmenes estructurados",
      description:
         "RESU organiza las ideas principales y las presenta de forma clara para que puedas recorrer el contenido sin volver al video.",
      image: "/images/dashboard-section-home.png",
      alt: "Resumen estructurado de un video en RESU",
   },
];

export function FeaturesSection() {
   return (
      <section className="w-full">
         <div className=" max-w-screen-2xl">
            <div className=" max-w-2xl text-start">
               <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
                  Funcionalidades
               </h2>

               <p className="mt-4 text-lg text-muted-foreground">
                  Todo lo que necesitás para convertir videos en información
                  útil.
               </p>
            </div>

            <div className="mt-12 space-y-24 md:space-y-6">
               {features.map((feature, index) => (
                  <article
                     key={feature.number}
                     className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
                  >
                     <div
                        className={
                           index % 2 === 1 ? "md:order-2" : "md:order-1"
                        }
                     >
                        {/* <span className="text-sm font-medium text-muted-foreground">
                           {feature.number}
                        </span> */}

                        <h3 className="text-2xl font-medium tracking-tight md:text-3xl">
                           {feature.title}
                        </h3>

                        <p className="mt-4 max-w-lg text-base leading-7 text-muted-foreground">
                           {feature.description}
                        </p>
                     </div>

                     <div
                        className={
                           index % 2 === 1 ? "md:order-1" : "md:order-2"
                        }
                     >
                        <div className="overflow-hidden rounded-3xl border border-sidebar-border/50">
                           <Image
                              src={feature.image}
                              alt={feature.alt}
                              width={1920}
                              height={1080}
                              className="h-auto w-full"
                           />
                        </div>
                     </div>
                  </article>
               ))}
            </div>
         </div>
      </section>
   );
}
