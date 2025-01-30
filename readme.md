# 🤖HospiSuite: AI-Powered Healthcare Assistant

## 🏥 Project Overview

HospiSuite is an innovative WhatsApp-based chatbot designed to revolutionize healthcare access and information dissemination in India. Leveraging the power of AI and the Ayushman Bharat Digital Mission (ABDM), HospiSuite provides users with instant, reliable healthcare information and services.

## 🚀 Getting Started


---

### **1️⃣ Clone the Repository & Set Up the Project for local enviroment**

```
# Clone the repository
git clone https://github.com/your-username/your-repo.git

# Navigate into the project directory
cd your-repo

# Install project dependencies
npm install
  
# Running Locally 

#Install packages and dependencies
npm install 

# Run the server in development mode
npm run dev  # nodemon used

# Run the server in production mode
npm start
```

## 🚀 Core Technologies

* Node.js
* Express.js
* MongoDB
* Google Generative AI (Gemini)
* WhatsApp Business API through msg91
* ABDM API Integration (coming soon)

## 🔐 Prerequisites and Signup Guide

### 1. MSG91 Signup Process


1. Visit [msg91](https://msg91.com/in) Website
2. Click on "Sign Up" or "Create Account"
3. Fill in your personal/business details
4. Verify your email address
5. Complete business/developer profile (requires GST number)
6. Navigate to API section
7. Generate API Key for WhatsApp Integration
8. Add your phone number (new sim card wihtout any prior whats app account attachements)

### 2. Google AI Studio (Gemini API) Signup


1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google Account
3. Create a New Google Cloud Project
   * If you don't have a Google Cloud account, you'll need to create one
4. Enable Billing (Google provides free credits)
   * Go to [Google Cloud Console](https://console.cloud.google.com/)
   * Navigate to Billing
   * Add a payment method (You won't be charged immediately)
5. Return to AI Studio
6. Click "Create API Key"
7. Copy and save your API Key securely
8. Configure API Key permissions and quotas

### 3. Additional Configuration

* Set up environment variables in `.env` file:

## 🔐 Environment Variables

* `PORT`: Express port
* `AUTH_KEY`: msg91 Api key
* `MONGO_URI`: Your mongodb atlas uri
* `GEMINI_API_KEY`: Google Generative AI API Key
* `INTEGRATED_NUMBER`: Your integrated number from msg91

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Developed By

[Zeliang CodeTech](https://zeliangcodetech.com) - Dream | Devise | Develop

**Disclaimer**: HospiSuite is an independent project and is not officially affiliated with the Ayushman Bharat Digital Mission or the Government of India.

## 🌐 Contact

* **Emai**l: hospisuitehealthassistant@gmail.com


