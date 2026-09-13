"use client";

import DashboardContent from "@/components/custom/dashboard-content";
import { ErrorContent } from "@/components/custom/error-content";

export default function ErrorPage({
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   return (
      <DashboardContent>
         <ErrorContent
            title="No se pudieron cargar los resúmenes"
            description="Se ha producido un error al cargar los resúmenes. Esto podría ser un problema temporal."
            retry={reset}
         />
      </DashboardContent>
   );
}
