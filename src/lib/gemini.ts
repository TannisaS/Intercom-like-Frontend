import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getChatbotResponse(message: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: [],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    
    return {
      text: response.text(),
      confidence: 0.9 // Gemini doesn't provide confidence scores, so we use a default
    };
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return {
      text: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
      confidence: 0
    };
  }
}