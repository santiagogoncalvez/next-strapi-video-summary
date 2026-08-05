import { HERO_SECTION_STYLES } from "@/constants/styles";
import NavBar from "./nav-bar";
import { HeroSectionProps } from "@/types/strapi";
import { MediaImage } from "./media-image";

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
   if (!data) return null;

   const { heading, subHeading, image, link, secondaryLink } = data;
   // console.log("user image:", image);

   return (
      <header className={HERO_SECTION_STYLES.header}>
         <MediaImage
            alt={image.alternativeText ?? "Sin texto alternativo"}
            className="absolute inset-0 object-cover w-full h-full aspect/16:9"
            src={image.url}
            height={1080}
            width={1920}
         />
         <div className={HERO_SECTION_STYLES.overlay}>
            <h1 className={HERO_SECTION_STYLES.heading}>{heading}</h1>
            <p className={HERO_SECTION_STYLES.subheading}>{subHeading}</p>
            <div className="mt-8">
               <NavBar link={link} secondaryLink={secondaryLink} isHero />
            </div>
         </div>
      </header>
   );
}
