import { HERO_SECTION_STYLES } from "@/constants/styles";
import { verifySession } from "@/lib/dal";

export default async function DashboardRoute() {
   const { session: { user } }: any = await verifySession();

   return (
      <div className="flex flex-col items-center justify-center gap-8 min-h-screen ">
         <h1 className={HERO_SECTION_STYLES.heading}>¡Hola {user?.username}!</h1>
      </div>
   );
}
