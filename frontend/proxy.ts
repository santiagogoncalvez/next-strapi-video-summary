import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

// 1. Especificar rutas protegidas y públicas
const protectedRoutes = ["/dashboard", "/auth/change-password"];
const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/"
];

export async function proxy(request: NextRequest) {
    // 2. Comprobar si la ruta actual es protegida o pública
    const currentPath = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(currentPath);
    const isPublicRoute = publicRoutes.includes(currentPath);

    if (!isProtectedRoute && !isPublicRoute) {
        return NextResponse.next();
    }

    try {
        // 3. Descifrar la sesión a partir de la cookie.
        const cookie = request.cookies.get("session")?.value;
        const session = await decrypt(cookie);

        if (isProtectedRoute && !session?.jwt) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        // 5. Redirigir a /dashboard si el usuario está autenticado
        if (
            isPublicRoute &&
            session?.jwt &&
            !request.nextUrl.pathname.startsWith("/dashboard")
        ) {
            return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Error verifying user authentication", error);
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
};

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};