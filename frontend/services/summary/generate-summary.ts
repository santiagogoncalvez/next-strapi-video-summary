// generate-summary.ts

import { SUMMARY_MESSAGES } from "@/constants/messages/summary";
import { SYSTEM_PROMPT } from "@/constants/prompts";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

export async function generateSummary(content: string, template?: string) {
   const systemPrompt = template || SYSTEM_PROMPT;

   try {
      const { text } = await generateText({
         model: groq(process.env.AI_MODEL ?? "llama-3.3-70b-versatile"),
         system: systemPrompt,
         prompt: `Please summarize this transcript:\n\n${content}`,
         temperature: process.env.AI_TEMPERATURE
            ? parseFloat(process.env.AI_TEMPERATURE)
            : 0.7,
         maxOutputTokens: process.env.AI_MAX_TOKENS
            ? parseInt(process.env.AI_MAX_TOKENS)
            : 4000,
      });

      return text;
   } catch (error) {
      console.error("Error generating summary:", error);

      if (error instanceof Error) {
         throw new Error(error.message);
      }

      throw new Error(SUMMARY_MESSAGES.ERROR.GENERATION_FAILED);
   }
}
