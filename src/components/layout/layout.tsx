import React, { ReactNode } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import { conversations } from '../../data/mockData';

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  showActions?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  subtitle, 
  showSearch, 
  showActions 
}) => {
  // Calculate total unread messages across all conversations
  const totalUnread = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar totalUnread={totalUnread} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={title} 
          subtitle={subtitle} 
          showSearch={showSearch} 
          showActions={showActions} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;