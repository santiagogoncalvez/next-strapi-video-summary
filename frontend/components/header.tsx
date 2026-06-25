import { NavBarLinks } from "@/lib/definitions";
import NavBar from "./NavBar";
import Logo from "./Logo";

export default async function Header({ link, secondaryLink }: NavBarLinks) {
   return (
      <header className="w-full flex justify-between px-8 py-4">
         <Logo isHeader />
         <NavBar link={link} secondaryLink={secondaryLink} />
      </header>
   );
}
