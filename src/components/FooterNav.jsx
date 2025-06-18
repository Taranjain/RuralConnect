import React from 'react'

const FooterNav = ({ activePage, setActivePage, language }) => {
  const navItems = [
    {
      id: 'home',
      icon: 'fas fa-home',
      label: {
        english: 'Home',
        kannada: 'ಮುಖಪುಟ'
      }
    },
    {
      id: 'history',
      icon: 'fas fa-history',
      label: {
        english: 'History',
        kannada: 'ಇತಿಹಾಸ'
      }
    },
    {
      id: 'resources',
      icon: 'fas fa-book',
      label: {
        english: 'Resources',
        kannada: 'ಸಂಪನ್ಮೂಲಗಳು'
      }
    },
    {
      id: 'profile',
      icon: 'fas fa-user',
      label: {
        english: 'Profile',
        kannada: 'ಪ್ರೊಫೈಲ್'
      }
    }
  ]

  return (
    <footer className="bg-charcoal text-white h-14">
      <nav className="h-full">
        <div className="h-full flex items-center justify-around max-w-4xl mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`flex-1 flex flex-col items-center justify-center h-full text-sm transition-colors duration-200 ${
                activePage === item.id
                  ? 'text-terra bg-charcoal'
                  : 'text-white hover:text-terra-light'
              }`}
              aria-label={item.label[language]}
              aria-pressed={activePage === item.id}
            >
              <i className={`${item.icon} text-lg mb-1`}></i>
              <span className="text-xs font-medium">
                {item.label[language]}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </footer>
  )
}

export default FooterNav 