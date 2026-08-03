import { getYoutubeData as getYoutubeDataProduction } from "@/services/youtube/data";

import { getYoutubeData as getYoutubeDataLocal } from "@santiagogoncalvez1/youtube-transcript-plus";

getYoutubeDataLocal("noFhUkOZ0L0").then((transcriptData) => {
   console.log("Transcript LOCAL");
   console.log(transcriptData.fullTranscript.length);
   // console.log(transcriptData.fullTranscript);
   // console.log(transcriptData);
});

getYoutubeDataProduction("noFhUkOZ0L0").then((transcriptData) => {
   console.log("Transcript PRODUCTION");
   console.log(transcriptData.fullTranscript?.length);
   // console.log(transcriptData.fullTranscript);
   // console.log(transcriptData);
});
