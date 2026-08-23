import DashboardHeader from "@/components/custom/dashboard-header";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";
import { SummaryWithFavorite } from "@/types/strapi";

interface DashboardContentProps {
   children: React.ReactNode;
   headerTitle?: string;
   summary?: SummaryWithFavorite;
   showHeader?: boolean;
   updateIsPending?: boolean;
   className?: string;
}

export default function DashboardContent({
   children,
   headerTitle = "",
   summary,
   showHeader = true,
   updateIsPending = false,
   className,
}: DashboardContentProps) {
   return (
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
         {showHeader ? (
            <DashboardHeader
               title={headerTitle}
               summary={summary}
               updateIsPending={updateIsPending}
            />
         ) : (
            <SidebarTrigger
               className={cn("md:hidden flex size-8 absolute left-4 top-4")}
            />
         )}

         <main
            className={cn(
               "flex-1 overflow-y-auto px-4 md:py-8 py-4 md:px-4",
               className,
            )}
         >
            {children}
         </main>
      </div>
   );
}
