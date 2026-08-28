"use client";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Loader2 } from "lucide-react";

function Loader() {
   return (
      <div className="flex items-center">
         <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
      </div>
   );
}

interface DeleteButtonProps {
   className?: string;
   loading?: boolean;
   disabled?: boolean;
}

export function DeleteButton({
   className,
   loading,
   disabled,
}: Readonly<DeleteButtonProps>) {
   const status = useFormStatus();
   return (
      <Button
         type="submit"
         aria-disabled={status.pending || loading}
         disabled={status.pending || loading || disabled}
         variant="ghost"
         size="default"
         className={cn(className)}
      >
         {status.pending || loading ? (
            <Loader />
         ) : (
            <TrashIcon />
         )}
      </Button>
   );
}
