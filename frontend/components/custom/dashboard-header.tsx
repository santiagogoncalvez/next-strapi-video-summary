"use client";

import { usePathname } from "next/navigation";

export default function DashboardHeader() {
   const pathname = usePathname();

   return (
      <header className="max-w-full w-full p-4 rounded-lg shadow-none border border-sidebar-border/50 rounded-b-none rounded-l-none border-l-0 flex justify-between items-center">
         <h1 className="text-normal text-black font-medium">
            {pathname === "/dashboard" && "Nuevo resumen"}
            {pathname === "/dashboard/account" && "Cuenta"}
            {pathname === "/dashboard/summaries" && "Resúmenes"}
         </h1>

         <div className="flex size-8 opacity-0"></div>
      </header>
   );
}
