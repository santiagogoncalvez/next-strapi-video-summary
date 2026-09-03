import { redirect } from "next/navigation";

export const ALLOWED_PROVIDERS = ["github", "google"] as const;
export type OAuthProvider = (typeof ALLOWED_PROVIDERS)[number];

export function isValidProvider(provider: string): provider is OAuthProvider {
   return ALLOWED_PROVIDERS.includes(provider as OAuthProvider);
}

export function redirectToAuth(
   request: Request,
   action: "login" | "signup",
   error: string,
   provider: string,
) {
   const path = action === "signup" ? "/auth/signup" : "/auth/login";
   const url = new URL(path, request.url);

   url.searchParams.set("error", error);
   url.searchParams.set("provider", provider);

   redirect(url.pathname + url.search);
}
