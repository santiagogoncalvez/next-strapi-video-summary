// import { STRAPI_BASE_URL } from "@/lib/strapi";
import { HERO_SECTION_STYLES } from "@/constants/styles";
import NavBar from "./nav-bar";

export function HeroSection({
   data,
}: {
   readonly data: {
      heading: string;
      subHeading: string;
      link: { href: string; label: string };
      secondaryLink: { href: string; label: string };
      image: { url: string; alternativeText: string };
   };
}) {
   if (!data) return null;

   const { heading, subHeading, link, secondaryLink } = data;

   return (
      <header className={HERO_SECTION_STYLES.header}>
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
