// services/youtube/index.ts

import { getYoutubeData as getYoutubeDataLocal } from "@santiagogoncalvez1/youtube-transcript-plus";
import { getYoutubeData as getYoutubeDataProduction } from "./data";

export const getYoutubeData =
   process.env.NODE_ENV === "production"
      ? getYoutubeDataProduction
      : getYoutubeDataLocal;
