import { NextRequest } from "next/server";
import { services } from "@/services";
import { verifySession } from "@/lib/dal";

export const maxDuration = 20000;

export async function POST(req: NextRequest) {
   const result = await verifySession();

   if (!result.isAuth) {
      return new Response(
         JSON.stringify({ data: null, error: "Not authenticated" }),
         { status: 401 },
      );
   }

   const body = await req.json();
   const videoId = body.videoId;

   try {
      const transcriptData =
         await services.summarize.generateTranscript(videoId);
      
      // console.log("\n\nfullTranscript", transcriptData?.fullTranscript);

      if (!transcriptData?.fullTranscript) {
         throw new Error("No transcript data found");
      }

      return new Response(
         JSON.stringify({ data: transcriptData, error: null }),
      );
   } catch (error) {
      console.error("Error processing request:", error);
      if (error instanceof Error)
         return new Response(JSON.stringify({ error: error.message }));
      return new Response(JSON.stringify({ error: "Unknown error" }));
   }
}
