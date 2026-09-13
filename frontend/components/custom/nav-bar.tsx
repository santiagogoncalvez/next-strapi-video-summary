import { NavBarLinks } from "@/types/definitions";
import { cn } from "@/lib/utils";
import { AppLink } from "./custom-link";

interface Props extends NavBarLinks {
   isHero?: boolean;
   invertedTheme?: boolean;
   className?: string;
}

export default function NavBar({
   link,
   secondaryLink,
   isHero = false,
   invertedTheme = false,
   className,
}: Props) {
   return (
      <nav
         className={cn(
            "flex flex-wrap gap-2 items-center justify-center",
            {
               "flex-row-reverse": isHero,
            },
            className,
         )}
      >
         <AppLink
            href={secondaryLink.href}
            variant={invertedTheme ? "ghost-dark" : "ghost"}
            className={isHero ? "text-base px-4 py-6" : ""}
         >
            {secondaryLink.label}
         </AppLink>
         <AppLink
            href={link.href}
            variant={invertedTheme ? "default-dark" : "default"}
            className={isHero ? "text-base px-4 py-6" : ""}
         >
            {link.label}
         </AppLink>
      </nav>
   );
}
