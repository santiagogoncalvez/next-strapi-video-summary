import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { createSession } from "@/lib/session";
import { getStrapiURL } from "@/lib/utils";
import { isValidProvider, redirectToAuth } from "@/lib/auth-helpers";
import { AuthResponse } from "@/types/strapi";

export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ provider: string }> },
) {
   const { provider } = await params;

   if (!isValidProvider(provider)) {
      redirect("/auth/login?error=invalid_provider");
   }

   const { searchParams } = new URL(request.url);
   const cookieStore = await cookies();

   // Leer y limpiar la cookie temporal inmediatamente
   const actionCookie = cookieStore.get("oauth_action")?.value;
   const action: "login" | "signup" =
      actionCookie === "signup" ? "signup" : "login";
   cookieStore.delete("oauth_action");

   const accessToken = searchParams.get("access_token");
   const error = searchParams.get("error");

   if (error || !accessToken) {
      redirectToAuth(request, action, error ?? "unknown_error", provider);
   }

   const url = new URL(`/api/auth/${provider}/callback`, getStrapiURL());
   url.searchParams.set("access_token", accessToken!);

   const response = await fetch(url);

   if (!response.ok) {
      const errorData = await response.json();
      const message = errorData.error?.message ?? "";

      if (message === "Email is already taken.") {
         redirectToAuth(request, action, "email_already_taken", provider);
      }

      redirectToAuth(request, action, "unknown_error", provider);
   }

   const data: AuthResponse = await response.json();

   await createSession(data);

   redirect("/dashboard");
}
