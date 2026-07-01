// import type { Metadata } from "next";
import { loaders } from "@/data/loaders";
import "../globals.css";
import Header from "@/components/custom/header";
import { validateApiResponse } from "@/lib/error-handler";
import { Footer } from "@/components/custom/footer";

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const globalDataResponse = await loaders.getGlobalData();
   const globalData = validateApiResponse(globalDataResponse, "global page");

   const { header, footer } = globalData;

   return (
      <div>
         <Header data={header} />

         <main className="px-8">{children}</main>

         <Footer data={footer} />
      </div>
   );
}
