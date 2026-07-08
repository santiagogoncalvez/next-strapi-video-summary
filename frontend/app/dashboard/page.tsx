import { HERO_SECTION_STYLES } from "@/constants/styles";
import { verifySession } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function DashboardRoute() {
   const result = await verifySession();

   if (!result.isAuth) {
      redirect("/auth/login");
   }

   const { user } = result.session;

   return (
      <div className="flex flex-col items-center justify-center gap-8  ">
         <h1 className={HERO_SECTION_STYLES.heading}>¡Hola {user?.username}!</h1>
      </div>
   );
}
