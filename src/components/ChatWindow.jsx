import React, { useRef, useEffect } from 'react'

const ChatWindow = ({ messages, isLoading, onQuickReply, language, extraBottomPadding }) => {
  const chatEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className={`flex-1 overflow-y-auto bg-off-white p-4 ${extraBottomPadding ? 'pb-32' : ''}`}>
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            {/* Message Bubble */}
            <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`${message.sender === 'user' ? 'message-bubble-user' : 'message-bubble-bot'}`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </div>

            {/* Quick Reply Buttons - only for bot messages */}
            {message.sender === 'bot' && message.quickReplies && (
              <div className="flex flex-wrap gap-2 mt-2 ml-4">
                {message.quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => onQuickReply(reply)}
                    className="quick-reply-btn"
                    aria-label={`Quick reply: ${reply}`}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="message-bubble-bot">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-sm text-gray-600">
                  {language === 'english' ? 'Thinking...' : 'ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {messages.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 py-8">
            <i className="fas fa-comments text-4xl mb-4 opacity-50"></i>
            <p>
              {language === 'english' 
                ? 'Start a conversation by typing a message or using the quick actions above'
                : 'ಸಂದೇಶವನ್ನು ಟೈಪ್ ಮಾಡುವ ಮೂಲಕ ಅಥವಾ ಮೇಲಿನ ತ್ವರಿತ ಕ್ರಿಯೆಗಳನ್ನು ಬಳಸುವ ಮೂಲಕ ಸಂಭಾಷಣೆಯನ್ನು ಪ್ರಾರಂಭಿಸಿ'
              }
            </p>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={chatEndRef} />
      </div>
    </div>
  )
}

export default ChatWindow 