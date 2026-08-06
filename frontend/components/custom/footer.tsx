import { FOOTER_STYLES } from "@/constants/styles";
import { type Footer } from "@/types/strapi";
import Link from "next/link";
import Logo from "./logo-page";
import { GithubIcon, TwitterIcon, YoutubeIcon } from "../icons/social-icons";

function selectSocialIcon(url: string) {
   if (url.includes("youtube"))
      return <YoutubeIcon className={FOOTER_STYLES.icon} />;
   if (url.includes("twitter"))
      return <TwitterIcon className={FOOTER_STYLES.icon} />;
   if (url.includes("github"))
      return <GithubIcon className={FOOTER_STYLES.icon} />;
   return null;
}

interface FooterProps {
   data?: Footer | null;
}

export function Footer({ data }: FooterProps) {
   if (!data) return null;

   const { logoText, socialLink, text } = data;

   return (
      <footer className={FOOTER_STYLES.footer}>
         <div className={FOOTER_STYLES.container}>
            <div className="md:w-40 w-fit flex justify-start">
               <Logo logoText={logoText} />
            </div>
            <p className={FOOTER_STYLES.text}>{text}</p>
            <div className={FOOTER_STYLES.socialContainer}>
               {socialLink.map((link) => {
                  return (
                     <Link
                        className={FOOTER_STYLES.socialLink}
                        href={link.href}
                        key={link.id}
                     >
                        {selectSocialIcon(link.href)}
                        <span className={FOOTER_STYLES.srOnly}>
                           Visit us at {link.label}
                        </span>
                     </Link>
                  );
               })}
            </div>
         </div>
      </footer>
   );
}
