import DashboardHeader from "@/components/custom/dashboard-header";
import { DashboardSidebar } from "@/components/custom/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex h-screen w-full overflow-hidden">
         <SidebarProvider>
            {/* 1. El componente que acabamos de crear */}
            <DashboardSidebar />

            {/* 2. El contenedor de tu contenido principal */}
            <div className="relative flex min-h-0 flex-1 flex-col p-2 pl-0">
               {/* Botón flotante para abrir/cerrar la barra */}
               <DashboardHeader />
               <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl rounded-t-none rounded-l-none border border-sidebar-border/50 border-l-0 border-t-0">
                  <main className="flex-1 overflow-y-auto px-4 py-8">
                     {children}
                  </main>
               </div>
            </div>
         </SidebarProvider>
      </div>
   );
}
