"use client";

import Link from "next/link";

import { LogoIcon } from "../icons/logo";
import { Link as StrapiLink } from "@/types/strapi";
import { cn } from "@/lib/utils";

interface Props {
   showText?: boolean;
   logoText: StrapiLink;
   dark?: boolean;
   className?: string;
   scrollToTop?: boolean;
}

export default function Logo({
   showText = true,
   logoText,
   className,
   scrollToTop = false,
}: Props) {
   const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!scrollToTop) return;

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
   };

   return (
      <Link
         className={cn(
            "flex w-fit items-center gap-1 text-[1.7rem] font-normal",
            className,
         )}
         href={logoText.href}
         aria-label="Ir al inicio"
         onClick={handleClick}
      >
         <LogoIcon className={`${showText ? "size-10" : "size-8"}`} />
      </Link>
   );
}
