import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendAiResponseService = async (userNumber, userQuery) => {
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
          text: "",
        },
        body: {
          text: userQuery.message,
        },
        footer: {
          text: "Tap the *Menu* button to explore the main options.",
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "ID_1",
                title: "\u2630 Menu",
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
