"use client";

import { SquarePen, FileText, LucideIcon, Heart } from "lucide-react";
import {
   Sidebar,
   SidebarContent,
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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Summary, User } from "@/types/strapi";
import { NavUser } from "./dashboard-sidebar-nav-user";

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
            name: "Favoritos",
            url: "/dashboard/favorites",
            icon: Heart,
         },
      ],
   },
];
interface Props {
   variant?: "sidebar" | "floating" | "inset";
   recentSummaries: Summary[];
   user: User;
   className?: string;
}

export function DashboardSidebar({
   variant = "sidebar",
   recentSummaries,
   user,
   className,
}: Props) {
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
                  className={`transition-opacity ${!open ? "group-hover:opacity-0" : "pl-2"}`}
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
                                       <item.icon strokeWidth={1.5} />
                                       <span>{item.name}</span>
                                    </Link>
                                 </SidebarMenuButton>
                              </SidebarMenuItem>
                           ))}
                        </SidebarMenu>
                     </SidebarGroupContent>
                  </SidebarGroup>
               ))}

               {recentSummaries.length > 0 && (
                  <SidebarGroup className={`${open ? "" : "py-0"}`}>
                     <SidebarGroupLabel
                        className={`${open ? "" : "select-none pointer-events-none"}`}
                     >
                        Recientes
                     </SidebarGroupLabel>

                     <SidebarGroupContent className={`${open ? "" : "hidden"}`}>
                        <SidebarMenu>
                           {recentSummaries.map((summary) => {
                              const href = `/dashboard/summaries/${summary.documentId}`;
                              return (
                                 <SidebarMenuItem key={summary.documentId}>
                                    <SidebarMenuButton
                                       asChild
                                       isActive={pathname.includes(href)}
                                    >
                                       <Link href={href}>
                                          <span>{summary.title}</span>
                                       </Link>
                                    </SidebarMenuButton>
                                 </SidebarMenuItem>
                              );
                           })}
                        </SidebarMenu>
                     </SidebarGroupContent>
                  </SidebarGroup>
               )}
            </SidebarContent>

            {/* FOOTER: Botón de ayuda o usuario */}
            <NavUser user={user} isSidebarOpen={open} />

            {/* RAIL: Permite hacer click/arrastrar en el borde para colapsar en desktop */}
            <SidebarRail />
         </Sidebar>
      </div>
   );
}
