"use client";

import { NOT_FOUND_STYLES } from "@/constants/styles";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton() {
   const router = useRouter();

   return (
      <Button asChild variant="outline" size="lg" onClick={() => router.back()}>
         <div className="flex gap-2 justify-center items-center">
            <ArrowLeft className={NOT_FOUND_STYLES.buttonIcon} />
            <span>Volver atrás</span>
         </div>
      </Button>
   );
}
