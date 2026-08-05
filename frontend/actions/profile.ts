"use server";

import { FormState } from "@/types/definitions";
import { ProfileFormSchema, ProfileImageFormSchema } from "@/validations/profile";
import {
   getSuccessFormState,
   getValidationErrorState,
   handleActionError,
} from "./helpers";
import {services} from "@/services"
import { PROFILE_MESSAGES } from "@/constants/messages/profile";

export async function updateProfileAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      bio: formData.get("bio") as string,
   };

   // console.log("updateProfileAction. fields: fields", fields);

   const validatedFields = ProfileFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await services.profile.updateProfileService(validatedFields.data);
   } catch (error) {
      return handleActionError(error, fields);
   }

   return getSuccessFormState(PROFILE_MESSAGES.SUCCESS.PROFILE_UPDATED, fields);
}


export async function updateProfileImageAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      image: formData.get("image") as File,
   };

   const validatedFields = ProfileImageFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await services.profile.updateProfileImageService(validatedFields.data.image);
   } catch (error) {
      return handleActionError(error, fields);
   }

   return getSuccessFormState(
      PROFILE_MESSAGES.SUCCESS.PROFILE_IMAGE_UPDATED,
      fields,
   );
}