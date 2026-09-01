import { SYSTEM_PROMPT } from "@/constants/prompts";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
   apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function countTokens(
   content: string,
   template?: string,
): Promise<number> {
   const systemPrompt = template || SYSTEM_PROMPT;

   const prompt = `${systemPrompt}\n\nPlease summarize this transcript:\n\n${content}`;

   const response = await ai.models.countTokens({
      model: process.env.AI_MODEL ?? "gemini-3.5-flash-lite",
      contents: prompt,
   });
    
    if (response.totalTokens === undefined) {
       throw new Error("No se pudo obtener el conteo de tokens.");
    }

   return response.totalTokens;
}
