import Image from "next/image";

export function DashboardImageSection() {
   return (
      <section className="w-full">
         <Image
            src="/images/dashboard-section-home.png"
            alt="Dashboard de RESU"
            width={1920}
            height={1080}
            className="w-full rounded-3xl border border-sidebar-border/50"
         />
      </section>
   );
}
