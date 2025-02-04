  // services
  import { greetingService } from "../services/greetingService.mjs";
  import { healthSchemeService } from "../services/healthSchemesService.mjs";
  import { abhaRegistrationService } from "../services/abhaRegistrationService.mjs";
  import { pmJayInfoService } from "../services/pmjayInformationService.mjs";
  import { resendOptionsService } from "../services/resendOptionsService.mjs";
  import { hwcService } from "../services/hwcService.mjs";
  import { insuranceSchemes } from "../services/insuranceSchemesService.mjs";
  import { sendAiResponseService } from "../services/sendAIresponse.mjs";
  import { HealthAndInsuranceService } from "../services/healthAndInsuranceService.mjs";
  import { stateSelectionService } from "../services/stateSelectionService.mjs";
  import { districtSelectionService } from "../services/districtSelectionService.mjs";
  import { listOfDistrictHospitals } from "../services/listOfDistrictHospitalsService.mjs";

  // utils
  import { callGeminiFlash } from "../utils/ai_Response_flash.mjs";

  // Service router map with O(1) lookup time
  const serviceRouterforButtons = {
    greeting: greetingService,
    "health schemes": healthSchemeService,
    "more about pm-jay": pmJayInfoService,
    "more on hwcs": hwcService,
    "\u2630 menu": resendOptionsService,
    "abha registration": abhaRegistrationService,
    "insurance schemes": insuranceSchemes,
    "health & insurance": HealthAndInsuranceService,
    "empaneled hospitals": stateSelectionService,
    "select state": stateSelectionService,
  };

  const serviceRouterforStateLists = {
    "nagaland": districtSelectionService,
  };
  // const serviceRouterforDistrictLists = {
  //   "dimapur": listOfDistrictHospitals,
  //   "kohima": listOfDistrictHospitals,
  //   "mokokchung": listOfDistrictHospitals,
  //   "phek": listOfDistrictHospitals,
  //   "peren": listOfDistrictHospitals,
  //   "mon": listOfDistrictHospitals,
  //   "tuensang": listOfDistrictHospitals,
  //   "chumoukedima": listOfDistrictHospitals,
  //   "zunheboto": listOfDistrictHospitals,
  //   "wokha": listOfDistrictHospitals,
  // };

  export const webhookController = async (req, res) => {
    let senderNumber = req.user.sender;
    let senderName = req.body.customer_name;
    let userMessage = req.userMsg;
    let locationType = req?.locationType; 
    let location = req?.location; 
    let result =null;
    try {
      // switch (req.state) {
      //   case "greeting":
      //     result = await greetingService(senderNumber, senderName);
      //     break;
      //   case "health schemes":
      //     result = await healthSchemeService(senderNumber);
      //     break;
      //   case "more about pm-jay":
      //     result = await pmJayInfoService(senderNumber);
      //     break;
      //   case "more on hwcs":
      //     result = await hwcService(senderNumber);
      //     break;
      //   case "\u2630 menu":
      //     result = await resendOptionsService(senderNumber);
      //     break;
      //   case "abha registration":
      //     result = await abhaRegistrationService(senderNumber);
      //     break;
      //   case "insurance schemes":
      //     result = await insuranceSchemes(senderNumber);
      //     break;
      //   case "health & insurance":
      //     result = await HealthAndInsuranceService(senderNumber);
      //     break;
      //   case "empaneled hospitals":
      //     result = await stateSelectionService(senderNumber);
      //     break;
      //   case "state":
      //     result = await empaneledHospitalService(senderNumber);
      //     break;
      //   default:
      //     console.log(
      //       "user typed a query, passing control to aiResponseService ----->"
      //     );
      //     break;
      // }
      const buttonBasedService = serviceRouterforButtons[userMessage];
      const listBasedServiceforState = serviceRouterforStateLists[location];
      // const listBasedServiceforDistrict = serviceRouterforDistrictLists[location];

      // specific commands button based
      if (buttonBasedService) {
        result = await buttonBasedService(
          senderNumber,
          senderName ?? undefined
        );
        console.log("Button based command processed successfully!");
      } else if (listBasedServiceforState && locationType === "state") {
        result = await listBasedServiceforState(senderNumber);
        console.log("state selection processed successfully!");
      } else if (locationType == "district") {
        result = await listOfDistrictHospitals(senderNumber, location);
        console.log("district selection processed successfully!");
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
      // Check result status
      if (result?.success !== undefined) {
        console.log({
          message: result.success
            ? "response successful"
            : "response unsuccessful",
          details: result,
        });
      } else {
        console.log("No handler found for this message");
      }
    } catch (error) {
      console.error("Error in webhook controller:", error);
    }
  };
