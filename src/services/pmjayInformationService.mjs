import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const body =
  "The *Pradhan Mantri Jan Arogya Yojana* (PM-JAY) is a flagship health insurance scheme under the Ayushman Bharat initiative. It provides a health cover of ₹5 lakhs per family per year for secondary and tertiary care hospitalization. The scheme targets 10 crore economically weaker families, covering approximately 50 crore beneficiaries, which constitutes the bottom 40% of India's population.\n\n*PM-JAY* includes coverage for pre-existing conditions from the very first day of enrollment and ensures cashless and paperless access to healthcare services. Eligibility is determined based on the deprivation and occupational criteria outlined in the Socio-Economic Caste Census 2011 (SECC 2011) for both rural and urban areas. Beneficiaries can avail of the benefits at all public hospitals and empaneled private healthcare facilities across India.\n\nLearn more: http://pmjay.gov.in";

export const pmJayInfoService = async (userNumber) => {
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
          text: "More on PM-JAY...",
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
