import DashboardHeader from "@/components/custom/dashboard-header";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";

interface DashboardContentProps {
   children: React.ReactNode;
   headerTitle?: string;
   showHeader?: boolean;
}

export default function DashboardContent({
   children,
   headerTitle = "",
   showHeader = true,
}: DashboardContentProps) {
   return (
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
         {showHeader ? (
            <DashboardHeader title={headerTitle} />
         ) : (
            <SidebarTrigger
               className={cn("md:hidden flex size-8 absolute left-4 top-4")}
            />
         )}

         <main className="flex-1 overflow-y-auto px-4 py-8 md:px-4">
            {children}
         </main>
      </div>
   );
}
