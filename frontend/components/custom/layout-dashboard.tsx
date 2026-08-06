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
      <div className="h-screen w-full p-2">
         {/* 2. h-full se adapta al espacio restante sin desbordar */}
         <div className="flex h-full w-full overflow-hidden rounded-2xl border border-sidebar-border/50">
            {/* 3. Aseguramos que el Provider ocupe todo el alto y sirva de contexto relativo */}
            <SidebarProvider className="relative flex h-full w-full">
               <DashboardSidebar />

               {/* Contenido principal */}
               <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                  <DashboardHeader title={headerTitle} />
                  <main className="flex-1 overflow-y-auto px-4 py-8 md:px-4">
                     {children}
                  </main>
               </div>
            </SidebarProvider>
         </div>
      </div>
   );
}
