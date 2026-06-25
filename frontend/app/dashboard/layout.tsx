import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider>
         {/* 1. El componente que acabamos de crear */}
         <DashboardSidebar />

         {/* 2. El contenedor de tu contenido principal */}
         <main className="flex-1 p-6">
            {/* Botón flotante para abrir/cerrar la barra */}
            <SidebarTrigger className="mb-4"/>
            {children}
         </main>
      </SidebarProvider>
   );
}
