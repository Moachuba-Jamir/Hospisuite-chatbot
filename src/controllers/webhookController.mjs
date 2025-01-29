// services
import { greetingService } from "../services/greetingService.mjs";

import { healthSchemeService } from "../services/healthSchemesService.mjs";
import { abhaRegistrationService } from "../services/abhaRegistrationService.mjs";
import { pmJayInfoService } from "../services/pmjayInformationService.mjs";
import { resendOptionsService } from "../services/resendOptionsService.mjs";
import { hwcService } from "../services/hwcService.mjs";
import { getHospitalLocationService } from "../services/getHospitalLocationService.mjs";
import {sendAiResponseService} from '../services/sendAIresponse.mjs'
// utils
import { promptAi } from "../utils/promptAiUtility.mjs";

export const webhookController = async (req, res) => {
  let senderNumber = req.user.sender;
  let result;
  try {
    switch (req.state) {
      case "greeting":
        result = await greetingService(senderNumber);
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
      case "empaneled hospitals":
        result = await getHospitalLocationService(senderNumber);
        break;
      default:
        console.log("user typed a query, passing control to aiResponseService ----->");
        break;
    }

    if (req.query != "") {
      result = await promptAi(req.query);
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
