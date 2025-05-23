import React, { useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getMessagesForConversation, users } from '../../data/mockData';
import { formatDateTime, getInitials } from '../../lib/utils';
import { Message as MessageType } from '../../types';

interface MessageProps {
  message: MessageType;
  isCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = ({ message, isCurrentUser }) => {
  const sender = users.find(u => u.id === message.senderId);
  const isBot = message.senderType === 'bot';
  
  return (
    <div className={`flex gap-3 mb-6 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <Avatar className="mt-1">
        {isBot ? (
          <>
            <AvatarImage src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=150" />
            <AvatarFallback>AI</AvatarFallback>
          </>
        ) : (
          <>
            <AvatarImage src={sender?.avatar} />
            <AvatarFallback>{getInitials(sender?.name || 'Unknown')}</AvatarFallback>
          </>
        )}
      </Avatar>
      
      <div className={`max-w-[75%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm text-gray-900">
            {isBot ? 'IntercomAI Bot' : sender?.name || 'Unknown'}
          </span>
          <span className="text-xs text-gray-500">{formatDateTime(message.timestamp)}</span>
        </div>
        
        <div className={`rounded-lg px-4 py-3 ${
          isCurrentUser 
            ? 'bg-primary-500 text-white' 
            : isBot
            ? 'bg-secondary-50 border border-secondary-100 text-gray-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    </div>
  );
};

interface MessageListProps {
  conversationId: string;
}

const MessageList: React.FC<MessageListProps> = ({ conversationId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messages = getMessagesForConversation(conversationId);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-4xl mx-auto">
        {messages.map((message) => (
          <Message 
            key={message.id} 
            message={message} 
            isCurrentUser={message.senderType === 'agent'} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;