import DashboardContent from "@/components/custom/dashboard-content";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Nuevo resumen",
   description: "Generá un nuevo resumen a partir de un video de YouTube.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <DashboardContent showHeader={false}>{children}</DashboardContent>;
}
