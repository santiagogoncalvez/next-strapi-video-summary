import { actions } from "@/actions";
import { Button } from "./ui/button";

export function LogoutForm() {
   return (
      <form action={actions.auth.logoutUserAction}>
         <Button variant="outline" size="lg">
            Cerrar sesión
         </Button>
      </form>
   );
}
