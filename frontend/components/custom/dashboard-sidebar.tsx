"use client";

import { User, SquarePen, FileText, LucideIcon } from "lucide-react";
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   // SidebarGroupLabel,
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
import { useEffect } from "react";

interface SidebarItem {
   name: string;
   url: string;
   icon: LucideIcon;
}

interface SidebarGroup {
   label: string;
   items: SidebarItem[];
}

// Menú de navegación ficticio
const principalSidebarGroups: SidebarGroup[] = [
   {
      label: "General",
      items: [
         {
            name: "Nuevo resumen",
            url: "/dashboard",
            icon: SquarePen,
         },
         {
            name: "Resúmenes",
            url: "/dashboard/summaries",
            icon: FileText,
         },
         {
            name: "Cuenta",
            url: "/dashboard/account",
            icon: User,
         },
      ],
   },
];

// const sidebarGroups: SidebarGroup[] = [
//    {
//       label: "General",
//       items: [],
//    },
// ];

interface Props {
   variant?: "sidebar" | "floating" | "inset";
   className?: string;
}

export function DashboardSidebar({ variant = "sidebar", className }: Props) {
   const { open, isMobile, setOpenMobile } = useSidebar();
   const pathname = usePathname();

   // Cierra el sidebar mobile cada vez que cambia la ruta
   useEffect(() => {
      if (isMobile) {
         setOpenMobile(false);
      }
   }, [pathname, isMobile, setOpenMobile]);

   return (
      <div className={cn("group", className)}>
         <Sidebar collapsible="icon" variant={variant}>
            {/* HEADER: Branding o Logo de la App */}
            <SidebarHeader
               className={`relative flex flex-row  items-center border-b-0 bg-white justify-between`}
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
            <SidebarContent className={`bg-white`}>
               {principalSidebarGroups.map((group) => (
                  <SidebarGroup
                     key={group.label}
                     className={`${open ? "" : "pb-0"}`}
                  >
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
               {/* {sidebarGroups.map((group) => (
                  <SidebarGroup
                     key={group.label}
                     className={`${open ? "" : "py-0"}`}
                  >
                     <SidebarGroupLabel
                        className={`${open ? "" : "select-none pointer-events-none"}`}
                     >
                        {group.label}
                     </SidebarGroupLabel>

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
               ))} */}
            </SidebarContent>

            {/* FOOTER: Botón de ayuda o usuario */}
            <SidebarFooter className={`border-t-0 bg-white`}>
               <SidebarMenu>
                  <SidebarMenuItem>
                     <LogoutFormSideBar />
                  </SidebarMenuItem>
               </SidebarMenu>
            </SidebarFooter>

            {/* RAIL: Permite hacer click/arrastrar en el borde para colapsar en desktop */}
            <SidebarRail />
         </Sidebar>
      </div>
   );
}
