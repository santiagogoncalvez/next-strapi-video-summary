import NavBar from "./nav-bar";
import Logo from "@/components/custom/logo-page";
import { type Header } from "@/types/strapi";
import { AppLink } from "./custom-link";
import { HeaderNav } from "./header-nav";

interface Props {
   data?: Header | null;
}

export default async function Header({ data }: Props) {
   if (!data) return null;

   return (
      <header className="sticky top-0 z-50 w-full border-b-0 border-sidebar-border/50 flex justify-center bg-background">
         <div className="max-w-screen-2xl w-full  flex justify-between md:px-16 px-4 py-4 ">
            <div className="w-65 flex justify-start">
               <Logo logoText={data.logoText} scrollToTop />
            </div>

            <div className="flex items-center gap-8 text-sm">
               <HeaderNav />
            </div>

            <div className="w-65 flex justify-end">
               <NavBar
                  link={data.ctaButton}
                  secondaryLink={data.secondaryCtaButton}
               />
            </div>
         </div>
      </header>
   );
}
