import { SummaryForm } from "@/components/form/summary-form";
import { HERO_SECTION_STYLES } from "@/constants/styles";
import { getUserMeService } from "@/services/auth";

export default async function DashboardPage() {
   const user = await getUserMeService();

   return (
      <div className="h-full flex flex-col items-center justify-center gap-8  ">
         <h1 className={HERO_SECTION_STYLES.heading}>
            ¡Hola {user?.username}!
         </h1>

         <SummaryForm />
      </div>
   );
}
