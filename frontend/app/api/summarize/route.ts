import { services } from "@/services";
import { getUserMeService } from "@/services/auth";
import { NextRequest } from "next/server";

export const maxDuration = 150;

export async function POST(req: NextRequest) {
   try {
      const user = await getUserMeService();

      // console.log("USER CREDITS: ", user.credits);

      if ((user.credits || 0) < 1) {
         return new Response(
            JSON.stringify({
               data: null,
               error: "Insufficient credits",
            }),
            { status: 402 },
         );
      }
   } catch {
      return new Response(
         JSON.stringify({ data: null, error: "Not authenticated" }),
         { status: 401 },
      );
   }

   const body = await req.json();
   const { fullTranscript } = body;

   if (!fullTranscript) {
      return new Response(JSON.stringify({ error: "No transcript provided" }), {
         status: 400,
      });
   }

   try {
      const summary = await services.summarize.generateSummary(fullTranscript);

      return new Response(JSON.stringify({ data: summary, error: null }));
   } catch (error) {
      console.error("Error processing request:", error);
      if (error instanceof Error)
         return new Response(JSON.stringify({ error: error.message }));
      return new Response(
         JSON.stringify({ error: "Error generating summary." }),
      );
   }
}
