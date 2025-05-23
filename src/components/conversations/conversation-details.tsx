import React from 'react';
import { 
  Clock, 
  Tag, 
  User, 
  Mail, 
  Calendar, 
  MoreVertical,
  XCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { conversations, users } from '../../data/mockData';
import { formatDate, formatDateTime } from '../../lib/utils';

interface ConversationDetailsProps {
  conversationId: string;
}

const ConversationDetails: React.FC<ConversationDetailsProps> = ({ conversationId }) => {
  const conversation = conversations.find(c => c.id === conversationId);
  
  if (!conversation) {
    return <div className="p-4">Conversation not found</div>;
  }

  const customer = users.find(u => u.id === conversation.customerId);
  const assignedAgent = users.find(u => u.id === conversation.assignedTo);

  return (
    <div className="border-l border-gray-200 bg-white w-72 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Conversation Details</h3>
        <button className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Status</h4>
        <div className="flex gap-2">
          <button className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1 text-sm font-medium ${
            conversation.status === 'open' 
              ? 'bg-primary-100 text-primary-700 border border-primary-200' 
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
            <AlertCircle className="h-3.5 w-3.5" />
            <span>Open</span>
          </button>
          
          <button className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1 text-sm font-medium ${
            conversation.status === 'pending' 
              ? 'bg-warning-100 text-warning-700 border border-warning-200' 
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
            <Clock className="h-3.5 w-3.5" />
            <span>Pending</span>
          </button>
          
          <button className={`flex-1 py-1.5 rounded-md flex items-center justify-center gap-1 text-sm font-medium ${
            conversation.status === 'closed' 
              ? 'bg-success-100 text-success-700 border border-success-200' 
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Closed</span>
          </button>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Priority</h4>
        <div className="flex gap-2">
          <button className={`flex-1 py-1.5 rounded-md text-sm font-medium ${
            conversation.priority === 'low' 
              ? 'bg-gray-100 text-gray-700 border border-gray-200' 
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
            Low
          </button>
          
          <button className={`flex-1 py-1.5 rounded-md text-sm font-medium ${
            conversation.priority === 'medium' 
              ? 'bg-warning-100 text-warning-700 border border-warning-200' 
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
            Medium
          </button>
          
          <button className={`flex-1 py-1.5 rounded-md text-sm font-medium ${
            conversation.priority === 'high' 
              ? 'bg-error-100 text-error-700 border border-error-200' 
              : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}>
            High
          </button>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Assigned To</h4>
        {assignedAgent ? (
          <div className="flex items-center gap-3">
            <img 
              src={assignedAgent.avatar} 
              alt={assignedAgent.name} 
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{assignedAgent.name}</p>
              <p className="text-xs text-gray-500">{assignedAgent.email}</p>
            </div>
          </div>
        ) : (
          <button className="w-full py-1.5 border border-dashed border-gray-300 rounded-md text-sm font-medium text-primary-600 hover:bg-primary-50 transition-colors">
            Assign to agent
          </button>
        )}
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Customer Information</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900">{customer?.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900">{customer?.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-gray-900">Customer since {formatDate(customer?.createdAt || '')}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900">Tags</h4>
          <button className="text-xs text-primary-600 hover:text-primary-700">+ Add</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {conversation.tags.map((tag, index) => (
            <div 
              key={index}
              className="bg-gray-100 text-gray-800 rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1"
            >
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-900">Timeline</h4>
          <button className="text-xs text-primary-600 hover:text-primary-700">View all</button>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="h-4 w-4 rounded-full bg-primary-100 border-2 border-primary-500 mt-1"></div>
            <div>
              <p className="text-xs text-gray-900">Conversation created</p>
              <p className="text-xs text-gray-500">{formatDateTime(conversation.createdAt)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-4 w-4 rounded-full bg-success-100 border-2 border-success-500 mt-1"></div>
            <div>
              <p className="text-xs text-gray-900">
                {assignedAgent ? `Assigned to ${assignedAgent.name}` : 'Bot auto-response sent'}
              </p>
              <p className="text-xs text-gray-500">{formatDateTime(new Date(new Date(conversation.createdAt).getTime() + 5 * 60000).toISOString())}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-4 w-4 rounded-full bg-warning-100 border-2 border-warning-500 mt-1"></div>
            <div>
              <p className="text-xs text-gray-900">Last message received</p>
              <p className="text-xs text-gray-500">{formatDateTime(conversation.lastMessageTime)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationDetails;