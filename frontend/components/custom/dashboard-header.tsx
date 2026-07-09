"use client";

import { usePathname } from "next/navigation";

export default function DashboardHeader() {
   const pathname = usePathname();

   return (
      <header className="max-w-full w-full py-2 px-4 rounded-lg shadow-xs ring ring-sidebar-border/50 flex justify-between items-center">
         <h1 className="text-normal text-black font-medium">
            {pathname === "/dashboard" && "Inicio"}
            {pathname === "/dashboard/account" && "Cuenta"}
         </h1>

         <div className="flex size-8 opacity-0"></div>
      </header>
   );
}
