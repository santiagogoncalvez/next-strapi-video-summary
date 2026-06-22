// import { STRAPI_BASE_URL } from "@/lib/strapi";
import NavBar from "./NavBar";

const styles = {
   header: "relative h-[500px] rounded-2xl overflow-hidden rounded-4xl",
   backgroundImage: "absolute inset-0 object-cover w-full h-full ",
   overlay:
      "relative flex flex-col items-center justify-center h-full text-center",
   heading: "text-black text-4xl font-bold md:text-5xl lg:text-6xl",
   subheading: "mt-8 text-black text-lg md:text-xl lg:text-2xl",
   button: "mt-8 ",
};

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
      <header className={styles.header}>
         <div className={styles.overlay}>
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.subheading}>{subHeading}</p>
            <div className="mt-8">
               <NavBar link={link} secondaryLink={secondaryLink} isHero />
            </div>
         </div>
      </header>
   );
}
