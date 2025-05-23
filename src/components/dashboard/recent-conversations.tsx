import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { conversations, users } from '../../data/mockData';
import { formatDateTime, getStatusColor, getInitials, getNameForId } from '../../lib/utils';
import { Link } from 'react-router-dom';

const RecentConversations: React.FC = () => {
  // Get 5 most recent conversations
  const recentConversations = [...conversations]
    .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Conversations</h3>
        <p className="text-sm text-gray-500">Latest customer interactions</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {recentConversations.map((conversation) => (
          <div key={conversation.id} className="hover:bg-gray-50 transition-colors">
            <Link 
              to={`/conversations/${conversation.id}`}
              className="flex items-center gap-4 p-4"
            >
              <Avatar>
                <AvatarImage src={conversation.customerAvatar} />
                <AvatarFallback>{getInitials(conversation.customerName)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">{conversation.customerName}</h4>
                  <span className="text-xs text-gray-500">{formatDateTime(conversation.lastMessageTime)}</span>
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
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
                  
                  <div className="text-xs text-gray-500 ml-auto">
                    Assigned to: {getNameForId(conversation.assignedTo, users)}
                  </div>
                </div>
              </div>
              
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </Link>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200">
        <Link 
          to="/conversations"
          className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1"
        >
          View all conversations
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default RecentConversations;