import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const body =
  "The Government of India’s Ayushman Bharat aims for Universal Health Coverage with two key components:\n\n*1. PM-JAY* : Provides health insurance of ₹5 lakhs per family/year for secondary & tertiary care to 10 crore poor families (50 crore beneficiaries). Covers pre-existing conditions from day one. Eligibility is based on SECC 2011.\n\n*2. HWCs* : Transforms Sub-Centers and PHCs into Health & Wellness Centers offering preventive, promotive, and curative care.\n\nFully funded by the Government, benefits are portable and cashless across empaneled public and private hospitals";


export const healthSchemeService = async (userNumber) => {
  const options = {
    method: "POST",
    url: "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/",
    headers: {
      authkey: `${process.env.AUTH_KEY}`,
      "content-type": "application/json",
      accept: "application/json",
    },
    data: {
      recipient_number: userNumber,
      integrated_number: `${process.env.INTEGRATED_NUMBER}`,
      content_type: "interactive",
      interactive: {
        type: "button",
        header: {
          type: "text",
          text: "ABDM HEALTH SCHEMES",
        },
        body: {
          text: body,
        },
        footer: {
          text: "Click below to read more.",
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "ID_1",
                title: "More about PM-JAY",
              },
            },
            {
              type: "reply",
              reply: {
                id: "id2",
                title: "More on HWCs",
              },
            },
          ],
        },
      },
    },
  };

   try {
     const response = await axios.request(options);
     return {
       success: true,
       message: "Health scheme message sent successfully",
       data: response.data,
     };
   } catch (error) {
     console.error(
       "Error sending health scheme message:",
       error.response ? error.response.data : error.message
     );
     return {
       success: false,
       error: "Failed to send health scheme message",
       details: error.response ? error.response.data : error.message,
     };
   }
};
