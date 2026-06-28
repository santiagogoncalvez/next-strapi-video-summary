import { getStrapiURL } from "@/lib/utils";
import { StrapiMediaProps } from "@/types/strapi";
import Image from "next/image";

export function getStrapiMedia(url: string | null) {
   const strapiURL = getStrapiURL();
   if (url == null) return null;
   if (url.startsWith("data:")) return url;
   if (url.startsWith("http") || url.startsWith("//")) return url;
   return `${strapiURL}${url}`;
}

export function StrapiImage({
   src,
   alt,
   className,
   ...rest
}: Readonly<StrapiMediaProps>) {
   const imageUrl = getStrapiMedia(src);
   if (!imageUrl) return null;
   return (
      <Image
         src={imageUrl}
         alt={alt ?? "No alternative text provided"}
         className={className}
         {...rest}
      />
   );
}
