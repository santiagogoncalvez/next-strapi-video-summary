"use client";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button, BUTTON_VARIANTS } from "@/components/ui/button";
import { ArrowUp, Loader2 } from "lucide-react";
import { VariantProps } from "class-variance-authority";

interface ButtonProps {
   className?: string;
   loading?: boolean;
   disabled?: boolean;
}

export function SubmitButtonSummary({
   loading,
   className,
   disabled,
   size = "icon",
}: ButtonProps & VariantProps<typeof BUTTON_VARIANTS>) {
   const status = useFormStatus();
   return (
      <Button
         type="submit"
         aria-disabled={status.pending || loading}
         disabled={status.pending || loading || disabled}
         size={size}
         className={cn(className)}
      >
         {status.pending || loading ? (
            <Loader2 className="size-4 animate-spin" strokeWidth={1.5} />
         ) : (
            <ArrowUp className="size-4" />
         )}
      </Button>
   );
}
