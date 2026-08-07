import DashboardHeader from "@/components/custom/dashboard-header";
import { DashboardSidebar } from "@/components/custom/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function LayoutDashboard({
   children,
   headerTitle = "",
}: {
   children: React.ReactNode;
   headerTitle?: string;
}) {
   return (
      /* 1. h-screen fija el tamaño total de la pantalla. El p-2 se descuenta internamente */
      <div className="h-dvh w-full md:p-2 p-1">
         {/* 2. h-full se adapta al espacio restante sin desbordar */}
         <div className="flex h-full w-full overflow-hidden rounded-2xl border border-sidebar-border/50">
            {/* 3. Aseguramos que el Provider ocupe todo el alto y sirva de contexto relativo */}
            <SidebarProvider className="relative flex h-full w-full">
               <DashboardSidebar variant="sidebar" className="md:flex hidden" />
               <DashboardSidebar
                  variant="floating"
                  className="md:hidden flex"
               />

               {children}
            </SidebarProvider>
         </div>
      </div>
   );
}
