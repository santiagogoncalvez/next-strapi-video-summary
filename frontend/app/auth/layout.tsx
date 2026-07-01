import Logo from "@/components/custom/logo-page";
import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/lib/error-handler";

export default async function AuthLayout({
   children,
}: {
   readonly children: React.ReactNode;
}) {
   const globalDataResponse = await loaders.getGlobalData();
   const globalData = validateApiResponse(globalDataResponse, "global page");

   const { header } = globalData;

   return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
         <div className="flex flex-col gap-4 justify-center items-center w-full">
            <Logo showText={false} logoText={header.logoText} />

            {children}
         </div>
      </div>
   );
}
