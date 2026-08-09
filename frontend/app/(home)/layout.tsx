// import type { Metadata } from "next";
import { loaders } from "@/data/loaders";
import "../globals.css";
import Header from "@/components/custom/header";
import { validateApiResponse } from "@/services/error-handler";
import { Footer } from "@/components/custom/footer";

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const globalData = await validateApiResponse(
      loaders.getGlobalData(),
      "global page",
   );

   const header = globalData?.data?.header || null;
   const footer = globalData?.data?.footer || null;

   return (
      <div className="flex flex-col justify-center items-center h-full flex-1">
         <Header data={header} />

         <main className="md:px-8 px-4 max-w-screen-2xl w-full flex flex-col justify-center items-center flex-1 min-h-full">
            {children}
         </main>

         <Footer data={footer} />
      </div>
   );
}
