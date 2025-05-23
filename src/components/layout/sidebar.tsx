import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '../../lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, count, isCollapsed }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => cn(
      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
      isActive 
        ? 'bg-primary-100 text-primary-700' 
        : 'text-gray-600 hover:bg-gray-100',
      isCollapsed && 'justify-center py-3 px-0'
    )}
  >
    <div className="text-xl">{icon}</div>
    {!isCollapsed && (
      <div className="flex-1 flex items-center justify-between">
        <span>{label}</span>
        {count !== undefined && (
          <span className="rounded-full bg-primary-500 text-white text-xs py-0.5 px-2 font-medium">
            {count}
          </span>
        )}
      </div>
    )}
  </NavLink>
);

interface SidebarProps {
  totalUnread: number;
}

const Sidebar: React.FC<SidebarProps> = ({ totalUnread }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="px-4 py-5 flex items-center justify-between border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary-500" />
            <span className="font-bold text-xl text-gray-800">IntercomAI</span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <NavItem 
          to="/conversations" 
          icon={<MessageCircle />} 
          label="Conversations" 
          count={totalUnread} 
          isCollapsed={isCollapsed} 
        />
      </nav>
      
      <div className={cn(
        "mt-auto border-t border-gray-200 p-4",
        isCollapsed && "flex justify-center"
      )}>
        {!isCollapsed ? (
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center w-full gap-3 hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <Avatar>
                <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">Jane Smith</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {showUserMenu && (
              <div className="absolute bottom-full left-0 w-full bg-white rounded-lg shadow-popup mb-2 border border-gray-200 py-1 animate-fade-in">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                  Preferences
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-gray-100 transition-colors">
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Avatar className="cursor-pointer hover:ring-2 hover:ring-primary-200 transition-all">
            <AvatarImage src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;