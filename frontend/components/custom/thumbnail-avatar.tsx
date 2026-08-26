import { cn } from "@/lib/utils";
import Image from "next/image";
import { type VariantProps } from "class-variance-authority";
import { THUMBNAIL_AVATAR_VARIANTS } from "@/constants/styles";



interface Props extends VariantProps<typeof THUMBNAIL_AVATAR_VARIANTS> {
   src: string;
   alt: string;
   className?: string;
}

export function ThumbnailAvatar({ src, alt, size, className }: Props) {
   return (
      <Image
         src={src}
         alt={alt}
         width={1280}
         height={720}
         className={cn(THUMBNAIL_AVATAR_VARIANTS({ size }), className)}
      />
   );
}
