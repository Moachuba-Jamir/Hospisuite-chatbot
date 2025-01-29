import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const body =
  "To assist you better, I’ll need your location to find the closest hospitals. Please share your location by giving us your current location. Once I have your location, I’ll provide a list of *ABHA-empaneled hospitals* near you.";

export const getHospitalLocationService = async (userNumber) => {
  const options = {
    method: "POST",
    url: "https://control.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/",
    params: {
      integrated_number: `${process.env.INTEGRATED_NUMBER}`,
      recipient_number: userNumber,
      content_type: "text",
      text: body,
    },
    headers: {
      authkey: `${process.env.AUTH_KEY}`,
      accept: "application/json",
      "content-type": "application/json",
    },
  };

  try {
    const response = await axios.request(options);
    return {
      success: true,
      message: "ABHA registration message sent successfully",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error sending ABHA registration message:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: "Failed to send ABHA registration message",
      details: error.response ? error.response.data : error.message,
    };
  }
};
