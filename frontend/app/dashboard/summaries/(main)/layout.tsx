import DashboardContent from "@/components/custom/dashboard-content";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Resúmenes",
   description: "Consultá y gestioná tus resúmenes de videos en resu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <DashboardContent>{children}</DashboardContent>;
}
