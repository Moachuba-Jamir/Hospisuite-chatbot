import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const body =
  "*Health and Wellness Centers* (HWCs) are a key component of the Ayushman Bharat initiative, aimed at strengthening primary healthcare services across India. This program transforms existing Sub-Centers and Primary Health Centers (PHCs) into fully functional HWCs.\n\nThese centers are designed to provide a wide range of services, including preventive, promotive, curative, rehabilitative, and palliative care. HWCs also focus on promoting wellness through health awareness programs, early diagnosis of diseases, immunization, maternal and child health services, and management of chronic illnesses such as diabetes and hypertension.\n\nBy making essential healthcare services accessible at the grassroots level, HWCs play a critical role in reducing the burden on secondary and tertiary care facilities.\n\nRead more: https://ab-hwc.nhp.gov.in";

export const hwcService = async (userNumber) => {
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
          text: "More on Health and Wellness Centers",
        },
        body: {
          text: body,
        },
        footer: {
          text: "Tap the *Menu* button to explore main options.",
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
      message: "HWCs message sent successfully",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error sending HWCsmessage:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: "Failed to send HWCs message",
      details: error.response ? error.response.data : error.message,
    };
  }
};
