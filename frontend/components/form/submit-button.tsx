"use client";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button, BUTTON_VARIANTS } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { VariantProps } from "class-variance-authority";

function Loader({ text }: { readonly text: string }) {
   return (
      <div className="flex items-center justify-center gap-2">
         <Loader2 className="size-4 animate-spin" />
         <p>{text}</p>
      </div>
   );
}

interface ButtonProps {
   text: string;
   loadingText: string;
   className?: string;
   loading?: boolean;
   disabled?: boolean;
}

export function SubmitButton({
   text,
   loadingText,
   loading,
   className,
   disabled,
   size = "lg"
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
         {status.pending || loading ? <Loader text={loadingText} /> : text}
      </Button>
   );
}
