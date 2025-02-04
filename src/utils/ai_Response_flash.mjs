  import dotenv from "dotenv";
  import { healthQueries, founder, linkGuidelines } from "./ai_prompt_roles.mjs";
  import { GoogleGenerativeAI } from "@google/generative-ai";
  dotenv.config();

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      maxOutputTokens: 180, // Ensures response stays within 1024 characters
    },
  });

  let chatHistory = [];
  // keywords regex i makes the words case-agnostic : white spaces can cause issues
let founderKeywords =/zeliang|codetech|zeliang codetech|zc|founded zeliang|founded zc|ceo zeliang/i;
let linkKeywords = /insurance|registration|health schemes|pmjay|hwcs|register/i;
  let userPrompt;

  export const callGeminiFlash = async (query) => {
    try {
      // detect what type of query it is (either health querries , ....)
      if (linkKeywords.test(query)) {
        userPrompt = linkGuidelines + query;
        console.log("query matches link keywords");
      } else if (founderKeywords.test(query)) {
        userPrompt = founder + query;
        console.log("query matches founder keywords");
      } else {
       let chatHistoryString = chatHistory
         .map((entry) => `User: ${entry.query}\nAI: ${entry.aiResponse}`)
         .join("\n");
       userPrompt = `${query}\n\nChat history:\n${chatHistoryString}\n\nYour role: ${healthQueries}`;
        console.log("query matches standard chat");
        console.log("Chat History:", JSON.stringify(chatHistory, null, 2));

      } 
      const prompt = userPrompt;
      const result = await model.generateContent(prompt);
      if (chatHistory.length > 10) {
        chatHistory.shift();
      }
      chatHistory.push({ query: query, aiResponse: result.response.text() });
      console.log(`from utility: ${result.response.text()}`);
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
