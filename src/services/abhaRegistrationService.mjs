import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const body =
  "You can create your ABHA (Ayushman Bharat Health Account) by following these simple steps: \n\n1. Visit the official ABHA registration portal here: https://abha.abdm.gov.in/abha/v3/register\n\n2. Choose your preferred registration method - you can use your Aadhaar or any other valid ID document.\n\n3. Enter your personal details and verify your mobile number through OTP.\n\n4. After verification, you'll get your unique ABHA number and ID.\n\n5. Download your ABHA card and save it for future healthcare visits.";

export const abhaRegistrationService = async (userNumber) => {
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
          text: "ABHA Registration",
        },
        body: {
          text: body,
        },
        footer: {
          text: "Need more help? Tap the Menu button to explore options! 🤖✨",
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "ID_1",
                title: " \u2630 Menu",
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
      message: "ABHA registration interactive message sent successfully",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error sending ABHA registration interactive message:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: "Failed to send ABHA registration message",
      details: error.response ? error.response.data : error.message,
    };
  }
};
