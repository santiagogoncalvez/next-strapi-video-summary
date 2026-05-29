import { getStrapiData } from "@/lib/strapi";
import { inter } from "./ui/fonts";

export default async function Home() {
   const strapiData = await getStrapiData(
      "/api/home-page?populate[sections][on][layout.hero-section][populate][image][fields][0]=url&populate[sections][on][layout.hero-section][populate][link][populate]",
   );
   console.log(strapiData);

   const { title, description } = strapiData.data || {};

   return (
      <main className={`${inter.className} antialiased container mx-auto py-6`}>
         <h1 className="text-3xl font-bold">{title}</h1>
         <p className="text-gary-600"> {description} </p>
      </main>
   );
}
