import { NavBarLinks } from "@/lib/definitions";
import NavBar from "./nav-bar";
import Logo from "@/components/custom/logo-page";
import { Link } from "@/types/strapi";

interface Props extends NavBarLinks {
   logoText: Link;
}

export default async function Header({ link, secondaryLink, logoText }: Props) {
   return (
      <header className="w-full flex justify-between px-8 py-4">
         <Logo logoText={logoText} />
         <NavBar link={link} secondaryLink={secondaryLink} />
      </header>
   );
}
