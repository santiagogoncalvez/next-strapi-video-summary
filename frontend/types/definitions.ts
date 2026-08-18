import { ZodErrors } from "@/validations/auth";
import { SessionPayload, StrapiErrors } from "./strapi";

export interface NavBarLinks {
   link: { href: string; label: string };
   secondaryLink: { href: string; label: string };
}

export type Credentials = {
   username?: string;
   email?: string;
   identifier?: string;
   currentPassword?: string;
   password?: string;
   confirmPassword?: string;
   newPassword?: string;
   code?: string;
   passwordConfirmation?: string;
   firstName?: string;
   lastName?: string;
   bio?: string;
   image?: File;
   videoId?: string;
   documentId?: string;
   title?: string;
   content?: string;
};

export type VerifySessionResult =
   | {
        isAuth: true;
        session: SessionPayload;
     }
   | {
        isAuth: false;
        session: null;
     };

export type FormState = {
   success?: boolean;
   message?: string;
   data?: Credentials;
   strapiErrors?: StrapiErrors;
   zodErrors?: ZodErrors;
   timestamp?: number;
};

export interface GroqError {
   statusCode?: number;
   data?: {
      error?: {
         message?: string;
         type?: string;
         code?: string;
      };
   };
}

export function isGroqError(value: unknown): value is GroqError {
   return (
      typeof value === "object" &&
      value !== null &&
      ("statusCode" in value || "data" in value)
   );
}