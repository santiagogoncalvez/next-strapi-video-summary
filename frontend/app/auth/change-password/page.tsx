import { ChangePassword } from "@/components/form/change-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Cambiar contraseña",
   description: "Actualizá la contraseña de tu cuenta de resu.",
};

export default function SignInPage() {
   return <ChangePassword />;
}
