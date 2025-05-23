import React from 'react';
import ConversationList from '../../components/conversations/conversation-list';

const ConversationListView: React.FC = () => {
  return (
    <div className="flex h-full">
      <ConversationList />
      <div className="flex-1 flex items-center justify-center bg-gray-50 border-l border-gray-200">
        <div className="text-center p-6">
          <div className="bg-gray-100 p-4 inline-block rounded-full mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Select a conversation</h3>
          <p className="text-gray-500 text-sm">Choose a conversation from the list to view messages</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationListView;