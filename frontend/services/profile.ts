import { api } from "@/data/data-api";
import { requireSession } from "@/lib/dal";
import { getStrapiURL } from "@/lib/utils";
import { AuthUser, UpdateProfileUser, User } from "@/types/strapi";
import { fileDeleteService, fileUploadService } from "./file";
import { getUserMeService } from "./auth";
import { handleStrapiError } from "@/actions/helpers";

export const STRAPI_BASE_URL = getStrapiURL();

export async function updateProfileService(
   profileData: UpdateProfileUser,
): Promise<User> {
   // En una aplicación de producción, debe implementar políticas adicionales para garantizar que los usuarios solo puedan actualizar sus propios datos de perfil. Abordaremos patrones de seguridad avanzados en un tutorial posterior.
   const result = await requireSession();

   const {
      jwt,
      user: { id },
   } = result;

   const url = `${STRAPI_BASE_URL}/api/users/${id}`;

   try {
      return await api.put<User, UpdateProfileUser>(url, profileData, {
         headers: {
            Authorization: `Bearer ${jwt}`,
         },
      });
   } catch (error) {
      handleStrapiError(error);
   }
}

export async function updateProfileImageService(file: File): Promise<AuthUser> {
   const user = await getUserMeService();

   if (user.image?.id) {
      try {
         await fileDeleteService(user.image.id);
      } catch (error) {
         console.error("Failed to delete previous image:", error);
      }
   }

   const uploadedImages = await fileUploadService(file);

   return updateProfileService({
      image: uploadedImages[0].id,
   });
}
