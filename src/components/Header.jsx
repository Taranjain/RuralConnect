import React, { useState, useEffect } from 'react'

const Header = ({ language, setLanguage }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <header className="bg-forest text-white h-16 flex items-center justify-between px-6 shadow-md fixed top-0 left-0 w-full z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <a href="/" className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-white rounded">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            {/* Simple leaf with chat bubble icon */}
            <i className="fas fa-leaf text-forest text-lg"></i>
          </div>
          <h1 className="text-xl font-semibold">
            {language === 'english' ? 'Rural Connect' : 'Rural Connect'}
          </h1>
        </a>
      </div>

      {/* Language Toggle and Online Status */}
      <div className="flex items-center space-x-4">
        {/* Online/Offline Indicator */}
        <div className="flex items-center space-x-2">
          <div 
            className={`w-3 h-3 rounded-full ${
              isOnline ? 'bg-green-400' : 'bg-orange-400'
            }`}
            title={isOnline ? 'Online' : 'Offline'}
            aria-label={isOnline ? 'Online' : 'Offline'}
          ></div>
          <span className="text-sm hidden sm:inline">
            {isOnline 
              ? (language === 'english' ? 'Online' : 'Online')
              : (language === 'english' ? 'Offline' : 'Offline')
            }
          </span>
        </div>

        {/* Language Toggle Buttons */}
        <div className="flex bg-white bg-opacity-20 rounded-lg p-1">
          <button
            onClick={() => setLanguage('english')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              language === 'english'
                ? 'bg-white text-forest'
                : 'text-white hover:bg-white hover:bg-opacity-20'
            }`}
            aria-label="Switch to English"
            aria-pressed={language === 'english'}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('kannada')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              language === 'kannada'
                ? 'bg-white text-forest'
                : 'text-white hover:bg-white hover:bg-opacity-20'
            }`}
            aria-label="Switch to Kannada"
            aria-pressed={language === 'kannada'}
          >
            ಕನ್ನಡ
          </button>
          <button
            onClick={() => setLanguage('hindi')}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              language === 'hindi'
                ? 'bg-white text-forest'
                : 'text-white hover:bg-white hover:bg-opacity-20'
            }`}
            aria-label="Switch to Hindi"
            aria-pressed={language === 'hindi'}
          >
            हिंदी
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 