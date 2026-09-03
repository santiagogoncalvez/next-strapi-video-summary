import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getStrapiURL } from "@/lib/utils";
import { isValidProvider } from "@/lib/auth-helpers";

export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ provider: string }> },
) {
   const { provider } = await params;

   if (!isValidProvider(provider)) {
      return NextResponse.json(
         { error: "Proveedor no soportado" },
         { status: 400 },
      );
   }

   const searchParams = request.nextUrl.searchParams;
   const from = searchParams.get("from") === "signup" ? "signup" : "login";

   const cookieStore = await cookies();
   cookieStore.set("oauth_action", from, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 300, // 5 minutos de validez
      path: "/",
   });

   redirect(`${getStrapiURL()}/api/connect/${provider}`);
}
