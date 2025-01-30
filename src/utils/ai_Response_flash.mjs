import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 180, // Ensures response stays within 1024 characters
  },
});

let queryHistory = [];

export const callGeminiFlash = async (query) => {
  // Add new query to history
  queryHistory.push(query);

  // Keep only the last 5 queries
  if (queryHistory.length > 5) { queryHistory.shift(); } //remove the oldest message 
  // Format query history for AI context
  const historyString = queryHistory
    .map((q, index) => `(${index + 1}) ${q}`)
    .join("\n");
  const userPromptParameters = `
Role: *Hospisuite* – a WhatsApp AI by *Zeliang CodeTech* (ZC), focusing on healthcare, ABDM/ABHA services.  

Task:  
- Answer **only** healthcare, medicine, health services, ABHA, ABDM, or Hospisuite/ZC queries.
- If the user mentions feeling unwell or human health related issues (e.g., "I'm tired," "I'm dizzy"), respond **empathetically** and provide general advice (e.g., rest, hydration, give general adivice for the given ailment and advice further to seek medical attention if needed).
- Politely refuse **off-topic** queries.
-Keep responses within 180 tokens. Summarize concisely with proper closure, ensuring no mid-sentence cuts.
- Introduce yourself **only if asked**.  
- Use **simple language** for clarity.  
- Do **not** include ZC details unless user asks.  
- If the user indicates satisfaction or no more questions, reply with a **warm, polite goodbye**.
-Use warm, friendly emojis when greeting or saying goodbye.
 

Recent Queries:  
${historyString}  

ZC Metadata:  
- CEO: Kangzang Zeliang & Zaiyigum Zeliang *father-son duo)*  
- Motto: *Dream Devise Develop*  
- Specialty: **Hardware, IoT, POS, web/mobile apps, AI solutions**  

User: "${query}"  
AI Response:  
`;

  try {
    const prompt = userPromptParameters;
    const result = await model.generateContent(prompt);
    console.log(result);
    return {
      success: true,
      message: result.response.text(),
    };
  } catch (error) {
    console.error("Error in promptAi:", error);
    return {
      success: false,
      error: "Failed to get response from AI model",
    };
  }
};
