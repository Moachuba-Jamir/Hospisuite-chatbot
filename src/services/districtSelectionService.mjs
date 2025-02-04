import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const districtSelectionService = async (userNumber) => {
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
        type: "list",
        header: {
          type: "text",
          text: "🔍 Find ABHA Empaneled Hospitals",
        },
        body: {
          text: `To get the best healthcare options, please choose your district from the list below. Once selected, you’ll see a list of hospitals in your district registered under ABHA for easy access.\n
*Abbreviations for specialties*: 
*BM*: _Burns Management_  
*MC*: _Cardiology_  
*SV*: _Cardio & Vascular_  
*MG*: _General Medicine_  
*SG*: _General Surgery_  
*IN*: _Neuroradiology_  
*MO*: _Medical Oncology_  
*MM*: _Mental Health_  
*MN*: _Neo-natal_  
*SN*: _Neuro Surgery_  
*OG*: _Obs & Gynec_  
*SE*: _Eye Care_  
*SM*: _Oral Surgery_  
*SB*: _Orthopedics_  
*SL*: _ENT_  
*NA*: _Child Cancer_  
*MP*: _Child Medicine_  
*SS*: _Child Surgery_  
*PL*: _Plastic Surgery_  
*ST*: _Trauma Care_  
*MR*: _Radio Oncology_  
*SC*: _Cancer Surgery_  
*SU*: _Urology_`,
        },
        footer: {
          text: "Thank you for using Hospisuite",
        },
        action: {
          button: "Select your district",
          sections: [
            {
              title: "district",
              rows: [
                {
                  id: "1",
                  title: "Dimapur",
                  description:
                    "specialties: BM, MC, MG, SG, SN, MO, MN, SO, SE, SM, SB, SL, MP, ST, ...",
                },
                {
                  id: "2",
                  title: "Kohima",
                  description:
                    "specialties: MC, MG, SG, SN, SO, SE, SB, SS, ST, MR, SC, NA",
                },
                {
                  id: "3",
                  title: "Mokokchung",
                  description: "specialties: MG, SG, SN, SO, SE, SB, ST, SC",
                },
                {
                  id: "4",
                  title: "Chumoukedima",
                  description:
                    "specialties: MC, MG, SG, SN, SO, SE, SB, SS, ST, MR, SC, NA",
                },
                {
                  id: "5",
                  title: "Zunheboto",
                  description:
                    "specialties: MG, MC, SG, SN, SO, SE, SB, SS, ST, MR, SC, NA",
                },
                {
                  id: "6",
                  title: "Wokha",
                  description: "specialties: BM, MG, SG, IN, SO, SB, ST, SU",
                },
                {
                  id: "7",
                  title: "Peren",
                  description:
                    "specialties: MC, MG, SG, SN, SO, SE, SB, SS, ST, MR, SC, NA",
                },
                {
                  id: "8",
                  title: "Phek",
                  description:
                    "specialties: BM, MC, MG, SG, SO, SB, MP, SS, ST, SU",
                },
                {
                  id: "9",
                  title: "Mon",
                  description: "specialties: BM, MG, SG, SO, SE, SB",
                },
                {
                  id: "10",
                  title: "Tuensang",
                  description:
                    "specialties: BM, MG, SG, MN, SN, SO, SE, SB, MP, ST, SC, SU",
                },
              ],
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
      message: "ResendOptions message sent successfully",
      data: response.data,
    };
  } catch (error) {
    console.error(
      "Error sending ResendOptions message:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      error: "Failed to send ResendOptions message",
      details: error.response ? error.response.data : error.message,
    };
  }
};
