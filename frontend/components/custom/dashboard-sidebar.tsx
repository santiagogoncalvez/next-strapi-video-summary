import {
   Home,
   Settings,
   Users,
   Folder,
   KeyRound,
} from "lucide-react";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "@/components/custom/logo-page";
import { LogoutForm } from "../form/log-out-form";
import Link from "next/link";
import { validateApiResponse } from "@/lib/error-handler";
import { loaders } from "@/data/loaders";

// Menú de navegación ficticio
const navigationItems = [
   { name: "Inicio", url: "/dashboard", icon: Home },
   { name: "Proyectos", url: "/projects", icon: Folder },
   { name: "Usuarios", url: "/users", icon: Users },
   { name: "Configuración", url: "/settings", icon: Settings },
];

export async function DashboardSidebar() {
   const globalDataResponse = await loaders.getGlobalData();
      const globalData = validateApiResponse(globalDataResponse, "global page");
   
      const { header } = globalData;

   return (
      <Sidebar collapsible="icon">
         {/* HEADER: Branding o Logo de la App */}
         <SidebarHeader className="flex justify-center items-center border-b">
            <Logo logoText={header.logoText} showText={false} />
         </SidebarHeader>

         {/* CONTENT: Navegación principal (scrolleable) */}
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>Seguridad</SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     <SidebarMenuItem>
                        {/* <SidebarMenuButton asChild>
                           <Link href="/auth/forgot-password">
                              <LockKeyholeOpen />
                              <span>Recuperar constraseña</span>
                           </Link>
                        </SidebarMenuButton> */}
                        <SidebarMenuButton asChild>
                           <Link href="/auth/change-password">
                              <KeyRound />
                              <span>Cambiar contraseña</span>
                           </Link>
                        </SidebarMenuButton>
                     </SidebarMenuItem>
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>

         {/* FOOTER: Botón de ayuda o usuario */}
         <SidebarFooter className="border-t">
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton>
                     <LogoutForm variant={"none"} size={"none"} />
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>

         {/* RAIL: Permite hacer click/arrastrar en el borde para colapsar en desktop */}
         <SidebarRail />
      </Sidebar>
   );
}
