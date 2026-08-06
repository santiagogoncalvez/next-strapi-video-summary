"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ClearSearchButton() {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   function handleClearSearch() {
      const params = new URLSearchParams(searchParams);

      params.delete("query");
      params.delete("page");

      const queryString = params.toString();

      router.replace(queryString ? `${pathname}?${queryString}` : pathname);
   }

   return (
      <Button variant="outline" size="lg" onClick={handleClearSearch}>
         Limpiar búsqueda
      </Button>
   );
}
