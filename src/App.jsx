import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import WelcomeCard from './components/WelcomeCard'
import ChatWindow from './components/ChatWindow'
import InputArea from './components/InputArea'
import { queryGemini } from './utils/geminiApi'
import { getKannadaSpeechAudio } from './utils/googleTTS'

function App() {
  const [language, setLanguage] = useState('english') // 'english', 'kannada' or 'hindi'
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Text-to-Speech function using Web Speech API or Google Cloud TTS for Kannada
  const speakText = async (text, lang) => {
    if (lang === 'kannada') {
      try {
        const audioContent = await getKannadaSpeechAudio(text)
        const audio = new Audio('data:audio/mp3;base64,' + audioContent)
        audio.play()
      } catch (error) {
        console.error('Error playing Kannada speech audio:', error)
      }
    } else if (lang === 'hindi') {
      if (!window.speechSynthesis) {
        console.warn('Speech synthesis not supported in this browser.')
        return
      }

      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'hi-IN'
        window.speechSynthesis.speak(utterance)
      }

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          speak()
        })
      } else {
        speak()
      }
    } else {
      if (!window.speechSynthesis) {
        console.warn('Speech synthesis not supported in this browser.')
        return
      }

      const speak = () => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-IN'
        window.speechSynthesis.speak(utterance)
      }

      if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.addEventListener('voiceschanged', () => {
          speak()
        })
      } else {
        speak()
      }
    }
  }

  // Handle sending messages to Gemini API
  const sendMessage = async (text) => {
    if (!text.trim()) return

    // Add user message to chat
    const userMessage = {
      text,
      sender: 'user'
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Query Gemini API
      const response = await queryGemini(text, language)
      
      // Add bot response to chat
      const botMessage = {
        text: response,
        sender: 'bot',
        quickReplies: generateQuickReplies(text, language)
      }
      
      setMessages(prev => [...prev, botMessage])

      // Speak the bot response text
      speakText(response, language)
    } catch (error) {
      console.error('Error querying Gemini:', error)
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: language === 'english' 
          ? 'Sorry, I encountered an error. Please try again.' 
          : language === 'kannada'
            ? 'ಕ್ಷಮಿಸಿ, ನಾನು ದೋಷವನ್ನು ಎದುರಿಸಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
            : 'क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुनः प्रयास करें।',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Generate quick reply suggestions based on user input
  const generateQuickReplies = (userText, lang) => {
    const text = userText.toLowerCase()
    
    if (text.includes('market') || text.includes('price')) {
      return lang === 'english' 
        ? ['Show me rice prices', 'What about vegetables?', 'Tell me about pulses']
        : lang === 'kannada'
          ? ['ಅಕ್ಕಿ ಬೆಲೆಗಳನ್ನು ತೋರಿಸಿ', 'ತರಕಾರಿಗಳ ಬಗ್ಗೆ ಏನು?', 'ಬೇಳೆಕಾಳುಗಳ ಬಗ್ಗೆ ಹೇಳಿ']
          : ['चावल की कीमतें दिखाएं', 'सब्जियों के बारे में क्या?', 'दालों के बारे में बताएं']
    }
    
    if (text.includes('weather') || text.includes('rain')) {
      return lang === 'english'
        ? ['Today\'s forecast', 'Weekly weather', 'Best time to plant']
        : lang === 'kannada'
          ? ['ಇಂದಿನ ಮುನ್ಸೂಚನೆ', 'ವಾರದ ಹವಾಮಾನ', 'ನೆಡುವ ಉತ್ತಮ ಸಮಯ']
          : ['आज का पूर्वानुमान', 'साप्ताहिक मौसम', 'पौधारोपण का सर्वोत्तम समय']
    }
    
    if (text.includes('loan') || text.includes('credit')) {
      return lang === 'english'
        ? ['SHG loan rates', 'Kisan Credit Card', 'How to apply']
        : lang === 'kannada'
          ? ['ಸ್ವಯಂ ಸಹಾಯ ಸಂಘ ಸಾಲ ದರಗಳು', 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್', 'ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು']
          : ['एसएचजी ऋण दरें', 'किसान क्रेडिट कार्ड', 'कैसे आवेदन करें']
    }
    
    // Default quick replies
    return lang === 'english'
      ? ['Crop advice', 'Market prices', 'Weather forecast']
      : lang === 'kannada'
        ? ['ಬೆಳೆ ಸಲಹೆ', 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು', 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ']
        : ['फसल सलाह', 'बाजार की कीमतें', 'मौसम का पूर्वानुमान']
  }

  return (
    <div className="min-h-screen bg-off-white flex flex-col pt-16">
      {/* Header Component */}
      <Header 
        language={language} 
        setLanguage={setLanguage} 
      />
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Welcome Card - shown only when no messages */}
        {messages.length === 0 && (
          <WelcomeCard 
            language={language} 
            onQuickAction={sendMessage} 
          />
        )}
        
        {/* Chat Window */}
        <ChatWindow 
          messages={messages}
          isLoading={isLoading}
          onQuickReply={sendMessage}
          language={language}
          extraBottomPadding={true}
        />
        
        {/* Input Area */}
        <InputArea 
          onSendMessage={sendMessage}
          isLoading={isLoading}
          language={language}
        />
      </main>
    </div>
  )
}

export default App 