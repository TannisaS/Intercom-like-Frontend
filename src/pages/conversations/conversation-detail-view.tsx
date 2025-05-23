import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ConversationList from '../../components/conversations/conversation-list';
import MessageList from '../../components/conversations/message-list';
import MessageInput from '../../components/conversations/message-input';
import ConversationDetails from '../../components/conversations/conversation-details';
import { conversations, getDummyChatbotResponse } from '../../data/mockData';

const ConversationDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(true);
  const [showConversationList, setShowConversationList] = useState(true);
  
  const conversation = id ? conversations.find(c => c.id === id) : null;
  
  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>Conversation not found</p>
      </div>
    );
  }
  
  const handleSendMessage = (content: string, useAI: boolean = false) => {
    // This would normally update the database and trigger a re-render
    console.log(`Sending message: ${content}, Use AI: ${useAI}`);
    
    // Simulate AI response if requested
    if (useAI) {
      // Get AI response from the dummy function
      const aiResponse = getDummyChatbotResponse(content);
      console.log('AI Response:', aiResponse);
    }
  };
  
  const toggleConversationList = () => {
    setShowConversationList(!showConversationList);
  };
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="flex h-full overflow-hidden">
      {showConversationList && (
        <div className="w-[400px] flex-shrink-0 overflow-hidden">
          <ConversationList selectedId={id} />
        </div>
      )}
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="border-b border-gray-200 p-4 flex items-center justify-between bg-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleConversationList} 
              className="md:hidden p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div>
              <h2 className="text-lg font-medium text-gray-900">{conversation.subject}</h2>
              <p className="text-sm text-gray-500">with {conversation.customerName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleDetails}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                showDetails 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          </div>
        </div>
        
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <MessageList conversationId={id} />
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
          
          {showDetails && (
            <div className="w-[300px] flex-shrink-0 overflow-y-auto">
              <ConversationDetails conversationId={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationDetailView;