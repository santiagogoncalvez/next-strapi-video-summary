// import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header";
import { getHomePage } from "@/lib/strapi";

// export const metadata: Metadata = {
//    title: "RESU | Resume tus videos",
//    description: "Plataforma para resumir videos",
// };

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const strapiData = await getHomePage();

   const [heroSection] = strapiData.sections || [];
   const { link, secondaryLink } = heroSection;

   return (
      <div>
         <Header link={link} secondaryLink={secondaryLink} />
         <main className="px-8">{children}</main>
      </div>
   );
}
