import { SigninForm } from "@/components/form/sign-in-form";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
   title: "Iniciar sesión",
   description: "Iniciá sesión en resu para resumir y gestionar tus videos.",
};

export default async function SignInPage() {
    const cookieStore = await cookies();
    const pendingSummary = cookieStore.get("pending_summary")?.value;

    let pendingVideoTimestamp: string | undefined;

    if (pendingSummary) {
       try {
          const data = JSON.parse(pendingSummary);

          if (data.createdAt) {
             pendingVideoTimestamp = String(data.createdAt);
          }
       } catch {
          pendingVideoTimestamp = undefined;
       }
    }

    return <SigninForm pendingVideoTimestamp={pendingVideoTimestamp} />;
}
