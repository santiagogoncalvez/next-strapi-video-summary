import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuSkeleton,
   SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSidebarSkeleton() {
   return (
      <Sidebar collapsible="icon" variant="sidebar">
         {/* HEADER */}
         <SidebarHeader className="relative flex flex-row items-center justify-between border-b-0 bg-white">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="size-8 rounded-md" />
         </SidebarHeader>

         {/* CONTENT */}
         <SidebarContent className="bg-white">
            {/* Grupo General */}
            <SidebarGroup>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {Array.from({ length: 3 }).map((_, index) => (
                        <SidebarMenuItem key={index}>
                           <SidebarMenuSkeleton showIcon />
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>

            {/* Grupo Recientes */}
            <SidebarGroup>
               <SidebarGroupLabel>
                  <Skeleton className="h-3 w-16 rounded" />
               </SidebarGroupLabel>
               <SidebarGroupContent>
                  <SidebarMenu>
                     {Array.from({ length: 4 }).map((_, index) => (
                        <SidebarMenuItem key={index}>
                           <SidebarMenuSkeleton showIcon={false} />
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
         </SidebarContent>

         {/* FOOTER (Skeleton para NavUser) */}
         <SidebarFooter className="bg-white">
            <div className="flex items-center gap-2 p-2">
               <Skeleton className="size-8 shrink-0 rounded-lg" />
               <div className="flex flex-col gap-1.5 flex-1 group-data-[collapsible=icon]:hidden">
                  <Skeleton className="h-3.5 w-24 rounded" />
                  <Skeleton className="h-3 w-32 rounded" />
               </div>
            </div>
         </SidebarFooter>

         <SidebarRail />
      </Sidebar>
   );
}
