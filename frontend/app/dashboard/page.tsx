import { LogoutForm } from "@/components/log-out-form";

export default function DashboardRoute() {
   return (
      <div className="flex flex-col items-center justify-center gap-8 min-h-screen bg-gray-100 dark:bg-gray-900">
         <h1 className="text-black  font-bold md:text-2xl text-xl lg:text-6xl">
            Dashboard
         </h1>

         <LogoutForm />
      </div>
   );
}
