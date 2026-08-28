"use client";

import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { BUTTON_VARIANTS } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

interface SubmitButtonDrawerProps {
   text: string;
   loadingText: string;
   icon?: ReactNode;
   className?: string;
   loading?: boolean;
   disabled?: boolean;
   form?: string;
}

export function SubmitButtonDrawer({
   text,
   loadingText,
   icon,
   loading,
   className,
   disabled,
   form,
   ...props
}: SubmitButtonDrawerProps &
   React.ComponentProps<"button"> &
   VariantProps<typeof BUTTON_VARIANTS>) {
   const status = useFormStatus();
   const isPending = status.pending || loading;

   return (
      <DropdownMenuItem
         onSelect={(event) => {
            event.preventDefault();
         }}
         asChild
      >
         <button
            form={form || undefined}
            type="submit"
            aria-disabled={isPending}
            disabled={isPending || disabled}
            className={cn(className)}
            {...props}
         >
            {isPending ? (
               <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
            ) : (
               icon
            )}

            {isPending ? loadingText : text}
         </button>
      </DropdownMenuItem>
   );
}
