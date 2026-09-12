import Image from "next/image";

const images = [
   {
      src: "/images/dashboard-section-home.png",
      alt: "Dashboard de RESU",
   },
   {
      src: "/images/dashboard-section-home.png",
      alt: "Resumen de un video en RESU",
   },
   {
      src: "/images/dashboard-section-home.png",
      alt: "Editor de resúmenes de RESU",
   },
   {
      src: "/images/dashboard-section-home.png",
      alt: "Vista de resumen de RESU",
   },
];

export function DashboardImageSection() {
   return (
      <section className="w-full">
         <div className="sm:flex hidden relative left-1/2  w-max -translate-x-1/2 gap-8">
            {images.map((image, index) => (
               <div
                  key={`${image.src}-${index}`}
                  className="w-[35vw] shrink-0 overflow-hidden rounded-3xl border border-sidebar-border/50"
               >
                  <Image
                     src={image.src}
                     alt={image.alt}
                     width={1920}
                     height={1080}
                     className="h-auto w-full"
                  />
               </div>
            ))}
         </div>

         <div className="sm:hidden flex flex-col gap-8">
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
      </section>
   );
}
