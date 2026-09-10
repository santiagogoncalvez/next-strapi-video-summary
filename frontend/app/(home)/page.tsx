import { BenefitsSection } from "@/components/custom/benefits-section";
import { DashboardImageSection } from "@/components/custom/dashboard-image-section";
import { FeaturesSection } from "@/components/custom/features-section";
import { FinalCTASection } from "@/components/custom/final-cta-section";
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
         <div className="py-10">
            <DashboardImageSection />
         </div>
         <div id="como-funciona" className="py-10 scroll-mt-20">
            <HowItWorksSection />
         </div>

         <div id="funcionalidades" className="py-10 scroll-mt-20">
            <FeaturesSection />
         </div>

         <div id="beneficios" className="py-10 scroll-mt-20">
            <BenefitsSection />
         </div>

         <div className="py-10">
            <FinalCTASection />
         </div>
      </main>
   );
}
