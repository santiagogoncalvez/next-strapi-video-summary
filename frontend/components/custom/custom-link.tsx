import Link from "next/link";
import { VariantProps } from "class-variance-authority";
import { BUTTON_VARIANTS } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const baseStyles = "text-sm font-medium";
const heroStyles = "text-base font-medium px-4 py-6";

type CustomLinkProps = {
   href: string;
   children?: ReactNode;
   isHero?: boolean;
   className?: string;
} & VariantProps<typeof BUTTON_VARIANTS>;

export function AppLink({
   href,
   children,
   variant = "default",
   size = "lg",
   isHero = false,
   className,
}: CustomLinkProps) {
   return (
      <Link
         href={href}
         className={cn(
            BUTTON_VARIANTS({
               variant,
               size,
               className: cn(isHero ? heroStyles : baseStyles, className),
            }),
         )}
      >
         <div className="flex items-center gap-2">{children}</div>
      </Link>
   );
}
