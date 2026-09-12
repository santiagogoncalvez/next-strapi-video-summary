import { SignupForm } from "@/components/form/sign-up-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Crear cuenta",
   description:
      "Creá tu cuenta en resu y empezá a resumir tus videos con inteligencia artificial.",
};

export default function SignUpPage() {
   return <SignupForm />;
}
