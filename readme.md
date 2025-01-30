# 🤖HospiSuite: AI-Powered Healthcare Assistant

## 🏥 Overview

HospiSuite is an innovative WhatsApp-based chatbot designed to revolutionize healthcare access and information dissemination in India. Leveraging the power of AI and the Ayushman Bharat Digital Mission (ABDM), HospiSuite provides users with instant, reliable healthcare information and services.

## 🔐 Prerequisites and Configuration

## 🔧 Prerequisites

* Node.js (v16 or higher)
* MongoDB (v4.4 or higher)
* MSG91 Account
* Google AI Studio Account
* ngrok for local development

## ⚙️ Configuration

### 1. MSG91 Setup


1. Account Creation
   - [ ] Visit [MSG91 Website](https://msg91.com)
   - [ ] Click "Sign Up"
   - [ ] Complete registration with business details
   - [ ] Verify email

   \
2. WhatsApp Integration
   - [ ]  Navigate to API section
   - [ ] Generate WhatsApp API key
   - [ ] Set up a new phone number

### 2. Google AI Studio (Gemini API) Signup


1. Initial Setup
   - [ ] Visit Google AI Studio
   - [ ] Sign in with Google Account

   \
2. Project Configuration
   - [ ] Create new Cloud Project
   - [ ] Enable billing (optional)
   - [ ] Generate API key

   \
3. API Key Setup
   - [ ] Copy API key
   - [ ] Configure permissions
   - [ ] Set usage quotas


> 💡**Note**: For MSG91, you'll need a GST number for business verification. Ensure your WhatsApp number hasn't been used for business accounts before.
>
> 💡**Note**: Google AI Studio provides free credits for testing. Production usage may require billing setup.

### 3. Setting Up Webhook with ngrok

Before starting local development, you'll need to set up ngrok for local webhook testing:

### `Ngrok setup`


1. Account Creation
   - [ ] Visit [ngrok website](https://ngrok.com)
   - [ ] Click "Sign up for free"
   - [ ] Complete registration with email
   - [ ] Verify email address
2. Installation
   - [ ] Go to [ngrok download page](https://ngrok.com/download)
   - [ ] Select your operating system (Windows/Mac/Linux)
   - [ ] Download the ngrok package
   - [ ] Extract the downloaded file
3. Authentication
   - [ ] Log into ngrok dashboard
   - [ ] Copy your authtoken from dashboard
   - [ ] Open terminal/command prompt
   - [ ] Run the auth command:

     ```javascript
     bash ngrok config add-authtoken YOUR_AUTH_TOKEN 
     ```

### `Starting up ngrok`

- [ ] Open terminal/command prompt
- [ ] Navigate to ngrok's installation directory or use it globally if added to PATH
- [ ] Run the following command:

```bash
ngrok http http://localhost:8000  # Replace 8000 with your application's PORT from .env
```

### `Example ngrok output:`

```bash
Session Status                online Account                       yourname@example.com (Plan: Free)
Version                       3.5.0
Region                        India (in)
Latency                       41ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxx-xx-xx-xx-xx.ngrok-free.app -> http://localhost:3000
Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

### `Configure Webhook in MSG91`


1. Log into [MSG91 Dashboard](https://control.msg91.com/dashboard/)
2. **Navigate through:**
   - [ ] Dashboard → WhatsApp → Numbers
   - [ ] Or use direct link: <https://control.msg91.com/dashboard/whatsapp/numbers>
   - [ ] Find your integrated WhatsApp number
   - [ ] Look for the number you configured during setup
   - [ ] Click the three dots (⋮) menu button on the right side

* **Set up Webhook:**
  - [ ] Click "Webhook" from the dropdown menu
  - [ ] A modal window will appear
  - [ ] Look for "I**nbound Webhook**" section
  - [ ] Paste your **ngrok HTTPS URL** + '/webhook'
  - [ ] Example: `https://xxxx-xx-xx-xx-xx.ngrok-free.app/webhook`
  - [ ] Click "Save" button
* **Verify Configuration:**
  - [ ] The webhook URL should be visible in the modal
  - [ ] You can test by sending a WhatsApp message to your integrated number
  - [ ] Check ngrok terminal for incoming webhook logs

```
⚠️ Important Notes:

Always use HTTPS URL from ngrok, not HTTP

Don't forget to add '/webhook' at the end of the URL

Update this URL whenever you restart ngrok (free tier limitation)

You can verify successful setup by checking the ngrok dashboard at http://localhost:4040
```

## 🚀 Installation

```
# Clone the repository
git clone https://github.com/your-username/your-repo.git

# Navigate into the project directory
cd your-repo

# Install project dependencies
npm install

# Run the server in development mode
npm run dev 

# Run the server in production mode
npm start
```

## 🔑 Enviromnent variables

```
PORT: Express port

AUTH_KEY: msg91 Api key

MONGO_URI: Your mongodb atlas uri

GEMINI_API_KEY: Google Generative AI API Key

INTEGRATED_NUMBER: Your integrated number from msg91
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Developed By

[Zeliang CodeTech](https://zeliangcodetech.com) - Dream | Devise | Develop

Disclaimer: HospiSuite is an independent project and is not officially affiliated with the Ayushman Bharat Digital Mission or the Government of India.

## 🌐 Contact & Support

* **Emai**l: hospisuitehealthassistant@gmail.com


