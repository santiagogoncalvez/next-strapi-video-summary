import DashboardHeader from "@/components/custom/dashboard-header";

export default function DashboardContent({
   children,
   headerTitle = "",
}: {
   children: React.ReactNode;
   headerTitle?: string;
}) {
   return (
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
         <DashboardHeader title={headerTitle} />
         <main className="flex-1 overflow-y-auto px-4 py-8 md:px-4">
            {children}
         </main>
      </div>
   );
}
