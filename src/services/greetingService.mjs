import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// util
import { isOnlyEmoji, isOnlySpecialChars } from "../utils/detectUserName.mjs";

export const greetingService = async (userNumber, userName, req, res) => {
  let isNameOnlyEmoji = isOnlyEmoji(userName);
  let isNameOnlySpecialChars = isOnlySpecialChars(userName);
  let body;

  if (isNameOnlyEmoji == true || isNameOnlySpecialChars == true) {
    body = `Namaste 🙏, I’m HospiSuite, your Ayushman Bharat WhatsApp assistant.what can I help you with today ? In case you're interested here's a quick and easy way to know more about our services.`;
  } else {
    body = `Namaste  *${userName}* 🙏,  I’m HospiSuite, your Ayushman Bharat WhatsApp assistant.what can I help you with today ? In case you're interested here's a quick and easy way to know more about our services.`;
  }

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
          text: "Welcome to HospiSuite 🏥",
        },
        body: {
          text: body,
        },
        footer: {
          text: "Thank you for using HospiSuite",
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: {
                id: "ID_1",
                title: " Abha Registration",
              },
            },
            {
              type: "reply",
              reply: {
                id: "id2",
                title: "Health & Insurance",
              },
            },
            {
              type: "reply",
              reply: {
                id: "id3",
                title: "Empaneled Hospitals",
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
      message: "Greeting message sent successfully",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error sending greeting message:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: "Failed to send greeting message",
      details: error.response ? error.response.data : error.message,
    };
  }
};
