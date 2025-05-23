import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { conversations, users } from '../../data/mockData';
import { formatDate, getInitials, getStatusColor, getNameForId } from '../../lib/utils';
import { Conversation } from '../../types';

interface ConversationListProps {
  selectedId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ selectedId }) => {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const navigate = useNavigate();
  
  const filteredConversations = conversations.filter(conv => {
    if (filter === 'open' && conv.status !== 'open') return false;
    if (filter === 'closed' && conv.status !== 'closed') return false;
    if (filter === 'pending' && conv.status !== 'pending') return false;
    if (filter === 'unassigned' && conv.assignedTo !== null) return false;
    
    // Search logic
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        conv.customerName.toLowerCase().includes(query) ||
        conv.customerEmail.toLowerCase().includes(query) ||
        conv.subject.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const handleSelect = (conv: Conversation) => {
    navigate(`/conversations/${conv.id}`);
  };

  return (
    <div className="bg-white border-r border-gray-200 h-full flex flex-col w-full md:w-80 lg:w-96">
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <div className="flex space-x-1 text-sm">
            <button 
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md ${
                filter === 'all' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('open')}
              className={`px-2.5 py-1 rounded-md ${
                filter === 'open' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Open
            </button>
            <button 
              onClick={() => setFilter('pending')}
              className={`px-2.5 py-1 rounded-md ${
                filter === 'pending' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('closed')}
              className={`px-2.5 py-1 rounded-md ${
                filter === 'closed' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Closed
            </button>
            <button 
              onClick={() => setFilter('unassigned')}
              className={`px-2.5 py-1 rounded-md ${
                filter === 'unassigned' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Unassigned
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="bg-gray-100 p-3 rounded-full">
              <Search className="h-6 w-6 text-gray-500" />
            </div>
            <h3 className="mt-4 text-gray-700 font-medium">No conversations found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredConversations.map((conversation) => (
              <div 
                key={conversation.id}
                onClick={() => handleSelect(conversation)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                  selectedId === conversation.id ? 'bg-primary-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={conversation.customerAvatar} />
                      <AvatarFallback>{getInitials(conversation.customerName)}</AvatarFallback>
                    </Avatar>
                    {conversation.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-sm text-gray-900 truncate">{conversation.customerName}</h3>
                      <span className="text-xs text-gray-500">{formatDate(conversation.lastMessageTime)}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mt-0.5 truncate">{conversation.subject}</p>
                    <p className="text-xs text-gray-500 mt-1 truncate">{conversation.lastMessage}</p>
                    
                    <div className="flex items-center mt-2 gap-2">
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${
                        conversation.status === 'open' ? 'bg-primary-50 text-primary-700' :
                        conversation.status === 'pending' ? 'bg-warning-50 text-warning-700' :
                        'bg-success-50 text-success-700'
                      }`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${getStatusColor(conversation.status)}`}></div>
                        <span className="capitalize">{conversation.status}</span>
                      </div>
                      
                      <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs ${
                        conversation.priority === 'high' ? 'bg-error-50 text-error-700' :
                        conversation.priority === 'medium' ? 'bg-warning-50 text-warning-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        <span className="capitalize">{conversation.priority}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;