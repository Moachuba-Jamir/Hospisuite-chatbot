// services
import { greetingService } from "../services/greetingService.mjs";
import { healthSchemeService } from "../services/healthSchemesService.mjs";
import { abhaRegistrationService } from "../services/abhaRegistrationService.mjs";
import { pmJayInfoService } from "../services/pmjayInformationService.mjs";
import { resendOptionsService } from "../services/resendOptionsService.mjs";
import { hwcService } from "../services/hwcService.mjs";
import { insuranceSchemes } from "../services/insuranceSchemesService.mjs";
import { sendAiResponseService } from '../services/sendAIresponse.mjs'

// utils
import { callGeminiFlash } from "../utils/ai_Response_flash.mjs";

export const webhookController = async (req, res) => {
  let senderNumber = req.user.sender;
  let senderName = req.body.customer_name;
  let result;
  try {
    switch (req.state) {
      case "greeting":
        result = await greetingService(senderNumber, senderName);
        break;
      case "health schemes":
        result = await healthSchemeService(senderNumber);
        break;
      case "more about pm-jay":
        result = await pmJayInfoService(senderNumber);
        break;
      case "more on hwcs":
        result = await hwcService(senderNumber);
        break;
      case "\u2630 menu":
        result = await resendOptionsService(senderNumber);
        break;
      case "abha registration":
        result = await abhaRegistrationService(senderNumber);
        break;
      case "insurance schemes":
        result = await insuranceSchemes(senderNumber);
        break;
      default:
        console.log("user typed a query, passing control to aiResponseService ----->");
        break;
    }

  // Prompting the AI
    if (req.query != "") {
     try {
       result = await callGeminiFlash(req.query);
        console.log("Gemini Flash Response:", result);
     } catch (error) {
       console.error("Gemini-flash failed:", error);
        result = {
          success: false,
          message: "AI response failed. Please try again later.",
        };
     }
      sendAiResponseService(senderNumber, result);
    }

    if (result.success) {
      console.log({ message: "AI response successful" });
    } else {
      console.log({ message: "AI response unsuccessful" });
    }
  } catch (error) {
    console.error("Error in webhook controller:", error);
  }
};
