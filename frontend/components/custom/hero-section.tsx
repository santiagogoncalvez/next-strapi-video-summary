import { HERO_SECTION_STYLES } from "@/constants/styles";
import { HeroSectionProps } from "@/types/strapi";
import { HomeSummaryForm } from "../form/summary-form-hero";

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
   if (!data) return null;

   const { heading, subHeading } = data;

   return (
      <div className={HERO_SECTION_STYLES.header}>
         <video
            className="absolute inset-0 h-full w-full object-cover opacity-10"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
         >
            <source src="/videos/mesh-gradient.webm" type="video/webm" />
         </video>

         <div className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-b from-transparent via-white/70 to-white" />

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
