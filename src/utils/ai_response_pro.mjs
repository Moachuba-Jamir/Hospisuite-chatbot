import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_PRO_API_KEY = process.env.GEMINI_PRO_API_KEY;

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Function to call Gemini 1.5 Pro
export const callGeminiPro = async (query) => {
  try {
    if (!GEMINI_PRO_API_KEY) {
      throw new Error("GEMINI_PRO_API_KEY is missing!");
    }

    // Initialize Gemini 1.5 Pro
    const genAI = new GoogleGenerativeAI(GEMINI_PRO_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    // Start chat session
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    // Generate response
    const result = await chatSession.sendMessage(query);

    return result?.response?.text() || "No response received.";
  } catch (error) {
    console.error("Gemini 1.5 Pro Error:", error.message);
    throw new Error("Failed to process request using Gemini 1.5 Pro.");
  }
};
