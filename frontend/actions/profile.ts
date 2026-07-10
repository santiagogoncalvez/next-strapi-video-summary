"use server";

import { FormState } from "@/types/definitions";
import { ProfileFormSchema } from "@/validations/profile";
import {
   getSuccessFormState,
   getValidationErrorState,
   handleActionError,
} from "./helpers";
import { updateProfileService } from "@/services/profile";

export async function updateProfileAction(
   _prevState: FormState,
   formData: FormData,
): Promise<FormState> {
   const fields = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      bio: formData.get("bio") as string,
   };

   console.log("updateProfileAction. fields: fields", fields);

   const validatedFields = ProfileFormSchema.safeParse(fields);

   if (!validatedFields.success) {
      return getValidationErrorState(validatedFields.error, fields);
   }

   try {
      await updateProfileService(validatedFields.data);
   } catch (error) {
      return handleActionError(error, fields);
   }

   return getSuccessFormState("Profile updated successfully", fields);
}
