import { LogoutForm } from "@/components/log-out-form";
import { BUTTON_VARIANTS, HERO_SECTION_STYLES } from "@/constants/styles";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DashboardRoute() {
   return (
      <div className="flex flex-col items-center justify-center gap-8 min-h-screen ">
         <h1 className={HERO_SECTION_STYLES.heading}>Dashboard</h1>

         <div className="flex gap-4">
            <Link
               className={cn(
                  BUTTON_VARIANTS({
                     variant: "outline",
                     size: "lg",
                  }),
               )}
               href="/auth/change-password"
            >
               Cambiar contraseña
            </Link>
            
            <LogoutForm />
         </div>
      </div>
   );
}
