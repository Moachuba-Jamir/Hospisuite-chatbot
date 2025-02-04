import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const body =
  "This is the health and insurance message from the backend";

export const HealthAndInsuranceService = async (userNumber) => {
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
                title: "Health schemes",
              },
            },
            {
              type: "reply",
              reply: {
                id: "id2",
                title: "Insurance schemes",
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
