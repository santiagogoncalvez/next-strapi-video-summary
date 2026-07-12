import { api } from "@/data/data-api";
import { requireSession } from "@/lib/dal";
import { getStrapiURL } from "@/lib/utils";
import { FileUploadResponse } from "@/types/strapi";

const STRAPI_BASE_URL = getStrapiURL();

export async function fileUploadService(
   file: File,
): Promise<FileUploadResponse[]> {
   const { jwt } = await requireSession();

   const formData = new FormData();
   formData.append("files", file);

   const url = `${STRAPI_BASE_URL}/api/upload`;

   return api.post<FileUploadResponse[], FormData>(url, formData, {
      headers: {
         Authorization: `Bearer ${jwt}`,
      },
   });
}

export async function fileDeleteService(fileId: number): Promise<void> {
   const { jwt } = await requireSession();

   const url = `${STRAPI_BASE_URL}/api/upload/files/${fileId}`;

   return api.delete<void>(url, {
      headers: {
         Authorization: `Bearer ${jwt}`,
      },
   });
}
