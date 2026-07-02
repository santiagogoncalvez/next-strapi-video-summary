import NavBar from "./nav-bar";
import Logo from "@/components/custom/logo-page";
import { type Header } from "@/types/strapi";

interface Props {
   data?: Header | null;
}

export default function FallbackHeader({ data }: Props) {
   if (!data) return null;

   return (
      <header className="w-full border-b border-b-foreground/10 flex justify-between px-8 py-4">
         <Logo logoText={data.logoText} />
         <NavBar
            link={data.ctaButton}
            secondaryLink={data.secondaryCtaButton}
         />
      </header>
   );
}
