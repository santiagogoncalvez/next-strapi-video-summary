"use client";

import { FileText, User, Home } from "lucide-react";
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
   SidebarTrigger,
   useSidebar,
} from "@/components/ui/sidebar";
import Logo from "@/components/custom/logo-page";
import { LogoutFormSideBar } from "../form/log-out-form-slidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

// Menú de navegación ficticio
const sidebarGroups = [
   {
      label: "General",
      items: [
         {
            name: "Inicio",
            url: "/dashboard",
            icon: Home,
         },
         // {
         //    name: "Resúmenes",
         //    url: "/dashboard/summaries",
         //    icon: FileText,
         // },
         {
            name: "Cuenta",
            url: "/dashboard/account",
            icon: User,
         },
      ],
   },
];

export function DashboardSidebar() {
   const { open } = useSidebar();
   const pathname = usePathname();

   return (
      <Sidebar collapsible="icon" variant="floating" className="group">
         {/* HEADER: Branding o Logo de la App */}
         <SidebarHeader
            className={`relative flex flex-row  items-center border-b bg-white justify-between`}
         >
            <Logo
               logoText={{
                  id: 0,
                  href: "/",
                  label: "RESU",
               }}
               showText={false}
               className={`transition-opacity ${!open ? "group-hover:opacity-0" : ""}`}
            />
            <SidebarTrigger
               className={cn(
                  "transition-all duration-200 size-8",
                  open
                     ? "opacity-100"
                     : "absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100",
               )}
            />
         </SidebarHeader>

         {/* CONTENT: Navegación principal (scrolleable) */}
         <SidebarContent className="bg-white">
            {sidebarGroups.map((group) => (
               <SidebarGroup key={group.label}>
                  <SidebarGroupLabel>{group.label}</SidebarGroupLabel>

                  <SidebarGroupContent>
                     <SidebarMenu>
                        {group.items.map((item) => (
                           <SidebarMenuItem key={item.name}>
                              <SidebarMenuButton
                                 asChild
                                 isActive={item.url === pathname}
                              >
                                 <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                 </Link>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        ))}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            ))}
         </SidebarContent>

         {/* FOOTER: Botón de ayuda o usuario */}
         <SidebarFooter className="border-t bg-white">
            <SidebarMenu>
               <SidebarMenuItem>
                  <LogoutFormSideBar variant={"none"} size={"none"} />
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarFooter>

         {/* RAIL: Permite hacer click/arrastrar en el borde para colapsar en desktop */}
         <SidebarRail />
      </Sidebar>
   );
}
