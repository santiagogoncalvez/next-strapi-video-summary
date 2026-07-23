"use client";

import { FileText, Home } from "lucide-react";
import { NOT_FOUND_STYLES } from "@/constants/styles";
import { AppLink } from "@/components/custom/custom-link";

export default function ErrorPage() {
   return (
      <div className="w-full h-full flex flex-1 flex-col justify-center items-center">
         <div className={NOT_FOUND_STYLES.container}>
            <div className={NOT_FOUND_STYLES.content}>
               {/* Large 404 Text */}
               <div className={NOT_FOUND_STYLES.textSection}>
                  <h1 className={NOT_FOUND_STYLES.heading404}>Error</h1>
                  <div className={NOT_FOUND_STYLES.headingContainer}>
                     <h2 className={NOT_FOUND_STYLES.pageTitle}>
                        No se pudieron cargar los resúmenes
                     </h2>
                     <p className={NOT_FOUND_STYLES.description}>
                        Se ha producido un error al cargar los resúmenes. Esto
                        podría ser un problema temporal.
                     </p>
                  </div>
               </div>

               {/* Illustration */}
               <div className={NOT_FOUND_STYLES.illustrationContainer}>
                  <div className={NOT_FOUND_STYLES.illustration}>
                     <div className={NOT_FOUND_STYLES.searchCircle}>
                        <FileText className={NOT_FOUND_STYLES.searchIcon} />
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
      </div>
   );
}
