import { SigninForm } from "@/components/form/sign-in-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Iniciar sesión",
   description: "Iniciá sesión en resu para resumir y gestionar tus videos.",
};

export default function SignInPage() {
   return <SigninForm />;
}
