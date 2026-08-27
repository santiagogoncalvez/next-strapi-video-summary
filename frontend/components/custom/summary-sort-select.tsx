"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const DEFAULT_SORT = "newest";

export function SummarySortSelect({className}:{className?: string}) {
   const searchParams = useSearchParams();
   const { replace } = useRouter();
   const pathname = usePathname();

   const sort = searchParams.get("sort") ?? DEFAULT_SORT;

   function handleChange(value: string) {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (value === DEFAULT_SORT) {
         params.delete("sort");
      } else {
         params.set("sort", value);
      }

      replace(`${pathname}?${params.toString()}`);
   }

   return (
      <Select value={sort} onValueChange={handleChange}>
         <SelectTrigger className={cn("w-full", className)} size="lg">
            <span className="text-muted-foreground">Ordenar por:</span>
            <SelectValue placeholder="Ordenar por" />
         </SelectTrigger>

         <SelectContent position="popper">
            <SelectItem value="newest">Más recientes</SelectItem>
            <SelectItem value="oldest">Más antiguos</SelectItem>
            <SelectItem value="title-asc">Título A-Z</SelectItem>
            <SelectItem value="title-desc">Título Z-A</SelectItem>
         </SelectContent>
      </Select>
   );
}
