import { BUTTON_VARIANTS } from "@/constants/styles";
import { STRAPI_BASE_URL } from "@/lib/strapi";
import { cn } from "@/lib/utils";
import Link from "next/link";

const styles = {
   header: "relative h-[600px] rounded-2xl overflow-hidden rounded-4xl",
   backgroundImage: "absolute inset-0 object-cover w-full h-full ",
   overlay:
      "relative flex flex-col items-center justify-center h-full text-center bg-white/98",
   heading: "text-black text-4xl font-bold md:text-5xl lg:text-6xl",
   subheading: "mt-8 text-black text-lg md:text-xl lg:text-2xl",
   button: "mt-8 text-base font-medium px-6 py-6 ",
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

   const imageURL = data.image?.url.startsWith("http")
      ? data.image.url
      : `${STRAPI_BASE_URL}${data.image.url}`;

   return (
      <header className={styles.header}>
         {/* <img
            alt="Background"
            className={styles.backgroundImage}
            height={1080}
            src={imageURL}
            style={{
               aspectRatio: "1920/1080",
               objectFit: "cover",
            }}
            width={1920}
         /> */}
         <div className={styles.overlay}>
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.subheading}>{subHeading}</p>
            <div className="flex gap-4">
               <Link
                  className={cn(
                     BUTTON_VARIANTS({
                        variant: "default",
                        size: "lg",
                        className: styles.button,
                     }),
                  )}
                  href={link.href}
               >
                  {link.label}
               </Link>
               <Link
                  className={cn(
                     BUTTON_VARIANTS({
                        variant: "outline",
                        size: "lg",
                        className: styles.button,
                     }),
                  )}
                  href={secondaryLink.href}
               >
                  {secondaryLink.label}
               </Link>
            </div>
         </div>
      </header>
   );
}
