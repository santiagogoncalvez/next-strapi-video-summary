import Link from "next/link";

interface Props {
   isHeader?: boolean;
}

export default function Logo({isHeader = false}: Props) {
   return (
      <Link className="w-fit font-medium text-3xl" href="/">
         {isHeader ? "RESU" : "R"}
      </Link>
   );
}
