import { getStrapiURL } from "@/lib/utils";
import { api } from "@/data/data-api";
import { StrapiResponse, Summary } from "@/types/strapi";
import { stringify } from "qs";
import { requireSession } from "@/lib/dal";
import { handleStrapiError } from "@/actions/helpers";

const STRAPI_BASE_URL = getStrapiURL();

export async function saveSummaryService(
   summaryData: Partial<Summary>,
): Promise<StrapiResponse<Summary>> {
   const { jwt } = await requireSession();

   const query = stringify({
      populate: "*",
   });

   const url = new URL("/api/summaries", STRAPI_BASE_URL);
   url.search = query;

   const payload = { data: summaryData };

   try {
      return await api.post<StrapiResponse<Summary>, typeof payload>(
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
