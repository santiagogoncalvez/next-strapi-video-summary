import "./globals.css";
import { geistSans } from "./ui/fonts";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";
import { validateApiResponse } from "@/lib/error-handler";
import { loaders } from "@/data/loaders";

export async function generateMetadata() {
   const globalDataResponse = await loaders.getGlobalData();
   const globalData = validateApiResponse(globalDataResponse, "global page");
   return {
      title: globalData?.title,
      description: globalData?.description,
   };
}

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const globalDataResponse = await loaders.getGlobalData();
   const globalData = validateApiResponse(globalDataResponse, "global page");
   console.dir(globalData, { depth: null });

   return (
      <html lang="en" className={`${geistSans.className} h-full antialiased`}>
         <body className="min-h-full flex flex-col">
            <Suspense fallback={<div>Cargando...</div>}>{children}</Suspense>

            <Toaster />
         </body>
      </html>
   );
}
