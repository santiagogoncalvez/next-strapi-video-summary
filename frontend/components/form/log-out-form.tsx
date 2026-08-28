import { actions } from "@/actions";
import { Button, BUTTON_VARIANTS } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { LogOut } from "lucide-react";

export function LogoutForm({
   variant = "default",
   size = "default",
}: {
   variant?: VariantProps<typeof BUTTON_VARIANTS>["variant"];
   size?: VariantProps<typeof BUTTON_VARIANTS>["size"];
}) {
   return (
      <form action={actions.auth.logoutUserAction}>
         <Button variant={variant} size={size} className="w-full">
            <div className="w-full flex gap-2 items-center justify-start">
               <LogOut strokeWidth={1.5} />
               <span>Cerrar sesión</span>
            </div>
         </Button>
      </form>
   );
}
