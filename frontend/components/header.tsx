import { NavBarLinks } from "@/lib/definitions";
import NavBar from "./NavBar";
import Link from "next/link";

export default async function Header({ link, secondaryLink }: NavBarLinks) {
   return (
      <header className="w-full flex justify-between px-8 py-4">
         <Link className="font-medium text-4xl" href="/">
            R
         </Link>
         <NavBar link={link} secondaryLink={secondaryLink} />
      </header>
   );
}
