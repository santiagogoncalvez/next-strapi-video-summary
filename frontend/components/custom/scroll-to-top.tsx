"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export function ScrollToTop() {
   return (
      <Button
         onClick={() => {
            window.scrollTo({
               top: 0,
               behavior: "smooth",
            });

            window.history.replaceState(
               null,
               "",
               window.location.pathname + window.location.search,
            );
         }}
         variant="ghost"
         size="lg"
      >
         Volver arriba <ArrowUp strokeWidth={1.5} />
      </Button>
   );
}
