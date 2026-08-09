import LayoutDashboard from "@/components/custom/dashboard-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
   return <LayoutDashboard>{children}</LayoutDashboard>;
}
