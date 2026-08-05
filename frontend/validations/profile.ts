import { PROFILE_VALIDATION_MESSAGES } from "@/constants/validations/profile";
import z from "zod";

export const ProfileFormSchema = z.object({
   firstName: z
      .string()
      .min(1, PROFILE_VALIDATION_MESSAGES.FIRST_NAME.REQUIRED)
      .max(50, PROFILE_VALIDATION_MESSAGES.FIRST_NAME.MAX(50)),
   lastName: z
      .string()
      .min(1, PROFILE_VALIDATION_MESSAGES.LAST_NAME.REQUIRED)
      .max(50, PROFILE_VALIDATION_MESSAGES.LAST_NAME.MAX(50)),
   bio: z
      .string()
      .min(10, PROFILE_VALIDATION_MESSAGES.BIO.MIN(10))
      .max(500, PROFILE_VALIDATION_MESSAGES.BIO.MAX(500)),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export const ProfileImageFormSchema = z.object({
   image: z
      .instanceof(File)
      .refine(
         (file) => file.size > 0,
         PROFILE_VALIDATION_MESSAGES.IMAGE.REQUIRED,
      )
      .refine(
         (file) => file.size <= 5000000,
         PROFILE_VALIDATION_MESSAGES.IMAGE.MAX_SIZE(5),
      )
      .refine(
         (file) =>
            ["image/jpeg", "image/png", "image/webp"].includes(file.type),
         PROFILE_VALIDATION_MESSAGES.IMAGE.INVALID_FORMAT,
      ),
});

export type ProfileImageFormValues = z.infer<typeof ProfileImageFormSchema>;
