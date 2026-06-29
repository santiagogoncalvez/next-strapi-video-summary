import { getHomePage } from "@/lib/strapi";
import { HeroSection } from "@/components/custom/hero-section";
import { FeaturesSection } from "@/components/custom/features-section";

export async function generateMetadata() {
   const strapiData = await getHomePage();
   return {
      title: strapiData?.title,
      description: strapiData?.description,
   };
}

export default async function Home() {
   const strapiData = await getHomePage();
   // console.log(strapiData);
   console.dir(strapiData, { depth: null });

   const [heroSection, featuresSection] = strapiData.sections || [];

   return (
      <div className={"container"}>
         <HeroSection data={{ ...heroSection }} />
         <FeaturesSection data={{ ...featuresSection }} />
      </div>
   );
}
