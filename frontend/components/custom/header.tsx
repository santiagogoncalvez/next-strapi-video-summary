import NavBar from "./nav-bar";
import Logo from "@/components/custom/logo-page";
import { type Header } from "@/types/strapi";

interface Props {
   data?: Header | null;
}

export default async function Header({ data }: Props) {
   if (!data) return null;

   return (
      <header className="w-full border-b border-sidebar-border/50 border-b-0 flex justify-between px-8 py-4">
         <Logo logoText={data.logoText} />
         <NavBar
            link={data.ctaButton}
            secondaryLink={data.secondaryCtaButton}
         />
      </header>
   );
}
