"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Play } from "lucide-react";

interface YouTubePlayerProps {
   videoId: string;
   thumbnailUrl: string;
}

const styles = {
   container: "relative w-full aspect-video rounded-2xl overflow-hidden",
   skeletonWrapper: "absolute inset-0",
   skeleton: "w-full h-full animate-pulse",
   iconContainer: "absolute inset-0 flex items-center justify-center",
   playIcon: "w-16 h-16 text-gray-400 animate-bounce",
   iframe: "absolute inset-0 w-full h-full rounded-2xl",
};

export function YouTubePlayer({ videoId, thumbnailUrl }: YouTubePlayerProps) {
   const [isLoaded, setIsLoaded] = useState(false);

   return (
      <div
         className={styles.container}
         style={{
            backgroundImage: !isLoaded ? `url(${thumbnailUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
         }}
      >
         {!isLoaded && (
            <div className={styles.skeletonWrapper}>
               <Skeleton className={styles.skeleton} />

               <div className={styles.iconContainer}>
                  <Play className={styles.playIcon} fill="currentColor" />
               </div>
            </div>
         )}

         <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
            onLoad={() => setIsLoaded(true)}
            style={{ display: isLoaded ? "block" : "none" }}
         />
      </div>
   );
}
