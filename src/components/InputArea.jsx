import React, { useState, useRef, useEffect } from 'react'

const InputArea = ({ onSendMessage, isLoading, language }) => {
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const inputRef = useRef(null)

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognitionInstance = new SpeechRecognition()
      
      recognitionInstance.continuous = false
      recognitionInstance.interimResults = false
      recognitionInstance.lang = language === 'english' ? 'en-IN' : language === 'kannada' ? 'kn-IN' : 'hi-IN'
      
      recognitionInstance.onstart = () => {
        setIsListening(true)
      }
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
        onSendMessage(transcript)
        setIsListening(false)
      }
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        // Show user-friendly error message
        if (event.error === 'not-allowed') {
          alert(language === 'english' 
            ? 'Please allow microphone access to use voice input' 
            : language === 'kannada'
              ? 'ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬಳಸಲು ದಯವಿಟ್ಟು ಮೈಕ್ರೋಫೋನ್ ಪ್ರವೇಶವನ್ನು ಅನುಮತಿಸಿ'
              : 'कृपया वॉइस इनपुट का उपयोग करने के लिए माइक्रोफोन एक्सेस की अनुमति दें'
          )
        }
      }
      
      recognitionInstance.onend = () => {
        setIsListening(false)
      }
      
      setRecognition(recognitionInstance)
    }
  }, [language, onSendMessage])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim())
      setInputText('')
    }
  }

  const handleMicClick = () => {
    if (recognition && !isListening && !isLoading) {
      try {
        recognition.start()
      } catch (error) {
        console.error('Error starting speech recognition:', error)
      }
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="bg-white p-4 border-t border-gray-200 fixed bottom-0 left-0 w-full z-40">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
          {/* Text Input Field */}
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            placeholder={
              language === 'english' 
                ? 'Type your message...' 
                : language === 'kannada'
                  ? 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ...'
                  : 'अपना संदेश टाइप करें...'
              }
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              aria-label={
                language === 'english' 
                  ? 'Type your message' 
                  : language === 'kannada'
                    ? 'ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡಿ'
                    : 'अपना संदेश टाइप करें'
              }
            />
            
            {/* Voice input indicator */}
            {isListening && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-500">
                  {language === 'english' 
                    ? 'Listening...' 
                    : language === 'kannada' 
                      ? 'ಕೇಳುತ್ತಿದ್ದೇನೆ...' 
                      : 'सुन रहा हूँ...'}
                </span>
              </div>
            )}
          </div>

          {/* Microphone Button */}
          <button
            type="button"
            onClick={handleMicClick}
            disabled={isLoading || isListening || !recognition}
            className={`p-3 rounded-full transition-colors duration-200 ${
              isListening
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-green-500 text-white hover:bg-green-600'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
            aria-label={
              language === 'english' 
                ? 'Use voice input' 
                : language === 'kannada'
                  ? 'ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬಳಸಿ'
                  : 'वॉइस इनपुट का उपयोग करें'
            }
            title={
              !recognition 
                ? (language === 'english' 
                    ? 'Voice input not supported' 
                    : language === 'kannada' 
                      ? 'ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿಸಲಾಗಿಲ್ಲ' 
                      : 'वॉइस इनपुट समर्थित नहीं है')
                : (language === 'english' 
                    ? 'Click to speak' 
                    : language === 'kannada' 
                      ? 'ಮಾತನಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ' 
                      : 'बोलने के लिए क्लिक करें')
            }
          >
            <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'} text-lg`}></i>
          </button>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-forest text-white rounded-full hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label={
              language === 'english' 
                ? 'Send message' 
                : language === 'kannada'
                  ? 'ಸಂದೇಶ ಕಳುಹಿಸಿ'
                  : 'संदेश भेजें'
            }
          >
            <i className="fas fa-paper-plane text-lg"></i>
          </button>
        </form>

        {/* Voice Input Status */}
        {!recognition && (
          <div className="mt-2 text-center text-sm text-gray-500">
            <i className="fas fa-info-circle mr-1"></i>
            {language === 'english' 
              ? 'Voice input is not supported in this browser' 
              : language === 'kannada'
                ? 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿಸಲಾಗಿಲ್ಲ'
                : 'यह ब्राउज़र वॉइस इनपुट का समर्थन नहीं करता है'
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default InputArea
