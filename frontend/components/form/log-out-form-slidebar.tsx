import { actions } from "@/actions";
import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export function LogoutFormNavUser() {
   return (
      <form action={actions.auth.logoutUserAction}>
         <DropdownMenuItem asChild>
            <button className="w-full hover:cursor-pointer">
               <LogOut />
               <span>Cerrar sesión</span>
            </button>
         </DropdownMenuItem>
      </form>
   );
}
