import { DashboardImageSection } from "@/components/custom/dashboard-image-section";
import { HeroSection } from "@/components/custom/hero-section";
import { HowItWorksSection } from "@/components/custom/howIt-works-section";
import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/services/error-handler";
import { HeroSectionProps, StrapiSections } from "@/types/strapi";

function blockRenderer(section: StrapiSections, index: number) {
   switch (section.__component) {
      case "layout.hero-section":
         return <HeroSection key={index} data={section as HeroSectionProps} />;
      default:
         return null;
   }
}

export default async function HomePage() {
   const { data } = await validateApiResponse(
      loaders.getHomePageData(),
      "home page",
   );

   const { sections } = data;

   return (
      <main className="w-full">
         {sections.map((section, index) => blockRenderer(section, index))}
         <div className="py-16">
            <DashboardImageSection />
         </div>
         <div className="py-16">
            <HowItWorksSection />
         </div>
      </main>
   );
}
