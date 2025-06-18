# 🚀 Quick Setup Instructions

## Step 1: Get Your Gemini API Key

1. **Visit Google AI Studio**: Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. **Sign in** with your Google account
3. **Create API Key**: Click "Create API Key" button
4. **Copy the key**: Your API key will look something like `AIzaSyC...` (starts with AIza)

## Step 2: Configure the API Key

1. **Create `.env` file**: In your project root directory, create a new file called `.env`
2. **Add your API key**: Add this line to the `.env` file:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   **Replace `your_actual_api_key_here` with your actual Gemini API key**

## Step 3: Start the Development Server

```bash
npm run dev
```

## Step 4: Open in Browser

Navigate to `http://localhost:5173` to see your chatbot!

## 🔧 Troubleshooting

### If you see "Gemini API key not configured" error:
- Make sure your `.env` file is in the project root (same folder as `package.json`)
- Ensure the variable name starts with `VITE_`
- Restart the development server after adding the `.env` file

### If voice input doesn't work:
- Use Chrome or Edge browser
- Allow microphone permissions when prompted
- Make sure you're on HTTPS (required for voice input)

### Example `.env` file:
```env
VITE_GEMINI_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
```

---

**🎉 You're all set! Your rural chatbot interface is ready to help farmers and rural communities.** 