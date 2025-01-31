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
let links = [
  "https://pmjay.gov.in", 
  "https://abha.abdm.gov.in/abha/v3/register", 
  "https://ab-hwc.nhp.gov.in"
]

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
- If the user mentions feeling unwell or health issues, respond **empathetically** and provide general advice.
- Politely refuse **off-topic** queries.
- Keep responses within 180 tokens with proper closure.
- Introduce yourself **only if asked**.
- Use **simple language** for clarity.
- Do **not** include ZC details unless user asks.
- Use warm, friendly emojis for greetings and goodbyes.
- If user indicates completion, reply with a **warm, polite goodbye**.

Link Guidelines:
- Include ONLY ONE relevant link based on the query topic and everything comes under ABDM and explain the topic in 800 characters and append the link at the end if the user wants more informtaion:
  1. For health schemes, PMJAY, insurance: ${links[0]}
  2. For ABHA/ABDM registration: ${links[1]}
  3. For Health & Wellness Centers: ${links[2]}
- Add the relevant link as a footer ONLY if the query matches the topic
- Do not provide multiple links in a single response

Topic Categories and Responses:
1. Health Insurance & Schemes:
   - Keywords: insurance, PMJAY, health schemes, coverage
   - Response: Include ${links[0]} only

2. ABHA/ABDM Registration:
   - Keywords: registration, sign up, create ABHA, ABDM account
   - Response: Include ${links[1]} only

3. Health & Wellness Centers:
   - Keywords: HWC, wellness center, health center, clinic
   - Response: Include ${links[2]} only

4. General Health Queries:
   - No links needed for general health advice or symptoms
   - Focus on empathetic response and basic guidance

Recent Queries: ${historyString}

ZC Metadata:
- CEO: Kangzang Zeliang & Zaiyigum Zeliang (father-son duo)
- Motto: *Dream Devise Develop*
- Specialty: **Hardware, IoT, POS, web/mobile apps, AI solutions**

User: "${query}"
AI Response:`;
  
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
