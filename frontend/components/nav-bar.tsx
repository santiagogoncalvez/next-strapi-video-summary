import { BUTTON_VARIANTS } from "@/constants/styles";
import { NavBarLinks } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import Link from "next/link";

const stylesHero = "text-base font-medium px-4 py-6 ";
const styles = "text-base font-medium";

interface Props extends NavBarLinks {
   isHero?: boolean;
}

export default async function NavBar({
   link,
   secondaryLink,
   isHero = false,
}: Props) {
   return (
      <nav
         className={cn("flex gap-4", {
            "flex-row-reverse": isHero,
         })}
      >
         <Link
            className={cn(
               BUTTON_VARIANTS({
                  variant: "outline",
                  size: "lg",
                  className: isHero ? stylesHero : styles,
               }),
            )}
            href={secondaryLink.href}
         >
            {secondaryLink.label}
         </Link>
         <Link
            className={cn(
               BUTTON_VARIANTS({
                  variant: "default",
                  size: "lg",
                  className: isHero ? stylesHero : styles,
               }),
            )}
            href={link.href}
         >
            {link.label}
         </Link>
      </nav>
   );
}
