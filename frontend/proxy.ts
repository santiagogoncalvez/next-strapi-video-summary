import { NextRequest, NextResponse } from "next/server";
import { STRAPI_BASE_URL } from "./lib/strapi";

const protectedRoutes = ["/dashboard"];
const authRoutes = [
    "/auth/login",
    "/auth/signup",
];

export async function proxy(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;

    const isProtectedRoute = protectedRoutes.includes(currentPath);
    const isAuthRoute = authRoutes.includes(currentPath);

    if (!isProtectedRoute && !isAuthRoute) {
        return NextResponse.next();
    }// Se deja pasar.

    // La ruta requiere una validación de autenticación.
    try {
        // 1. Validar si el usuario tiene el token (jwt)
        // 2. Si el usuario está en la base de datos
        // 3. Si el usuaro está activo (Bloqueado?)

        const jwt = request.cookies.get("jwt")?.value;

        if (isProtectedRoute && !jwt) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }

        if (isAuthRoute) {
            if (jwt) {
                return NextResponse.redirect(new URL("/dashboard", request.url));
            }

            return NextResponse.next();
        }

        const response = await fetch(`${STRAPI_BASE_URL}/api/users/me`, {
            headers: {
                "Authorization": `Bearer ${jwt}`,
            }
        });

        if (!response.ok) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
        // console.log(userResponse);


        // Todo fue bien. Entonces se le permite ingresar.
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