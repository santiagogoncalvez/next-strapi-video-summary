import LayoutDashboard from "@/components/custom/dashboard-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: {
      template: "%s | resu",
      default: "Dashboard | resu",
   },
   description: "Gestioná tus resúmenes de videos en resu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
   return <LayoutDashboard>{children}</LayoutDashboard>;
}
