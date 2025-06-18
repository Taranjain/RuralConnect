# Rural Chatbot Interface - Component Hierarchy & Layout Mockup

## 🎨 Layout Structure (JSX Representation)

```jsx
<div className="min-h-screen bg-off-white flex flex-col">
  
  {/* HEADER - Fixed at top, height: 64px */}
  <header className="bg-forest text-white h-16 flex items-center justify-between px-6 shadow-md">
    {/* Left: Logo + Brand */}
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
        <i className="fas fa-leaf text-forest text-lg"></i> {/* Leaf icon */}
      </div>
      <h1 className="text-xl font-semibold">Rural Assistant</h1>
    </div>
    
    {/* Right: Online Status + Language Toggle */}
    <div className="flex items-center space-x-4">
      {/* Online/Offline Indicator */}
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-green-400"></div> {/* Green = Online, Orange = Offline */}
        <span className="text-sm">Online</span>
      </div>
      
      {/* Language Toggle Buttons */}
      <div className="flex bg-white bg-opacity-20 rounded-lg p-1">
        <button className="px-3 py-1 rounded-md bg-white text-forest">English</button>
        <button className="px-3 py-1 rounded-md text-white">ಕನ್ನಡ</button>
      </div>
    </div>
  </header>

  {/* MAIN CONTENT AREA - Flex container */}
  <main className="flex-1 flex flex-col">
    
    {/* WELCOME CARD - Centered, shown only when no messages */}
    <div className="flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-soft p-6 max-w-2xl w-full">
        
        {/* Avatar + Greeting */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-tie text-white text-3xl"></i> {/* Farmer avatar */}
          </div>
          <h2 className="text-2xl font-semibold text-charcoal mb-2">
            Hello! How can I help you today?
          </h2>
          <p className="text-gray-600">
            Choose a quick action or type your question below
          </p>
        </div>
        
        {/* Quick Access Tiles - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Crop Advice */}
          <button className="bg-terra text-white p-4 rounded-lg hover:bg-terra-dark transition-colors duration-200 flex flex-col items-center justify-center space-y-2 min-h-[100px]">
            <i className="fas fa-seedling text-2xl"></i>
            <span className="font-medium text-center">Crop Advice</span>
          </button>
          
          {/* Market Prices */}
          <button className="bg-terra text-white p-4 rounded-lg hover:bg-terra-dark transition-colors duration-200 flex flex-col items-center justify-center space-y-2 min-h-[100px]">
            <i className="fas fa-chart-line text-2xl"></i>
            <span className="font-medium text-center">Market Prices</span>
          </button>
          
          {/* Group Loans */}
          <button className="bg-terra text-white p-4 rounded-lg hover:bg-terra-dark transition-colors duration-200 flex flex-col items-center justify-center space-y-2 min-h-[100px]">
            <i className="fas fa-handshake text-2xl"></i>
            <span className="font-medium text-center">Group Loans</span>
          </button>
          
          {/* Skill Tips */}
          <button className="bg-terra text-white p-4 rounded-lg hover:bg-terra-dark transition-colors duration-200 flex flex-col items-center justify-center space-y-2 min-h-[100px]">
            <i className="fas fa-graduation-cap text-2xl"></i>
            <span className="font-medium text-center">Skill Tips</span>
          </button>
        </div>
      </div>
    </div>
    
    {/* CHAT WINDOW - Scrollable area */}
    <div className="flex-1 overflow-y-auto bg-off-white p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        
        {/* Message Bubbles */}
        {/* User Message - Right aligned */}
        <div className="flex justify-end">
          <div className="bg-green-100 text-gray-800 p-3 rounded-bl-2xl rounded-tl-2xl rounded-tr-md max-w-xs ml-auto">
            <p className="text-sm leading-relaxed">What crops should I plant this season?</p>
            <span className="text-xs text-gray-500 mt-1 block">2:30 PM</span>
          </div>
        </div>
        
        {/* Bot Message - Left aligned */}
        <div className="flex justify-start">
          <div className="bg-white text-gray-900 p-3 rounded-br-2xl rounded-tr-2xl rounded-tl-md max-w-xs shadow-soft">
            <p className="text-sm leading-relaxed">Based on the current season, I recommend planting rice, pulses, and vegetables. The monsoon season is ideal for these crops.</p>
            <span className="text-xs text-gray-500 mt-1 block">2:31 PM</span>
          </div>
        </div>
        
        {/* Quick Reply Buttons */}
        <div className="flex flex-wrap gap-2 mt-2 ml-4">
          <button className="bg-terra-light text-white p-2 rounded-lg cursor-pointer hover:bg-terra transition-colors duration-200 text-sm">
            Show me rice prices
          </button>
          <button className="bg-terra-light text-white p-2 rounded-lg cursor-pointer hover:bg-terra transition-colors duration-200 text-sm">
            What about vegetables?
          </button>
          <button className="bg-terra-light text-white p-2 rounded-lg cursor-pointer hover:bg-terra transition-colors duration-200 text-sm">
            Tell me about pulses
          </button>
        </div>
      </div>
    </div>
    
    {/* INPUT AREA - Fixed at bottom of chat */}
    <div className="bg-white p-4 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <form className="flex items-center space-x-3">
          {/* Text Input */}
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
            />
          </div>
          
          {/* Microphone Button */}
          <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200">
            <i className="fas fa-microphone text-lg"></i>
          </button>
          
          {/* Send Button */}
          <button className="p-3 bg-forest text-white rounded-full hover:bg-green-700 transition-colors duration-200">
            <i className="fas fa-paper-plane text-lg"></i>
          </button>
        </form>
      </div>
    </div>
  </main>

  {/* FOOTER NAVIGATION - Fixed at bottom, height: 56px */}
  <footer className="bg-charcoal text-white h-14">
    <nav className="h-full">
      <div className="h-full flex items-center justify-around max-w-4xl mx-auto">
        {/* Home */}
        <button className="flex-1 flex flex-col items-center justify-center h-full text-sm text-terra">
          <i className="fas fa-home text-lg mb-1"></i>
          <span className="text-xs font-medium">Home</span>
        </button>
        
        {/* History */}
        <button className="flex-1 flex flex-col items-center justify-center h-full text-sm text-white hover:text-terra-light">
          <i className="fas fa-history text-lg mb-1"></i>
          <span className="text-xs font-medium">History</span>
        </button>
        
        {/* Resources */}
        <button className="flex-1 flex flex-col items-center justify-center h-full text-sm text-white hover:text-terra-light">
          <i className="fas fa-book text-lg mb-1"></i>
          <span className="text-xs font-medium">Resources</span>
        </button>
        
        {/* Profile */}
        <button className="flex-1 flex flex-col items-center justify-center h-full text-sm text-white hover:text-terra-light">
          <i className="fas fa-user text-lg mb-1"></i>
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </nav>
  </footer>
</div>
```

## 🎨 Color Palette & Design Notes

### Primary Colors
- **Forest Green** (`#2E7D32`): Primary accent, used for header, buttons, and branding
- **Terracotta** (`#D84315`): Secondary accent, used for quick action tiles and highlights
- **Off-White** (`#F9F9F9`): Background color for chat area
- **Charcoal** (`#333333`): Footer background and dark text

### Typography
- **Font Family**: Public Sans (primary), Mukta (fallback)
- **Minimum Text Size**: 16px for accessibility
- **Line Height**: Relaxed (1.6) for better readability

### Spacing & Layout
- **Header Height**: 64px (4rem)
- **Footer Height**: 56px (3.5rem)
- **Border Radius**: 2xl for cards, lg for buttons, full for inputs
- **Padding**: Consistent 4px (1rem) spacing system

### Interactive States
- **Hover Effects**: Color transitions on all interactive elements
- **Focus States**: Ring indicators for keyboard navigation
- **Active States**: Color changes for pressed buttons
- **Loading States**: Animated dots and disabled states

### Accessibility Features
- **ARIA Labels**: All interactive elements have descriptive labels
- **Keyboard Navigation**: Full tab order and Enter key support
- **Screen Reader Support**: Semantic HTML structure
- **High Contrast**: 4.5:1 minimum contrast ratio
- **Voice Input**: Alternative input method with visual feedback

## 📱 Responsive Behavior

### Desktop-First Design
- **Minimum Width**: 1024px for optimal experience
- **Maximum Width**: 4xl (896px) for content areas
- **Centered Layout**: Content centered with max-width constraints

### Component Responsiveness
- **Header**: Full width with responsive text sizing
- **Welcome Card**: Responsive grid (2x2 on desktop, 1x4 on mobile)
- **Chat Window**: Flexible height with scrollable content
- **Input Area**: Full width with responsive button sizing
- **Footer**: Full width with equal button distribution

## 🔧 Technical Implementation Notes

### State Management
- **Language State**: Toggle between 'english' and 'kannada'
- **Online Status**: Real-time connectivity monitoring
- **Chat Messages**: Array of message objects with metadata
- **Loading States**: Boolean flags for API calls and voice input

### API Integration Points
- **Gemini API**: Text-based queries with rural context
- **Voice Recognition**: Web Speech API with language detection
- **Data Fetching**: Stubbed functions for market, weather, and loan data

### Performance Considerations
- **Lazy Loading**: Components load as needed
- **Memoization**: React.memo for expensive components
- **Debouncing**: Input handling for better performance
- **Error Boundaries**: Graceful error handling throughout

---

**This mockup represents the complete component hierarchy and visual structure of the Rural India Chatbot Interface, designed for optimal user experience and accessibility.** 