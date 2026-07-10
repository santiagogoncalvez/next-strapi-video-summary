"use client";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

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
}: ButtonProps) {
   const status = useFormStatus();
   return (
      <Button
         type="submit"
         aria-disabled={status.pending || loading}
         disabled={status.pending || loading || disabled}
         size="lg"
         className={cn(className)}
      >
         {status.pending || loading ? <Loader text={loadingText} /> : text}
      </Button>
   );
}
