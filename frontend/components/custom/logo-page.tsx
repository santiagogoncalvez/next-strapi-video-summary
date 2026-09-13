   "use client";

   import Link from "next/link";

   import { LogoIcon } from "../icons/logo";
   import { Link as StrapiLink } from "@/types/strapi";
   import { cn } from "@/lib/utils";
   import { LogoMark } from "../icons/logo-mark";
import { usePathname } from "next/navigation";

   interface Props {
      showText?: boolean;
      logoText: StrapiLink;
      dark?: boolean;
      className?: string;
      onClick?: () => void;
   }

   export default function Logo({
      showText = true,
      logoText,
      className,
      onClick = () => {},
   }: Props) {
      const pathname = usePathname();
      const scrollToTop = pathname === "/";

      const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
         if (scrollToTop) {
            event.preventDefault();

            window.scrollTo({
               top: 0,
               behavior: "smooth",
            });

            window.history.replaceState(
               null,
               "",
               window.location.pathname + window.location.search,
            );
         }

         onClick();
      };

      return (
         <Link
            className={cn(
               "flex w-fit items-center gap-1 text-[1.7rem] font-normal text-foreground",
               className,
            )}
            href={logoText.href}
            aria-label="Ir al inicio"
            onClick={handleClick}
         >
            {showText ? (
               <LogoIcon className="h-6 w-auto" />
            ) : (
               <LogoMark className="size-8" />
            )}
         </Link>
      );
   }
