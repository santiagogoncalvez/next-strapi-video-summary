import DashboardContent from "@/components/custom/dashboard-content";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Mi cuenta",
   description: "Gestioná tu información y configuración de cuenta en resu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <DashboardContent>{children}</DashboardContent>;
}
