import { JWTPayload } from "jose";

export interface StrapiHeroSection {
   heading: string;
   subHeading: string;
   link: { href: string; label: string };
   secondaryLink: { href: string; label: string };
   image: { url: string; alternativeText: string };
}

export interface BaseParams {
   [key: string]: string | string[] | undefined;
}

export interface RouteParams extends BaseParams {
   documentId?: string;
}

export type Params = Promise<RouteParams>;
export type SearchParams = Promise<BaseParams>;

export type Image = {
   id: number;
   documentId: string;
   url: string;
   alternativeText: string | null;
};

export type Link = {
   id: number;
   href: string;
   label: string;
   isExternal?: boolean;
};

export type Feature = {
   id: number;
   heading: string;
   subHeading: string;
   icon: string;
};

export type HomePage = {
   documentId: string;
   title: string;
   description: string;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
   sections: StrapiSections[]; // we will change this soon
};

export type Header = {
   logoText: Link;
   ctaButton: Link;
   secondaryCtaButton: Link;
};

export type Footer = {
   logoText: Link;
   text: string;
   socialLink: Link[];
};

export type Global = {
   documentId: string;
   title: string;
   description: string;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
   header: Header;
   footer: Footer;
};

export type MetaData = {
   documentId: string;
   title: string;
   description: string;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
};

export type Summary = {
   documentId: string;
   videoId: string;
   userId: string;
   title: string;
   content: string;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
};

export type AuthUser = {
   id: number;
   documentId: string;
   username: string;
   email: string;
   firstName?: string;
   lastName?: string;
   bio?: string;
   credits?: number;
   provider: string;
   confirmed: boolean;
   blocked: boolean;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
};

export interface StrapiError {
   status: number;
   name: string;
   message: string;
   details?: Record<string, string[]>;
}

export type StrapiErrors = StrapiError | null;

export type StrapiResponse<T = null> = {
   data: T;
   error?: StrapiError;
   meta?: {
      pagination: {
         page: number;
         pageSize: number;
         pageCount: number;
         total: number;
      };
   };
};

export interface HeroSectionProps {
   id: number;
   documentId: string;
   __component: string;
   heading: string;
   subHeading: string;
   image: Image;
   link: Link;
   secondaryLink: Link;
}

export interface FeaturesSectionProps {
   id: number;
   __component: string;
   title: string;
   description: string;
   features?: Feature[] | null;
}

export type StrapiSections = HeroSectionProps | FeaturesSectionProps;

export interface StrapiMediaProps {
   src: string;
   alt: string | null;
   height?: number;
   width?: number;
   className?: string;
   fill?: boolean;
   priority?: boolean;
}

export type RegisterUser = {
   username: string;
   password: string;
   email: string;
};

export type LoginUser = {
   identifier: string;
   password: string;
};

export type ConfirmEmail = {
   email: string;
};

export type ForgotPassword = {
   email: string;
};

export type ResetPasswordUser = {
   code: string;
   password: string;
   confirmPassword: string;
};

export type ResetPasswordUserStrapi = {
   code: string;
   password: string;
   passwordConfirmation: string;
};

export type ChangePasswordUserStrapi = {
   currentPassword: string;
   password: string;
   passwordConfirmation: string;
};

export type ChangePasswordUser = {
   password: string;
   newPassword: string;
   confirmPassword: string;
};

export type UpdateProfileUser = {
   firstName: string;
   lastName: string;
   bio: string;
};

export type Jwt = string;

export interface AuthResponse {
   jwt: Jwt;
   user: AuthUser;
}

export type AuthServiceResponse = AuthResponse | StrapiResponse<null>;

export function isStrapiError(value: unknown): value is StrapiResponse<null> {
   return (
      typeof value === "object" &&
      value !== null &&
      "error" in value &&
      typeof value.error === "object" &&
      value.error !== null &&
      "message" in value.error
   );
}

export function isAuthSuccess(
   response: AuthServiceResponse,
): response is AuthResponse {
   return "jwt" in response;
}

export interface SessionPayload extends JWTPayload {
   jwt: string;
   user: AuthUser;
}

export type UpdateProfile = {
   firstName?: string;
   lastName?: string;
   bio?: string;
   image?: number;
};

export type FileUploadResponse = {
   id: number;
   documentId: string;
   name: string;
   alternativeText: string | null;
   caption: string | null;
   width: number;
   height: number;
   formats: Record<string, ImageFormat> | null;
   hash: string;
   ext: string;
   mime: string;
   size: number;
   url: string;
   previewUrl: string | null;
   provider: string;
   provider_metadata: Record<string, unknown> | null;
   createdAt: string;
   updatedAt: string;
   publishedAt: string;
};

export type ImageFormat = {
   name: string;
   hash: string;
   ext: string;
   mime: string;
   path: string | null;
   width: number;
   height: number;
   size: number;
   sizeInBytes: number;
   url: string;
};