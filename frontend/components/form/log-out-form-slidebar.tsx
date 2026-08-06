import { actions } from "@/actions";
import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";

export function LogoutFormSideBar() {
   return (
      <form action={actions.auth.logoutUserAction}>
         <SidebarMenuButton>
            <LogOut />
            <span>Cerrar sesión</span>
         </SidebarMenuButton>
      </form>
   );
}
