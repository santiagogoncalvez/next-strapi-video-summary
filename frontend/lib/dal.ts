import { cookies } from "next/headers"
import { cache } from "react"
import "server-only"
import { decrypt } from "./session";
import { redirect } from "next/navigation";
import { VerifySessionResult } from "@/types/definitions";


export const verifySession = cache(async (): Promise<VerifySessionResult> => {
    const cookie = (await cookies()).get("session")?.value;

    const session = await decrypt(cookie);

    if (!session) {
        return { isAuth: false, session: null };
    }

    if (!session?.jwt) {
        redirect("/auth/login");
    }

    return { isAuth: true, session };
})