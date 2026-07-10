import DashboardHeader from "@/components/custom/dashboard-header";
import { DashboardSidebar } from "@/components/custom/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex w-full h-full">
         <SidebarProvider>
            {/* 1. El componente que acabamos de crear */}
            <DashboardSidebar />

            {/* 2. El contenedor de tu contenido principal */}
            <div className="relative flex flex-col flex-1 justify-start items-center p-2 pl-0 gap-8">
               {/* Botón flotante para abrir/cerrar la barra */}
               <DashboardHeader />
               <main className="w-full">{children}</main>
            </div>
         </SidebarProvider>
      </div>
   );
}
