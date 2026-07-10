import { api } from "@/data/data-api";
import { verifySession } from "@/lib/dal";
import { getStrapiURL } from "@/lib/utils";
import { AuthUser, UpdateProfileUser } from "@/types/strapi";

export const STRAPI_BASE_URL = getStrapiURL();

export async function updateProfileService(
   profileData: UpdateProfileUser,
): Promise<AuthUser> {
   // En una aplicación de producción, debe implementar políticas adicionales para garantizar que los usuarios solo puedan actualizar sus propios datos de perfil. Abordaremos patrones de seguridad avanzados en un tutorial posterior.
   const result = await verifySession();

   if (!result.isAuth) {
      throw new Error("You are not authorized");
   }

   const {
      jwt,
      user: { id },
   } = result.session;

   const url = `${STRAPI_BASE_URL}/api/users/${id}`;

   return api.put<AuthUser, UpdateProfileUser>(url, profileData, {
      headers: {
         Authorization: `Bearer ${jwt}`,
      },
   });
}
