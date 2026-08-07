import LayoutDashboard from "@/components/custom/layout-dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
   return <LayoutDashboard>{children}</LayoutDashboard>;
}
