import { cn } from "@/lib/utils";

export function FormError({ error, className }: { error?: string[]; className?: string }) {
   if (!error) return null;

   return error.map((err, index) => (
      <div key={index} className={cn("text-red-500 text-xs", className)}>
         {err}
      </div>
   ));
}
