import { getStrapiURL } from "@/lib/utils";
import { api } from "@/data/data-api";
import { StrapiResponse } from "@/types/strapi";
import { requireSession } from "@/lib/dal";
import { handleStrapiError } from "@/actions/helpers";

const STRAPI_BASE_URL = getStrapiURL();

export async function addFavoriteSummaryService(
   summaryDocumentId: string,
): Promise<StrapiResponse<null>> {
   const { jwt } = await requireSession();

   const url = new URL("/api/favorites", STRAPI_BASE_URL);

   const payload = {
      data: {
         summaryId: summaryDocumentId,
      },
   };

   try {
      return await api.post<StrapiResponse<null>, typeof payload>(
         url.href,
         payload,
         {
            headers: {
               Authorization: `Bearer ${jwt}`,
            },
         },
      );
   } catch (error) {
      handleStrapiError(error);
   }
}
