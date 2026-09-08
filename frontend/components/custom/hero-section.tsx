import { HERO_SECTION_STYLES } from "@/constants/styles";
import { HeroSectionProps } from "@/types/strapi";
import { HomeSummaryForm } from "../form/summary-form-hero";

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
   if (!data) return null;

   const { heading, subHeading} = data;
   // console.log("user image:", image);

   return (
      <div className={HERO_SECTION_STYLES.header}>
         <video
            className="absolute inset-0 h-full w-full object-cover opacity-15"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
         >
            <source src="/videos/mesh-gradient.webm" type="video/mp4" />
         </video>

         <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-b from-transparent to-white" />

         <div className={HERO_SECTION_STYLES.overlay}>
            <h1 className={HERO_SECTION_STYLES.heading}>{heading}</h1>

            <p className={HERO_SECTION_STYLES.subheading}>{subHeading}</p>

            <div className="mt-8 flex w-full justify-center">
               <HomeSummaryForm />
            </div>

            <p className="mt-8 text-center text-sm font-light text-muted-foreground">
               Gratis para empezar · Videos de hasta 60 minutos
            </p>
         </div>
      </div>
   );
}
