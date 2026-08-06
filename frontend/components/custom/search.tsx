"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SearchProps {
   className?: string;
}

export function Search({ className }: SearchProps) {
   const searchParams = useSearchParams();
   const { replace } = useRouter();
   const pathname = usePathname();

   const queryParam = searchParams.get("query") ?? "";

   // Guardamos el valor actual y la última versión conocida del parámetro de la URL
   const [prevQuery, setPrevQuery] = useState(queryParam);
   const [value, setValue] = useState(queryParam);

   // PATRÓN OFICIAL DE REACT: Sincronización durante el renderizado
   // Se ejecuta SÓLO si la URL cambió externamente (ej: al presionar ClearSearchButton)
   if (prevQuery !== queryParam) {
      setPrevQuery(queryParam);
      setValue(queryParam);
   }

   const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (term) {
         params.set("query", term);
      } else {
         params.delete("query");
      }

      replace(`${pathname}?${params.toString()}`);
   }, 300);

   function handleChange(term: string) {
      setValue(term);
      handleSearch(term);
   }

   return (
      <Input
         type="text"
         placeholder="Buscar resumen"
         value={value}
         onChange={(e) => handleChange(e.target.value)}
         className={cn("", className)}
      />
   );
}
