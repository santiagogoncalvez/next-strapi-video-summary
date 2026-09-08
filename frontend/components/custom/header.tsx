import NavBar from "./nav-bar";
import Logo from "@/components/custom/logo-page";
import { type Header } from "@/types/strapi";

interface Props {
   data?: Header | null;
}

export default async function Header({ data }: Props) {
   if (!data) return null;

   return (
      <header className="w-full border-b-0 border-sidebar-border/50 flex justify-center">
         <div className="max-w-screen-2xl w-full  flex justify-between md:px-16 px-4 py-4 ">
            <div className="w-65 flex justify-start">
               <Logo logoText={data.logoText} />
            </div>

            <div className="flex items-center gap-8 text-sm">
               <a className="h-fit" href="#como-funciona">
                  Cómo funciona
               </a>
               <a className="h-fit" href="#detalles">
                  Detalles
               </a>
               <a className="h-fit" href="#beneficios">
                  Beneficios
               </a>
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
