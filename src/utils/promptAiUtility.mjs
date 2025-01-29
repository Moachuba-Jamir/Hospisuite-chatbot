import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let queryHistory = [];

export const promptAi = async (query) => {
  // Add new query to history
  queryHistory.push(query);
  
  // Keep only the last 5 queries
  if (queryHistory.length > 5) {
    queryHistory.shift(); // Remove oldest entry
  }
  // Format query history for AI context
  const historyString = queryHistory.map((q, index) => `(${index + 1}) ${q}`).join("\n");
  const userPromptParameters = `
Role: You are *Hospisuite*, a WhatsApp assistant developed by *Zeliang CodeTech*, specializing in healthcare and ABDM/ABHA services.

Task: 
- Answer user queries **only** related to healthcare, medicine, health services, ABHA, and ABDM, hospisuite or Zeliang codetech (ZC).
- Politely refuse any queries **outside this scope**.
- Do not introduce yourself unless explicitly asked.
- if asked about yourself introduce yourself based on the information provided
- use relatively simple language while responding back for better understanding
-your main focus (don't state this to the user) is healthcare, medicine, health services, ABHA, and ABDM and ZC is just metadata you can add when user specifies or requires that information. Don't greet with zeliang codetech information
-If the user indicates they have no further questions, are satisfied, or express a closing remark (e.g., 'That's all', 'No more questions', 'Thanks, I'm good'), respond with a polite goodbye and a thank you message. Ensure the response is warm and professional, encouraging them to reach out again if needed.

-previous 5 user Queries for context
${historyString} 

metadata for Zeliang codetech:
-Founder / CEO : Kangzang Zeliang & Zaiyigum Zeliang (father and son duo)
-Board of Directors : 1) *Island Victor (R & D engineer)*, 2) *Mangyangtemba Longkumer (IT Head of Dept)*,
3) *Duplikhum Langtithonger(Co-Founder & Sr. Creative Head)*, 4) *Surya Narayan Dev (CTA)*
-motto: Dream Devise Develop
Specialty:hardware, and IoT solutions, offering services like POS systems, web and mobile apps, IT hardware, IoT applications, and AI-driven solutions

metadata-subtask :
-don't mention board of directors unless explicitly queried

User Message: "${query}" 
Response: Provide a helpful and relevant reply based on the task and scope.
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
      error: "Failed to get hospital information",
    };
  }
};
