"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import { cn } from "@/lib/utils";

export default function DashboardHeader({ title }: { title?: string }) {
   const pathname = usePathname();

   const pageTitle =
      title ||
      (pathname === "/dashboard"
         ? "Nuevo resumen"
         : pathname === "/dashboard/account"
           ? "Cuenta"
           : pathname === "/dashboard/summaries"
             ? "Resúmenes"
             : "");

   return (
      <header className="max-w-full w-full p-4 shadow-none border-b border-sidebar-border/50 flex justify-between items-center">
         <div className="flex gap-4 items-center min-w-0 flex-1">
            <SidebarTrigger className={cn("size-8 md:hidden flex")} />
            <h1 className="text-normal text-black font-medium whitespace-nowrap overflow-x-auto [scrollbar-none] [&::-webkit-scrollbar]:hidden">
               {pageTitle}
            </h1>
         </div>
         
         <div className="flex size-8 opacity-0"></div>
      </header>
   );
}
