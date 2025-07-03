// Add your Gemini API key below:
// Replace 'your_api_key_here' with your actual Gemini API key
// The API key should be set in your .env file as: VITE_GEMINI_API_KEY=your_api_key_here

// Load API key from environment variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY

// Validate API key
if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_api_key_here') {
  console.error('⚠️ Gemini API key not found! Please add your API key to the .env file.')
  console.error('Example: VITE_GEMINI_API_KEY=your_actual_api_key_here')
}

/**
 * Query the Gemini API with a text prompt
 * @param {string} promptText - The user's message
 * @param {string} language - 'english' or 'kannada'
 * @returns {Promise<string>} - The AI response
 */
export async function queryGemini(promptText, language = 'english') {
  // Check if API key is configured
  if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_api_key_here') {
    throw new Error('Gemini API key not configured. Please add your API key to the .env file.')
  }

  try {
    // Prepare the prompt with context for rural India
    const contextPrompt = `You are an AI assistant designed to help rural Indian communities including farmers, MSME owners, SHG members, and rural youth. 
    
    Context: You provide helpful, practical advice in ${
      language === 'english' ? 'English' : language === 'kannada' ? 'Kannada' : 'Hindi'
    } about:
    - Agricultural practices and crop advice
    - Market prices and market information
    - Government schemes and loan options
    - Skill development and business tips
    - Weather and farming conditions
    - SHG (Self Help Group) information
    
    User's question: ${promptText}
    
    Please provide a helpful, practical response in ${
      language === 'english' ? 'English' : language === 'kannada' ? 'Kannada' : 'Hindi'
    }. 
    Keep responses concise but informative. If the user asks about market prices, weather, or loan rates, 
    provide general guidance and mention that specific data may vary by location.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: contextPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Gemini API Error:', errorData)
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    // Extract the response text from Gemini's response structure
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!responseText) {
      throw new Error('No response text received from Gemini API')
    }

    return responseText

  } catch (error) {
    console.error('Error querying Gemini API:', error)
    
    // Return a user-friendly error message
    if (language === 'english') {
      return 'I apologize, but I\'m having trouble connecting to my knowledge base right now. Please try again in a moment, or check your internet connection. For immediate help, you can contact your local agricultural extension office or visit the nearest Krishi Vigyan Kendra.'
    } else {
      return 'ಕ್ಷಮಿಸಿ, ಆದರೆ ನಾನು ಈಗ ನನ್ನ ಜ್ಞಾನ ಆಧಾರಕ್ಕೆ ಸಂಪರ್ಕಿಸಲು ತೊಂದರೆ ಪಡುತ್ತಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಒಂದು ಕ್ಷಣದಲ್ಲಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ, ಅಥವಾ ನಿಮ್ಮ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ. ತ್ವರಿತ ಸಹಾಯಕ್ಕಾಗಿ, ನಿಮ್ಮ ಸ್ಥಳೀಯ ಕೃಷಿ ವಿಸ್ತರಣೆ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು ಅಥವಾ ಹತ್ತಿರದ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಬಹುದು.'
    }
  }
}

/**
 * Stubbed data fetching functions for market prices, weather, and loan rates
 * These would be replaced with real API calls in production
 */

export async function fetchMarketPrices() {
  // TODO: Replace with real API or web scraper
  // Example: fetch from government APIs, agricultural market data sources
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Return mock data
    return {
      rice: { price: '₹2,200/quintal', trend: 'stable' },
      wheat: { price: '₹2,100/quintal', trend: 'rising' },
      pulses: { price: '₹8,500/quintal', trend: 'falling' },
      vegetables: { price: '₹40/kg', trend: 'stable' }
    }
  } catch (error) {
    console.error('Error fetching market prices:', error)
    throw new Error('Failed to fetch market prices')
  }
}

export async function fetchWeatherData(location = 'Karnataka') {
  // TODO: Replace with real weather API (e.g., OpenWeatherMap, government weather APIs)
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Return mock weather data
    return {
      temperature: '28°C',
      humidity: '65%',
      condition: 'Partly Cloudy',
      forecast: 'Light rain expected in next 2 days',
      windSpeed: '12 km/h'
    }
  } catch (error) {
    console.error('Error fetching weather data:', error)
    throw new Error('Failed to fetch weather data')
  }
}

export async function fetchLoanRates() {
  // TODO: Replace with real banking/financial APIs
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600))
    
    // Return mock loan data
    return {
      shgLoans: { rate: '7.5%', maxAmount: '₹50,000' },
      kisanCreditCard: { rate: '9.0%', maxAmount: '₹3,00,000' },
      agriculturalLoans: { rate: '8.5%', maxAmount: '₹10,00,000' },
      msmeLoans: { rate: '11.0%', maxAmount: '₹25,00,000' }
    }
  } catch (error) {
    console.error('Error fetching loan rates:', error)
    throw new Error('Failed to fetch loan rates')
  }
} 