# Rural India Chatbot Interface

A beautiful, intuitive desktop web chatbot interface designed specifically for rural India communities including farmers, MSME owners, SHG members, and rural youth. Built with React, Tailwind CSS, and integrated with Google's Gemini API.

## 🌟 Features

### Core Functionality
- **Bilingual Support**: English and Kannada language interface
- **Voice Input**: Web Speech API integration for hands-free interaction
- **AI-Powered Responses**: Google Gemini API integration for intelligent responses
- **Real-time Connectivity**: Online/offline status indicator
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support

### Rural-Specific Features
- **Crop Advice**: AI-powered agricultural guidance
- **Market Prices**: Real-time market information (stubbed data)
- **Loan Information**: SHG and agricultural loan details
- **Weather Updates**: Local weather forecasts (stubbed data)
- **Skill Development**: Business and farming tips

### UI/UX Design
- **Rural Color Palette**: Forest green (#2E7D32) and terracotta (#D84315)
- **Clean Interface**: Minimalist design inspired by Gemini's UI
- **Responsive Layout**: Optimized for desktop use
- **Quick Actions**: One-tap access to common queries
- **Message History**: Persistent chat interface

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone or download the project**
   ```bash
   # If you have the files, navigate to the project directory
   cd "Chatbot Demo"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Gemini API**
   - Create a `.env` file in the project root
   - Add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   **To get a Gemini API key:**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key and paste it in your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The chatbot interface should now be running!

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── Header.jsx       # Top navigation with language toggle
│   ├── WelcomeCard.jsx  # Initial greeting and quick actions
│   ├── ChatWindow.jsx   # Message display and quick replies
│   ├── InputArea.jsx    # Text input and voice recognition
│   └── FooterNav.jsx    # Bottom navigation
├── utils/
│   └── geminiApi.js     # Gemini API integration and data fetching
├── App.jsx              # Main application component
├── main.jsx             # React entry point
└── index.css            # Tailwind CSS and custom styles
```

## 🎨 Component Descriptions

### Header Component (`<Header />`)
- **Purpose**: Top navigation bar with branding and controls
- **Features**:
  - Language toggle (English/Kannada)
  - Online/offline status indicator
  - Rural Assistant branding with leaf icon
- **Accessibility**: ARIA labels and keyboard navigation

### Welcome Card (`<WelcomeCard />`)
- **Purpose**: Initial greeting and quick action tiles
- **Features**:
  - Friendly farmer avatar
  - 2x2 grid of quick action buttons
  - Bilingual greeting messages
- **Quick Actions**: Crop Advice, Market Prices, Group Loans, Skill Tips

### Chat Window (`<ChatWindow />`)
- **Purpose**: Main conversation interface
- **Features**:
  - Message bubbles with timestamps
  - Auto-scroll to latest messages
  - Quick reply suggestions
  - Loading indicators
  - Empty state messaging

### Input Area (`<InputArea />`)
- **Purpose**: Message input and voice recognition
- **Features**:
  - Text input with Enter key support
  - Voice input with microphone button
  - Real-time listening indicator
  - Error handling for unsupported browsers
- **Voice Support**: Web Speech API with English/Kannada recognition

### Footer Navigation (`<FooterNav />`)
- **Purpose**: Bottom navigation for different sections
- **Features**:
  - Home, History, Resources, Profile tabs
  - Active state highlighting
  - Bilingual labels

## 🔧 Configuration

### Tailwind CSS Theme
The project uses a custom rural-themed color palette:

```javascript
// tailwind.config.js
colors: {
  'forest': '#2E7D32',      // Primary accent - deep forest green
  'terra': '#D84315',       // Secondary accent - warm terracotta
  'terra-light': '#FF8A65', // Light terracotta for hover states
  'terra-dark': '#BF360C',  // Dark terracotta for active states
  'off-white': '#F9F9F9',   // Neutral off-white
  'charcoal': '#333333',    // Dark charcoal
}
```

### Environment Variables
```env
# Required: Your Gemini API key
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

## 📱 Accessibility Features

- **Minimum Text Size**: 16px for all text elements
- **High Contrast**: 4.5:1 contrast ratio maintained
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Focus Indicators**: Clear focus states for all interactive elements
- **Voice Input**: Alternative input method for users with motor difficulties

## 🔌 API Integration

### Gemini API
The chatbot integrates with Google's Gemini API for intelligent responses:

```javascript
// Example API call
const response = await queryGemini("What crops should I plant this season?", "english")
```

### Stubbed Data Functions
The project includes placeholder functions for real-world data:

- `fetchMarketPrices()` - Agricultural market data
- `fetchWeatherData()` - Local weather information  
- `fetchLoanRates()` - Banking and loan information

These functions can be replaced with actual API calls to government data sources, weather APIs, or banking APIs.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the `gh-pages` package
- **Traditional Hosting**: Upload the `dist` folder to your web server

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Ensure your `.env` file is in the project root
   - Check that the key starts with `VITE_`
   - Verify the key is valid in Google AI Studio

2. **Voice Input Not Working**
   - Ensure you're using a supported browser (Chrome, Edge, Safari)
   - Allow microphone permissions when prompted
   - Check that you're on HTTPS (required for voice input)

3. **Styling Issues**
   - Clear browser cache
   - Ensure Tailwind CSS is properly installed
   - Check that all dependencies are installed

### Browser Support
- **Chrome**: Full support (including voice input)
- **Firefox**: Full support (voice input may be limited)
- **Safari**: Full support (voice input may be limited)
- **Edge**: Full support (including voice input)

## 🤝 Contributing

This project is designed for rural Indian communities. When contributing:

1. Maintain bilingual support (English/Kannada)
2. Keep accessibility in mind
3. Test with rural users when possible
4. Consider low-bandwidth scenarios
5. Ensure cultural sensitivity in content

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Rural Indian communities for inspiration
- Font Awesome for icons
- Google Fonts for typography
- Tailwind CSS for styling framework

---

**Built with ❤️ for Rural India** 