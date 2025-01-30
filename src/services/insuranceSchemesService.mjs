import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const body =
  "The *Pradhan Mantri Jan Arogya Yojana* (*PM-JAY*) under Ayushman Bharat provides ₹5 lakh per family per year for hospitalization, covering 50 crore beneficiaries (bottom 40% of India’s population). It includes pre-existing conditions from day one and offers cashless treatment at public & empaneled private hospitals. Eligibility is based on *SECC 2011*.\n\n" +
  "✅ *Other Schemes:*\n" +
  "🔹 *PM-JAY for Senior Citizens* 👴👵 - Extra ₹5 lakh cover for 70+ members in PM-JAY families.\n" +
  "🔹 *PM CARES for Children* 🧒 - ₹5 lakh cover for COVID-19 orphaned children.\n" +
  "🔹 *NAMASTE Scheme* 🧹 - Health insurance for sanitation workers.\n" +
  "🔹 *Ayushman CAPF* 👮‍♂️ - Medical cover for CAPF personnel & families.\n\n" +
  "✅ *Sub-Schemes:*\n" +
  "🔹 *ASHA Workers* 🏥 - ₹5 lakh insurance.\n" +
  "🔹 *Anganwadi Workers & Helpers* 👶 - ₹5 lakh insurance.\n" +
  "🔹 *Construction Workers* 🏗️ - ₹5 lakh insurance.\n\n" +
  "Learn more: http://pmjay.gov.in";



export const insuranceSchemes = async (userNumber) => {
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
          text: "📢 Ayushman Bharat Insurance Schemes Overview",
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
