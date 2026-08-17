import DashboardHeader from "@/components/custom/dashboard-header";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";

interface DashboardContentProps {
   children: React.ReactNode;
   headerTitle?: string;
   showHeader?: boolean;
   documentId?: string;
   summaryContent?: string;
   updateIsPending?: boolean;
   thumbnailUrl?: string;
   className?: string;
}

export default function DashboardContent({
   children,
   headerTitle = "",
   documentId = "",
   summaryContent = "",
   showHeader = true,
   updateIsPending = false,
   thumbnailUrl,
   className,
}: DashboardContentProps) {
   return (
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
         {showHeader ? (
            <DashboardHeader
               title={headerTitle}
               documentId={documentId}
               summaryContent={summaryContent}
               updateIsPending={updateIsPending}
               thumbnailUrl={thumbnailUrl}
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
