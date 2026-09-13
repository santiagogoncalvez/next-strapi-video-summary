import { loaders } from "@/data/loaders";
import { validateApiResponse } from "@/services/error-handler";
import Header from "@/components/custom/header";
import { Footer } from "@/components/custom/footer";
import { ErrorContent } from "@/components/custom/error-content";

export default async function NotFound() {
   const { data } = await validateApiResponse(
      loaders.getGlobalData(),
      "global page",
   );

   const { header, footer } = data;

   return (
      <div className="flex min-h-full flex-1 flex-col">
         <Header data={header} />

         <ErrorContent
            title="Página no encontrada"
            description="La página que estás buscando no existe o fue movida."
         />

         <Footer data={footer} />
      </div>
   );
}
