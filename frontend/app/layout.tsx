import { geistSans, geistMono } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import { loaders } from "@/data/loaders";
import type { Metadata } from "next";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
   const metadata = await loaders.getMetaData();

   return {
      title: metadata.data.title ?? "RESU | Resume tus videos",
      description:
         metadata.data.description ?? "Plataforma para resumir videos",
   };
}

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html
         lang="en"
         className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
         <body className="min-h-full flex flex-col bg-white">
            {children}

            <Toaster />
         </body>
      </html>
   );
}
