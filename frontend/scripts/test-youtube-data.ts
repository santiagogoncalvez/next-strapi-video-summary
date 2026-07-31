import { getYoutubeData } from "@/services/youtube/data";

getYoutubeData("noFhUkOZ0L0").then((transcript) => {
    console.log(transcript);
});
