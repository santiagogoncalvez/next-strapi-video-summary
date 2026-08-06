"use client";

import { usePathname } from "next/navigation";

export default function DashboardHeader({ title }: { title?: string }) {
   const pathname = usePathname();

   const pageTitle =
      title === "" &&
      (pathname === "/dashboard"
         ? "Nuevo resumen"
         : pathname === "/dashboard/account"
           ? "Cuenta"
           : pathname === "/dashboard/summaries"
             ? "Resúmenes"
             : "");

   return (
      <header className="max-w-full w-full p-4 shadow-none border-b border-sidebar-border/50 flex justify-between items-center">
         <h1 className="text-normal text-black font-medium">{pageTitle}</h1>

         <div className="flex size-8 opacity-0"></div>
      </header>
   );
}
