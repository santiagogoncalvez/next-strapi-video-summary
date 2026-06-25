import { HERO_SECTION_STYLES } from "@/constants/styles";

export default function DashboardRoute() {
   return (
      <div className="flex flex-col items-center justify-center gap-8 min-h-screen ">
         <h1 className={HERO_SECTION_STYLES.heading}>Dashboard</h1>
      </div>
   );
}
