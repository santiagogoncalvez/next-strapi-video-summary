import Link from "next/link";
import { LogoIcon } from "../icons/logo";
import { Link as StrapiLink } from "@/types/strapi";
import { cn } from "@/lib/utils";

interface Props {
   showText?: boolean;
   logoText: StrapiLink;
   dark?: boolean;
   className?: string;
}

export default function Logo({
   showText = true,
   logoText,
   dark,
   className,
}: Props) {
   return (
      <Link
         className={cn(
            "w-fit font-normal text-[1.7rem] flex gap-1 items-center",
            className,
         )}
         href={logoText.href}
      >
         <LogoIcon className={`${showText ? "size-10" : "size-8"}`} />
         {showText && (
            <span className={`${dark ? "text-white" : ""} md:flex hidden`}>
               {" "}
               {logoText.label}
            </span>
         )}
      </Link>
   );
}
