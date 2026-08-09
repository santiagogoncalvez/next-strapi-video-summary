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
         <div className="max-w-screen-2xl w-full  flex justify-between md:px-8 px-4 py-4 ">
            <Logo logoText={data.logoText} />
            <NavBar
               link={data.ctaButton}
               secondaryLink={data.secondaryCtaButton}
            />
         </div>
      </header>
   );
}
