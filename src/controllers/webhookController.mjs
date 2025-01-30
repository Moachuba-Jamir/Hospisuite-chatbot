// services
import { greetingService } from "../services/greetingService.mjs";

import { healthSchemeService } from "../services/healthSchemesService.mjs";
import { abhaRegistrationService } from "../services/abhaRegistrationService.mjs";
import { pmJayInfoService } from "../services/pmjayInformationService.mjs";
import { resendOptionsService } from "../services/resendOptionsService.mjs";
import { hwcService } from "../services/hwcService.mjs";
import { insuranceSchemes } from "../services/insuranceSchemesService.mjs";
import {sendAiResponseService} from '../services/sendAIresponse.mjs'
// utils
import { callGeminiFlash } from "../utils/ai_Response_flash.mjs";
import { callGeminiPro } from "../utils/ai_response_pro.mjs";
import { callGpt } from "../utils/ai_Response_openAi.mjs";

export const webhookController = async (req, res) => {
  let senderNumber = req.user.sender;
  let result;
  try {
    switch (req.state) {
      case "greeting":
        result = await greetingService(senderNumber);
        // callGpt();
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

    if (req.query != "") {
     try {
       result = await callGeminiFlash(req.query);
        console.log("Gemini Flash Response:", result);
      //  result = await callGeminiPro(req.query);
      //  console.log("Gemini Pro Response:", result);
     } catch (error) {
       //  console.error("Gemini Flash failed, switching to Pro:", error.message);
       console.error("Gemini Pro also failed:", error);
        result = {
          success: false,
          message: "AI response failed. Please try again later.",
        };
     }
      console.log(result);
      sendAiResponseService(senderNumber, result);
    }

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    console.error("Error in webhook controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
