import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import WelcomeCard from './components/WelcomeCard'
import ChatWindow from './components/ChatWindow'
import InputArea from './components/InputArea'
import { queryGemini } from './utils/geminiApi'

function App() {
  const [language, setLanguage] = useState('english') // 'english' or 'kannada'
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Handle sending messages to Gemini API
  const sendMessage = async (text) => {
    if (!text.trim()) return

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // Query Gemini API
      const response = await queryGemini(text, language)
      
      // Add bot response to chat
      const botMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        quickReplies: generateQuickReplies(text, language)
      }
      
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error querying Gemini:', error)
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: language === 'english' 
          ? 'Sorry, I encountered an error. Please try again.' 
          : 'ಕ್ಷಮಿಸಿ, ನಾನು ದೋಷವನ್ನು ಎದುರಿಸಿದ್ದೇನೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
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
        : ['ಅಕ್ಕಿ ಬೆಲೆಗಳನ್ನು ತೋರಿಸಿ', 'ತರಕಾರಿಗಳ ಬಗ್ಗೆ ಏನು?', 'ಬೇಳೆಕಾಳುಗಳ ಬಗ್ಗೆ ಹೇಳಿ']
    }
    
    if (text.includes('weather') || text.includes('rain')) {
      return lang === 'english'
        ? ['Today\'s forecast', 'Weekly weather', 'Best time to plant']
        : ['ಇಂದಿನ ಮುನ್ಸೂಚನೆ', 'ವಾರದ ಹವಾಮಾನ', 'ನೆಡುವ ಉತ್ತಮ ಸಮಯ']
    }
    
    if (text.includes('loan') || text.includes('credit')) {
      return lang === 'english'
        ? ['SHG loan rates', 'Kisan Credit Card', 'How to apply']
        : ['ಸ್ವಯಂ ಸಹಾಯ ಸಂಘ ಸಾಲ ದರಗಳು', 'ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್', 'ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು']
    }
    
    // Default quick replies
    return lang === 'english'
      ? ['Crop advice', 'Market prices', 'Weather forecast']
      : ['ಬೆಳೆ ಸಲಹೆ', 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು', 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ']
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