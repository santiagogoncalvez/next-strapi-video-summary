import Link from "next/link";
import { VariantProps } from "class-variance-authority";
import { BUTTON_VARIANTS } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// const baseStyles = "text-sm font-medium";
// const heroStyles = "text-base font-medium px-4 py-6";

type CustomLinkProps = {
   href: string;
   children?: ReactNode;
   className?: string;
} & VariantProps<typeof BUTTON_VARIANTS>;

export function AppLink({
   href,
   children,
   variant = "default",
   size = "lg",
   className,
   ...props
}: CustomLinkProps) {
   return (
      <Link
         href={href}
         data-variant={variant}
         data-size={size}
         className={cn(BUTTON_VARIANTS({ variant, size, className }))}
         {...props}
      >
         {children}
      </Link>
   );
}
