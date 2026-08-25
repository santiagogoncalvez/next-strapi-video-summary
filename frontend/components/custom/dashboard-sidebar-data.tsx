// components/custom/dashboard-sidebar-data.tsx

import { loaders } from "@/data/loaders";
import { getUserMeService } from "@/services/auth";
import { DashboardSidebar } from "./dashboard-sidebar";

export default async function DashboardSidebarData() {
   const [user, { data: summaries }] = await Promise.all([
      getUserMeService(),
      loaders.getSummaries("", 1),
   ]);

   return (
      <DashboardSidebar
         variant="sidebar"
         className="flex"
         recentSummaries={summaries}
         user={user}
      />
   );
}
