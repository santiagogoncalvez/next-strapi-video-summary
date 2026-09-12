import DashboardContent from "@/components/custom/dashboard-content";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Favoritos",
   description: "Accedé a tus resúmenes de videos favoritos en resu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <DashboardContent>{children}</DashboardContent>;
}
