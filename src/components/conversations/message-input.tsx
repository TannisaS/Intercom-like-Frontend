import React, { useState } from 'react';
import { Paperclip, Send, Bot } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string, useAI?: boolean) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [useAI, setUseAI] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message, useAI);
      setMessage('');
    }
  };
  
  return (
    <div className="border-t border-gray-200 p-4 bg-white">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="w-full border border-gray-300 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all resize-none min-h-[100px]"
          />
          <button 
            type="button"
            className="absolute bottom-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <Paperclip className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setUseAI(!useAI)}
            className={`flex items-center gap-2 py-1.5 px-3 rounded-md transition-colors ${
              useAI 
                ? 'bg-secondary-100 text-secondary-800' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Bot className="h-4 w-4" />
            <span className="text-sm font-medium">
              {useAI ? 'AI Assistant Enabled' : 'Use AI Assistant'}
            </span>
          </button>
          
          <button 
            type="submit" 
            className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
          >
            <span>Send</span>
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;