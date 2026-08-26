import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   SidebarFooter,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar";
import { User } from "@/types/strapi";
import { ChevronsUpDown, User as UserIcon } from "lucide-react";
import { LogoutFormNavUser } from "../form/log-out-form-slidebar";
import Link from "next/link";
import { getMediaUrl } from "./media-image";

interface NavUserProps {
   user: User;
   isSidebarOpen: boolean;
   isSidebarMobile: boolean;
}

export function NavUser({
   user,
   isSidebarOpen,
   isSidebarMobile,
}: NavUserProps) {
   const profileImageSrc = getMediaUrl(user.image?.url ?? "");

   return (
      <SidebarFooter className="border-t-0 bg-white">
         <SidebarMenu>
            <SidebarMenuItem>
               <DropdownMenu>
                  {/* BOTÓN TRIGGER DEL SIDEBAR */}
                  <DropdownMenuTrigger asChild>
                     <SidebarMenuButton
                        size="lg"
                        className={`data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground ${isSidebarOpen ? "" : "rounded-full"}`}
                     >
                        <Avatar className="h-8 w-8 rounded-full">
                           {user.image && profileImageSrc ? (
                              <AvatarImage
                                 src={profileImageSrc}
                                 alt={user.image.alternativeText || ""}
                              />
                           ) : (
                              <AvatarFallback className="rounded-full">
                                 {user.username.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                           )}
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                           <span className="truncate font-semibold">
                              {user.username}
                           </span>
                           <span className="truncate text-xs text-muted-foreground">
                              {user.email}
                           </span>
                        </div>
                        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
                     </SidebarMenuButton>
                  </DropdownMenuTrigger>

                  {/* POPUP / DROPDOWN */}
                  <DropdownMenuContent
                     side="bottom"
                     align="start"
                     sideOffset={4}
                     className="w-[calc(17rem-2rem)] min-w-56"
                  >
                     {/* HEADER DEL POPUP */}
                     <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm">
                           <Avatar className="h-8 w-8 rounded-full">
                              {user.image && profileImageSrc ? (
                                 <AvatarImage
                                    src={profileImageSrc}
                                    alt={user.image.alternativeText || ""}
                                 />
                              ) : (
                                 <AvatarFallback className="rounded-full">
                                    {user.username.slice(0, 2).toUpperCase()}
                                 </AvatarFallback>
                              )}
                           </Avatar>
                           <div className="grid flex-1 text-left text-sm leading-tight">
                              <span className="truncate font-semibold">
                                 {user.username}
                              </span>
                              <span className="truncate text-xs text-muted-foreground">
                                 {user.email}
                              </span>
                           </div>
                        </div>
                     </DropdownMenuLabel>

                     <DropdownMenuSeparator className="bg-transparent" />

                     {/* CONTENIDO DEL POPUP */}
                     <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                           <Link
                              href="/dashboard/account"
                              className="hover:cursor-pointer"
                           >
                              <UserIcon />
                              <span>Cuenta</span>
                           </Link>
                        </DropdownMenuItem>
                     </DropdownMenuGroup>

                     <DropdownMenuSeparator className="bg-transparent" />

                     {/* FOOTER DEL POPUP (CERRAR SESIÓN) */}
                     <LogoutFormNavUser />
                  </DropdownMenuContent>
               </DropdownMenu>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
   );
}
