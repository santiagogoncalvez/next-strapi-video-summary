import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode, Suspense } from "react";
import DashboardSidebarData from "./dashboard-sidebar-data";
import { DashboardSidebarSkeleton } from "../skeleton/dashboard-sidebar-skeleton";
import GeneralLoading from "./genearl-loader";

export default function LayoutDashboard({ children }: { children: ReactNode }) {
   return (
      /* 1. h-screen fija el tamaño total de la pantalla. El p-2 se descuenta internamente */
      <div className="h-dvh w-full md:p-2 p-1">
         {/* 2. h-full se adapta al espacio restante sin desbordar */}
         <div className="flex h-full w-full overflow-hidden rounded-2xl border border-sidebar-border/50">
            {/* 3. Aseguramos que el Provider ocupe todo el alto y sirva de contexto relativo */}
            <SidebarProvider className="relative flex h-full w-full">
               <Suspense fallback={<DashboardSidebarSkeleton />}>
                  <DashboardSidebarData />
               </Suspense>

               <Suspense fallback={<GeneralLoading />}>{children}</Suspense>
            </SidebarProvider>
         </div>
      </div>
   );
}
