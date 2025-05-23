// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'agent' | 'customer';
  status: 'online' | 'offline' | 'away';
  lastActive: string;
  createdAt: string;
}

// Conversation types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'user' | 'agent' | 'bot';
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  assignedTo: string | null;
  status: 'open' | 'closed' | 'pending';
  priority: 'low' | 'medium' | 'high';
  subject: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  tags: string[];
  createdAt: string;
}

// Analytics types
export interface DailyStats {
  date: string;
  conversations: number;
  messages: number;
  resolvedConversations: number;
  newUsers: number;
}

export interface MetricCard {
  title: string;
  value: number | string;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'neutral';
}

// AI Chatbot types
export interface ChatbotConfig {
  enabled: boolean;
  greeting: string;
  model: string;
  temperature: number;
  autoRespondCategories: string[];
  knowledgeBase: string[];
}

export interface ChatbotResponse {
  text: string;
  confidence: number;
  sources?: string[];
}