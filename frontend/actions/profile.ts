"use server";

import { FormState } from "@/types/definitions";
import { ProfileFormSchema } from "@/validations/profile";
import {
   getSuccessFormState,
   getValidationErrorState,
   handleActionError,
} from "./helpers";
import {services} from "@/services"

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

   return getSuccessFormState("Profile updated successfully", fields);
}


export async function updateProfileImageAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      image: formData.get("image") as File,
   };

   const validatedFields = profileImageSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await services.profile.updateProfileImageService(validatedFields.data.image);
   } catch (error) {
      return handleActionError(error, fields);
   }

   return getSuccessFormState("Profile image updated successfully", fields);
}