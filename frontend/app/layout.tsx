import type { Metadata } from "next";
import "./globals.css";
import { geistSans } from "./ui/fonts";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
   title: "RESU | Resume tus videos",
   description: "Plataforma para resumir videos",
};

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className={`${geistSans.className} h-full antialiased`}>
         <body className="min-h-full flex flex-col">
            <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>

            <Toaster />
         </body>
      </html>
   );
}
