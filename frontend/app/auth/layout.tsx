import Logo from "@/components/custom/logo-page";
import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/services/error-handler";

export default async function AuthLayout({
   children,
}: {
   readonly children: React.ReactNode;
}) {
   const { data } = await validateApiResponse(
      loaders.getGlobalData(),
      "global page",
   );

   const { header } = data;

   return (
      <div className="flex flex-col items-center justify-center min-h-dvh">
         <div className="flex flex-col gap-4 justify-center items-center w-full md:px-0 px-4 py-8">
            <Logo showText={false} logoText={header.logoText} />

            {children}
         </div>
      </div>
   );
}
