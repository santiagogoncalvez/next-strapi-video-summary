import { geistMono, plusJakartaSans } from "./ui/fonts";
import { Toaster } from "@/components/ui/sonner";
import { loaders } from "@/data/loaders";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export async function generateMetadata(): Promise<Metadata> {
   const metadata = await loaders.getMetaData();

   return {
      title: metadata.data.title ?? "resu | Resume tus videos",
      description:
         metadata.data.description ??
         "Resume videos de YouTube con inteligencia artificial y ahorrá tiempo.",
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
         suppressHydrationWarning
         className={`${plusJakartaSans.className} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      >
         <body className="min-h-full flex flex-col bg-background">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
               {children}

               <Toaster />
            </ThemeProvider>
         </body>
      </html>
   );
}
