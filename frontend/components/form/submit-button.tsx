"use client";

// import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button, BUTTON_VARIANTS } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

interface ButtonProps {
   text: string;
   loadingText: string;
   icon?: ReactNode;
   className?: string;
   loading?: boolean;
   disabled?: boolean;
   form?: string;
}

export function SubmitButton({
   text,
   loadingText,
   icon,
   loading,
   className,
   disabled,
   size = "lg",
   form,
   variant = "default",
   ...props
}: ButtonProps &
   React.ComponentProps<"button"> &
   VariantProps<typeof BUTTON_VARIANTS>) {
   // const status = useFormStatus();
   // const isPending = status.pending || loading;
   const isPending = loading;

   return (
      <Button
         form={form || undefined}
         type="submit"
         aria-disabled={isPending}
         disabled={isPending || disabled}
         size={size}
         className={cn(className)}
         variant={variant}
         {...props}
      >
         {isPending ? (
            <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
         ) : (
            icon
         )}

         {isPending ? loadingText : text}
      </Button>
   );
}
