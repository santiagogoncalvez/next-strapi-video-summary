// lib/media.ts

import { getStrapiURL } from "@/lib/utils";
import { StrapiMediaProps } from "@/types/strapi";
import Image from "next/image";

export function getMediaUrl(url: string | null) {
   if (!url) return null;

   // Cloudinary, URLs externas, etc.
   if (url.startsWith("http") || url.startsWith("//")) {
      return url;
   }

   // Desarrollo con uploads locales de Strapi
   return `${getStrapiURL()}${url}`;
}

export function MediaImage({
   src,
   alt,
   className,
   ...rest
}: Readonly<StrapiMediaProps>) {
   const imageUrl = getMediaUrl(src);

   if (!imageUrl) return null;

   return (
      <Image
         src={imageUrl}
         alt={alt ?? "Image"}
         className={className}
         {...rest}
         loading="eager"
      />
   );
}
