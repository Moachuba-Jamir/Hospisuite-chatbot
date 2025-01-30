# 🤖 HospiSuite: AI-Powered Healthcare Assistant

## 📑 Table of Contents

* [Overview](#overview)
* [Features](#features)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Configuration](#configuration)
* [Development](#development)
* [API Documentation](#api-documentation)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [Troubleshooting](#troubleshooting)
* [License](#license)
* [Contact](#contact)

## 🏥 Overview

HospiSuite is an innovative WhatsApp-based chatbot designed to revolutionize healthcare access and information dissemination in India. Leveraging the power of AI and the Ayushman Bharat Digital Mission (ABDM), HospiSuite provides users with instant, reliable healthcare information and services.

## ✨ Features

* WhatsApp-based healthcare assistant
* AI-powered responses using Google's Gemini
* ABDM integration (coming soon)

## 🔧 Prerequisites

* Node.js (v16 or higher)
* MongoDB (v4.4 or higher)
* MSG91 Account
* Google AI Studio Account
* ngrok for local development

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hospisuite.git

# Navigate to project directory
cd hospisuite

# Install dependencies
npm install
```


```
PORT =  Application port
AUTH_KEY = MSG91 API key
MONGO_URI = MongoDB connection string
GEMINI_API_KEY =  Google AI Studio API key
INTEGRATED_NUMBER = MSG91 WhatsApp number
```

### Starting ngrok


1. Launch Terminal

* Open terminal/command prompt
* Navigate to ngrok's installation directory or use globally if added to PATH


2. Run Command

```bash
ngrok http 3000  # Replace 3000 with your application's PORT from .env  
```


