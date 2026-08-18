import { getStrapiURL } from "@/lib/utils";
import { api } from "@/data/data-api";
import { StrapiResponse } from "@/types/strapi";
import { requireSession } from "@/lib/dal";
import { handleStrapiError } from "@/actions/helpers";

const STRAPI_BASE_URL = getStrapiURL();

export async function deleteSummaryService(
   documentId: string,
): Promise<StrapiResponse<null>> {
   const { jwt } = await requireSession();

   const url = new URL(`/api/summaries/${documentId}`, STRAPI_BASE_URL);

   try {
      return await api.delete<StrapiResponse<null>>(url.href, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}
