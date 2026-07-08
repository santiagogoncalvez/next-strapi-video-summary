import { HERO_SECTION_STYLES } from "@/constants/styles";
import { requireSession } from "@/lib/dal";

export default async function DashboardRoute() {
   const { user } = await requireSession();

   return (
      <div className="flex flex-col items-center justify-center gap-8  ">
         <h1 className={HERO_SECTION_STYLES.heading}>¡Hola {user?.username}!</h1>
      </div>
   );
}
