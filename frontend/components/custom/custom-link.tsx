import Link from "next/link";
import type { ComponentProps } from "react";

import { VariantProps } from "class-variance-authority";

import { BUTTON_VARIANTS } from "@/constants/styles";
import { cn } from "@/lib/utils";

type CustomLinkProps = ComponentProps<typeof Link> &
   VariantProps<typeof BUTTON_VARIANTS>;

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
