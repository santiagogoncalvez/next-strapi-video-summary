import { createSession } from "@/lib/session";
import { getStrapiURL } from "@/lib/utils";
import { AuthResponse } from "@/types/strapi";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
   const { searchParams } = new URL(request.url);
   const accessToken = searchParams.get("access_token");

   if (!accessToken) {
      redirect("/login?error=google_auth_failed");
   }

   const url = new URL("/api/auth/google/callback", getStrapiURL());
   url.searchParams.set("access_token", accessToken);

   const response = await fetch(url);

   if (!response.ok) {
      redirect("/login?error=google_auth_failed");
   }

   const data: AuthResponse = await response.json();

   await createSession(data);

   redirect("/dashboard");
}
