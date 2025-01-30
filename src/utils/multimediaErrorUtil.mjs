import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const body = ` I'm sorry, but I'm unable to process that type of content. However, I'm happy to assist you in any other way I can. Let me know how I can help!😊 `;

export const multimediaError = async (userNumber) => {
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
          text: body,
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
