import { FeaturesSection } from "@/components/custom/features-section";
import { HeroSection } from "@/components/custom/hero-section";
import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import {
   FeaturesSectionProps,
   HeroSectionProps,
   StrapiSections,
} from "@/types/strapi";

function blockRenderer(section: StrapiSections, index: number) {
   switch (section.__component) {
      case "layout.hero-section":
         return <HeroSection key={index} data={section as HeroSectionProps} />;
      case "layout.features-section":
         // console.log("Sections data:", section);
         return (
            <FeaturesSection
               key={index}
               data={section as FeaturesSectionProps}
            />
         );
      default:
         return null;
   }
}

export default async function Home() {
   const { data } = await validateApiResponse(
      loaders.getHomePageData(),
      "home page",
   );

   const { sections } = data;

   return (
      <main>
         {sections.map((section, index) => blockRenderer(section, index))}
      </main>
   );
}
