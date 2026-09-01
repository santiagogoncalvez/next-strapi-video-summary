// generate-summary.ts

import { SYSTEM_PROMPT } from "@/constants/prompts";
import { google } from "@ai-sdk/google"; // Importamos el provider de Google
import { generateText } from "ai";
import { handleGroqError } from "../error-handler";

export async function generateSummary(content: string, template?: string) {
   const systemPrompt = template || SYSTEM_PROMPT;

   try {
      const { text } = await generateText({
         model: google(process.env.AI_MODEL ?? "gemini-3.5-flash-lite"),
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
      handleGroqError(error);
   }
}
