"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import {
   InputGroup,
   InputGroupAddon,
   InputGroupInput,
} from "../ui/input-group";

interface SearchProps {
   className?: string;
}

export function Search({ className }: SearchProps) {
   const searchParams = useSearchParams();
   const { replace } = useRouter();
   const pathname = usePathname();

   const queryParam = searchParams.get("query") ?? "";

   const [value, setValue] = useState(queryParam);

   // Último valor que este componente mandó a la URL
   const lastSearchRef = useRef(queryParam);

   useEffect(() => {
      // Si la URL cambió por algo externo al Search,
      // sincronizamos el input.
      if (queryParam !== lastSearchRef.current) {
         setValue(queryParam);
         lastSearchRef.current = queryParam;
      }
   }, [queryParam]);

   const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      if (term) {
         params.set("query", term);
      } else {
         params.delete("query");
      }

      lastSearchRef.current = term;

      replace(`${pathname}?${params.toString()}`);
   }, 300);

   function handleChange(term: string) {
      setValue(term);
      handleSearch(term);
   }

   return (
      <InputGroup className={className}>
         <InputGroupInput
            type="text"
            placeholder="Buscar resumen..."
            value={value}
            onChange={(e) => handleChange(e.target.value)}
         />

         <InputGroupAddon>
            <SearchIcon className="text-muted-foreground" strokeWidth={1.5} />
         </InputGroupAddon>
      </InputGroup>
   );
}
