import Image from "next/image";

const images = [
   {
      src: "/images/nextjs-strapi-section-home.png",
      alt: "Resumen de un video sobre Next.js 16 y Strapi 5 en resu",
   },
   {
      src: "/images/programar-es-dificil-section-home.png",
      alt: "Resumen de un video sobre aprendizaje de programación en resu",
   },
   {
      src: "/images/programador-autodidacta-section-home.png",
      alt: "Resumen de un video sobre programación autodidacta en resu",
   },
   {
      src: "/images/prueba-tecnica-mercadolibre-section-home.png",
      alt: "Resumen de una prueba técnica de MercadoLibre en resu",
   },
];

export function DashboardImageSection() {
   return (
      <section className="w-full">
         <div className="sm:flex hidden relative">
            <div className="absolute inset-x-0 z-10 bottom-0 h-3/5 bg-linear-to-b from-transparent via-background/40 to-background w-screen left-1/2 -translate-x-1/2" />

            <div className="flex relative left-1/2  w-max -translate-x-1/2 gap-8">
               {images.map((image, index) => (
                  <div
                     key={`${image.src}-${index}`}
                     className="2xl:w-[20vw] w-[35vw] shrink-0 overflow-hidden rounded-3xl border border-sidebar-border/50"
                  >
                     <Image
                        src={image.src}
                        alt={image.alt}
                        width={1920}
                        height={1080}
                        className="h-auto w-full"
                        quality={100}
                     />
                  </div>
               ))}
            </div>
         </div>

         <div className="sm:hidden flex flex-col gap-8">
            <div className="relative">
               <div className="absolute inset-x-0 z-10 bottom-0 h-3/5 bg-linear-to-b from-transparent via-background/40 to-background w-screen left-1/2 -translate-x-1/2" />

               <div className="flex relative left-1/2  w-max -translate-x-1/2 gap-8">
                  {images.map((image, index) => {
                     if (index >= 2) return;
                     return (
                        <div
                           key={`${image.src}-${index}`}
                           className="w-[100vw] shrink-0 overflow-hidden rounded-3xl border border-sidebar-border/50"
                        >
                           <Image
                              src={image.src}
                              alt={image.alt}
                              width={1920}
                              height={1080}
                              className="h-auto w-full"
                           />
                        </div>
                     );
                  })}
               </div>
            </div>

            <div className="relative">
               <div className="absolute inset-x-0 z-10 bottom-0 h-3/5 bg-linear-to-b from-transparent via-background/40 to-background w-screen left-1/2 -translate-x-1/2" />

               <div className="flex relative left-1/2  w-max -translate-x-1/2 gap-8">
                  {images.map((image, index) => {
                     if (index < 2) return;
                     return (
                        <div
                           key={`${image.src}-${index}`}
                           className="w-[100vw] shrink-0 overflow-hidden rounded-3xl border border-sidebar-border/50"
                        >
                           <Image
                              src={image.src}
                              alt={image.alt}
                              width={1920}
                              height={1080}
                              className="h-auto w-full"
                           />
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </section>
   );
}
