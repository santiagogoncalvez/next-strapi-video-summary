import { cn } from "@/lib/utils";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";

const THUMBNAIL_AVATAR_VARIANTS = cva("aspect-video rounded-sm object-cover", {
   variants: {
      size: {
         xs: "h-4 w-auto",
         sm: "h-6 w-auto",
         default: "h-8 w-auto",
         md: "h-10 w-auto",
         lg: "h-12 w-auto",
      },
   },
   defaultVariants: {
      size: "default",
   },
});

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
