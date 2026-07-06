import Link from "next/link";
import { Home, Search } from "lucide-react";
import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/lib/error-handler";
import Header from "@/components/custom/header";
import { Footer } from "@/components/custom/footer";
import { cn } from "@/lib/utils";
import { BUTTON_VARIANTS, NOT_FOUND_STYLES } from "@/constants/styles";
import { AppLink } from "@/components/custom/CustomLink";

export default async function NotFound() {
   const globalDataResponse = await loaders.getGlobalData();
   const globalData = validateApiResponse(globalDataResponse, "global page");

   const { header, footer } = globalData;

   return (
      <div className="w-full h-full flex flex-1 flex-col justify-center items-center">
         <Header data={header} />

         <div className={NOT_FOUND_STYLES.container}>
            <div className={NOT_FOUND_STYLES.content}>
               {/* Large 404 Text */}
               <div className={NOT_FOUND_STYLES.textSection}>
                  <h1 className={NOT_FOUND_STYLES.heading404}>404</h1>
                  <div className={NOT_FOUND_STYLES.headingContainer}>
                     <h2 className={NOT_FOUND_STYLES.pageTitle}>
                        Página no encontrada
                     </h2>
                     <p className={NOT_FOUND_STYLES.description}>
                        ¡Ups! La página que buscas parece haberse perdido en el
                        desierto digital.
                     </p>
                  </div>
               </div>

               {/* Illustration */}
               <div className={NOT_FOUND_STYLES.illustrationContainer}>
                  <div className={NOT_FOUND_STYLES.illustration}>
                     <div className={NOT_FOUND_STYLES.searchCircle}>
                        <Search className={NOT_FOUND_STYLES.searchIcon} />
                     </div>
                     <div className={NOT_FOUND_STYLES.errorBadge}>
                        <span className={NOT_FOUND_STYLES.errorSymbol}>✕</span>
                     </div>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className={NOT_FOUND_STYLES.buttonContainer}>
                  <AppLink href="/">
                     <Home className={NOT_FOUND_STYLES.buttonIcon} />
                     <span>Ir al inicio</span>
                  </AppLink>
               </div>
            </div>
         </div>

         <Footer data={footer} />
      </div>
   );
}
