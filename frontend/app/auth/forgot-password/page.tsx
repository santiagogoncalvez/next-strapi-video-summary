import ForgotPassword from "@/components/form/forgot-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Recuperar contraseña",
   description: "Recuperá el acceso a tu cuenta de resu.",
};

export default async function ForgotPasswordPage() {
   return <ForgotPassword />;
}
