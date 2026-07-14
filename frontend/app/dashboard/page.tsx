import { HERO_SECTION_STYLES } from "@/constants/styles";
import { requireSession } from "@/lib/dal";
import { getUserMeService } from "@/services/auth";

export default async function DashboardPage() {
   await requireSession();
   const user = await getUserMeService();

   return (
      <div className="flex flex-col items-center justify-center gap-8  ">
         <h1 className={HERO_SECTION_STYLES.heading}>
            ¡Hola {user?.username}!
         </h1>
      </div>
   );
}
