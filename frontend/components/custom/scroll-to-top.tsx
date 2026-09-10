"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export function ScrollToTop() {
   return (
      <Button
         onClick={() =>
            window.scrollTo({
               top: 0,
               behavior: "smooth",
            })
         }
         variant="ghost"
         size="lg"
      >
         Volver arriba <ArrowUp />
      </Button>
   );
}
