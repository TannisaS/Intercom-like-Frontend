# IntercomAI Admin Panel

A modern customer support platform with AI-powered chat assistance built with React and Gemini AI.

[Live Demo]() <!-- Add your deployment URL here -->

![IntercomAI Screenshot](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200)

## Features

- 💬 Real-time conversation management
- 🤖 AI-powered chat assistance using Google's Gemini API
- 📊 Conversation tracking and management
- 🏷️ Tag and categorize conversations
- 👥 Customer information tracking
- 🎯 Priority and status management
- 📱 Responsive design for all devices

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Google Generative AI (Gemini)
- Lucide Icons
- React Router

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── data/             # Mock data and types
├── lib/              # Utility functions and API clients
├── pages/            # Page components
└── types/            # TypeScript type definitions
```

## Environment Variables

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.