import { NavBarLinks } from "@/types/definitions";
import { cn } from "@/lib/utils";
import { AppLink } from "./custom-link";

interface Props extends NavBarLinks {
   isHero?: boolean;
}

export default function NavBar({ link, secondaryLink, isHero = false }: Props) {
   return (
      <nav
         className={cn("flex gap-2 items-center justify-center", {
            "flex-row-reverse": isHero,
         })}
      >
         <AppLink
            href={secondaryLink.href}
            isHero={isHero}
            variant="outline"
         >
            {secondaryLink.label}
         </AppLink>
         <AppLink href={link.href} isHero={isHero}>
            {link.label}
         </AppLink>
      </nav>
   );
}
