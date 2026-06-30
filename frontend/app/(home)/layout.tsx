// import type { Metadata } from "next";
import { loaders } from "@/data/loaders";
import "../globals.css";
import Header from "@/components/custom/header";
import { validateApiResponse } from "@/lib/error-handler";
import { HeroSectionProps } from "@/types/strapi";
import { Suspense } from "react";

// export const metadata: Metadata = {
//    title: "RESU | Resume tus videos",
//    description: "Plataforma para resumir videos",
// };

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const globalDataResponse = await loaders.getGlobalData();
   const globalData = validateApiResponse(globalDataResponse, "global page");

   const { header } = globalData;

   return (
      <Suspense fallback={<div>Cargando...</div>}>
         <div>
            <Header
               logoText={header.logoText}
               link={header.ctaButton}
               secondaryLink={header.secondaryCtaButton}
            />

            <main className="px-8">{children}</main>
         </div>
      </Suspense>
   );
}
