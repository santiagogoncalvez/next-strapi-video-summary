// lib/media.ts

import { getStrapiURL } from "@/lib/utils";
import { StrapiMediaProps } from "@/types/strapi";
import Image from "next/image";

export function getMediaUrl(url: string | null) {
   if (!url) return null;

   // URLs absolutas
   if (
      url.startsWith("http://") ||
      url.startsWith("https://") ||
      url.startsWith("//") ||
      url.startsWith("blob:") ||
      url.startsWith("data:")
   ) {
      return url;
   }

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
