import { actions } from "@/actions";
import { BUTTON_VARIANTS } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { LogOut } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import { cn } from "@/lib/utils";

export function LogoutFormSideBar({
   variant = "default",
   size = "default",
}: {
   variant?: VariantProps<typeof BUTTON_VARIANTS>["variant"];
   size?: VariantProps<typeof BUTTON_VARIANTS>["size"];
}) {
   return (
      <form action={actions.auth.logoutUserAction}>
         <SidebarMenuButton
            className={cn(
               BUTTON_VARIANTS({
                  variant: variant,
                  size: size,
                  className: "",
               }),
            )}
         >
            <div className="w-full flex gap-2 items-center justify-start">
               <LogOut />
               <span>Cerrar sesión</span>
            </div>
         </SidebarMenuButton>
      </form>
   );
}
