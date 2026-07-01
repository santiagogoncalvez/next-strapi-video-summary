import Link from "next/link";
import { LogoIcon } from "../icons/logo";
import { Link as StrapiLink } from "@/types/strapi";

interface Props {
   showText?: boolean;
   logoText: StrapiLink;

   dark?: boolean;
}

export default function Logo({ showText = true, logoText, dark }: Props) {
   return (
      <Link
         className="w-fit font-normal text-3xl flex gap-1 items-center"
         href={logoText.href}
      >
         <LogoIcon className="size-10" />
         {showText && (
            <span className={`${dark ? "text-white" : ""}`}>
               {" "}
               {logoText.label}
            </span>
         )}
      </Link>
   );
}
