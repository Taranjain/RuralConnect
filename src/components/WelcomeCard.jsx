import React from 'react'

const WelcomeCard = ({ language, onQuickAction }) => {
  const quickActions = [
    {
      id: 'crop-advice',
      icon: 'fas fa-seedling',
      title: {
        english: 'Crop Advice',
        kannada: 'ಬೆಳೆ ಸಲಹೆ',
        hindi: 'फसल सलाह'
      },
      prompt: {
        english: 'I need advice on which crops to plant this season',
        kannada: 'ಈ ಋತುವಿನಲ್ಲಿ ಯಾವ ಬೆಳೆಗಳನ್ನು ನೆಡಬೇಕೆಂದು ಸಲಹೆ ಬೇಕು',
        hindi: 'मुझे इस मौसम में कौन सी फसलें लगानी चाहिए, इस पर सलाह चाहिए'
      }
    },
    {
      id: 'market-prices',
      icon: 'fas fa-chart-line',
      title: {
        english: 'Market Prices',
        kannada: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು',
        hindi: 'बाजार की कीमतें'
      },
      prompt: {
        english: 'Show me current market prices for agricultural products',
        kannada: 'ಕೃಷಿ ಉತ್ಪನ್ನಗಳ ಪ್ರಸ್ತುತ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳನ್ನು ತೋರಿಸಿ',
        hindi: 'कृषि उत्पादों के लिए वर्तमान बाजार कीमतें दिखाएं'
      }
    },
    {
      id: 'group-loans',
      icon: 'fas fa-handshake',
      title: {
        english: 'Group Loans',
        kannada: 'ಸಮೂಹ ಸಾಲಗಳು',
        hindi: 'समूह ऋण'
      },
      prompt: {
        english: 'Tell me about SHG loan options and requirements',
        kannada: 'ಸ್ವಯಂ ಸಹಾಯ ಸಂಘ ಸಾಲ ಆಯ್ಕೆಗಳು ಮತ್ತು ಅಗತ್ಯತೆಗಳ ಬಗ್ಗೆ ಹೇಳಿ',
        hindi: 'स्वयं सहायता समूह ऋण विकल्प और आवश्यकताओं के बारे में बताएं'
      }
    },
    {
      id: 'skill-tips',
      icon: 'fas fa-graduation-cap',
      title: {
        english: 'Skill Tips',
        kannada: 'ಕೌಶಲ್ಯ ಸಲಹೆಗಳು',
        hindi: 'कौशल सुझाव'
      },
      prompt: {
        english: 'What skills can help me improve my farming or business?',
        kannada: 'ನನ್ನ ಕೃಷಿ ಅಥವಾ ವ್ಯವಹಾರವನ್ನು ಸುಧಾರಿಸಲು ಯಾವ ಕೌಶಲ್ಯಗಳು ಸಹಾಯ ಮಾಡಬಹುದು?',
        hindi: 'कौन से कौशल मेरी खेती या व्यवसाय को सुधारने में मदद कर सकते हैं?'
      }
    }
  ]

  return (
    <div className="flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-soft p-6 max-w-2xl w-full">
        {/* Avatar and Greeting */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
            {/* Friendly farmer silhouette icon */}
            <i className="fas fa-user-tie text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-semibold text-charcoal mb-2">
            {language === 'english' 
              ? 'Hello! How can I help you today?' 
              : language === 'kannada'
                ? 'ನಮಸ್ಕಾರ! ನಾನು ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?'
                : 'नमस्ते! मैं आज आपकी कैसे मदद कर सकता हूँ?'
            }
          </h2>
          <p className="text-gray-600">
            {language === 'english'
              ? 'Choose a quick action or type your question below'
              : language === 'kannada'
                ? 'ತ್ವರಿತ ಕ್ರಿಯೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ಅಥವಾ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ'
                : 'एक त्वरित क्रिया चुनें या नीचे अपना प्रश्न टाइप करें'
            }
          </p>
        </div>

        {/* Quick Access Tiles - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onQuickAction(action.prompt[language])}
              className="bg-terra text-white p-4 rounded-lg hover:bg-terra-dark transition-colors duration-200 flex flex-col items-center justify-center space-y-2 min-h-[100px]"
              aria-label={action.title[language]}
            >
              <i className={`${action.icon} text-2xl`}></i>
              <span className="font-medium text-center">
                {action.title[language]}
              </span>
            </button>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            {language === 'english'
              ? '💡 Tip: You can also use voice input by clicking the microphone button':language === 'hindi'
              ? '💡 सुझाव: आप माइक्रोफ़ोन बटन पर क्लिक करके वॉयस इनपुट का भी उपयोग कर सकते हैं।'
              : '💡 ಸಲಹೆ: ಮೈಕ್ರೋಫೋನ್ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮೂಲಕ ನೀವು ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಅನ್ನು ಸಹ ಬಳಸಬಹುದು'
            }
          </p>
        </div>
      </div>
    </div>
  )
}

export default WelcomeCard 