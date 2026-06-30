import { Feature, FeaturesSectionProps } from "@/types/strapi";
import { CheckIcon, ClockIcon, CloudIcon } from "../icons/features";
import { FEATURES_SECTION_STYLES } from "@/constants/styles";


function getIcon(name: string) {
   switch (name) {
      case "CLOCK_ICON":
         return <ClockIcon className="w-12 h-12 mb-4 text-gray-900" />;
      case "CHECK_ICON":
         return <CheckIcon className="w-12 h-12 mb-4 text-gray-900" />;
      case "CLOUD_ICON":
         return <CloudIcon className="w-12 h-12 mb-4 text-gray-900" />;
      default:
         return null;
   }
}

export function FeaturesSection({ data }: { data: FeaturesSectionProps }) {
   if (!data?.features) return null;
   return (
      <div>
         <div className={FEATURES_SECTION_STYLES.container}>
            <section className={FEATURES_SECTION_STYLES.section}>
               <div className={FEATURES_SECTION_STYLES.grid}>
                  {data.features.map((item: Feature) => (
                     <div className={FEATURES_SECTION_STYLES.featureCard} key={item.id}>
                        {getIcon(item.icon)}
                        <h2 className={FEATURES_SECTION_STYLES.heading}>{item.heading}</h2>
                        <p className={FEATURES_SECTION_STYLES.description}>{item.subHeading}</p>
                     </div>
                  ))}
               </div>
            </section>
         </div>
      </div>
   );
}

