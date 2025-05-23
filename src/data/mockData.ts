import { User, Conversation, Message, DailyStats, ChatbotConfig } from '../types';
import { addDays, subDays, format, subHours, subMinutes } from 'date-fns';

// Generate random users
export const users: User[] = [
  {
    id: 'admin-1',
    name: 'Jane Smith',
    email: 'jane@intercomai.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'admin',
    status: 'online',
    lastActive: new Date().toISOString(),
    createdAt: subDays(new Date(), 365).toISOString(),
  },
  {
    id: 'agent-1',
    name: 'Michael Johnson',
    email: 'michael@intercomai.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'agent',
    status: 'online',
    lastActive: new Date().toISOString(),
    createdAt: subDays(new Date(), 180).toISOString(),
  },
  {
    id: 'agent-2',
    name: 'Emily Davis',
    email: 'emily@intercomai.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'agent',
    status: 'away',
    lastActive: subHours(new Date(), 2).toISOString(),
    createdAt: subDays(new Date(), 150).toISOString(),
  },
  {
    id: 'customer-1',
    name: 'Alex Wilson',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'customer',
    status: 'offline',
    lastActive: subDays(new Date(), 1).toISOString(),
    createdAt: subDays(new Date(), 30).toISOString(),
  },
  {
    id: 'customer-2',
    name: 'Sarah Brown',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'customer',
    status: 'offline',
    lastActive: subHours(new Date(), 5).toISOString(),
    createdAt: subDays(new Date(), 45).toISOString(),
  },
  {
    id: 'customer-3',
    name: 'David Lee',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'customer',
    status: 'online',
    lastActive: new Date().toISOString(),
    createdAt: subDays(new Date(), 15).toISOString(),
  },
  {
    id: 'customer-4',
    name: 'Rachel Green',
    email: 'rachel@example.com',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'customer',
    status: 'offline',
    lastActive: subDays(new Date(), 3).toISOString(),
    createdAt: subDays(new Date(), 60).toISOString(),
  },
];

// Generate conversations
export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    customerId: 'customer-1',
    customerName: 'Alex Wilson',
    customerEmail: 'alex@example.com',
    customerAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    assignedTo: 'agent-1',
    status: 'open',
    priority: 'high',
    subject: 'Account login issues',
    lastMessage: 'I still can\'t log in to my account. Can you help me?',
    lastMessageTime: subMinutes(new Date(), 5).toISOString(),
    unreadCount: 2,
    tags: ['login', 'urgent', 'support'],
    createdAt: subDays(new Date(), 1).toISOString(),
  },
  {
    id: 'conv-2',
    customerId: 'customer-2',
    customerName: 'Sarah Brown',
    customerEmail: 'sarah@example.com',
    customerAvatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
    assignedTo: 'agent-2',
    status: 'pending',
    priority: 'medium',
    subject: 'Subscription renewal question',
    lastMessage: 'Thanks for the information. I\'ll review my options.',
    lastMessageTime: subHours(new Date(), 3).toISOString(),
    unreadCount: 0,
    tags: ['billing', 'subscription'],
    createdAt: subDays(new Date(), 3).toISOString(),
  },
  {
    id: 'conv-3',
    customerId: 'customer-3',
    customerName: 'David Lee',
    customerEmail: 'david@example.com',
    customerAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    assignedTo: null,
    status: 'open',
    priority: 'low',
    subject: 'Feature request',
    lastMessage: 'Is it possible to add an export function to the dashboard?',
    lastMessageTime: subMinutes(new Date(), 30).toISOString(),
    unreadCount: 1,
    tags: ['feature-request', 'dashboard'],
    createdAt: subDays(new Date(), 2).toISOString(),
  },
  {
    id: 'conv-4',
    customerId: 'customer-4',
    customerName: 'Rachel Green',
    customerEmail: 'rachel@example.com',
    customerAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    assignedTo: 'agent-1',
    status: 'closed',
    priority: 'medium',
    subject: 'API integration help',
    lastMessage: 'Thank you for your help. I was able to get it working!',
    lastMessageTime: subDays(new Date(), 1).toISOString(),
    unreadCount: 0,
    tags: ['api', 'integration', 'resolved'],
    createdAt: subDays(new Date(), 5).toISOString(),
  },
  {
    id: 'conv-5',
    customerId: 'customer-2',
    customerName: 'Sarah Brown',
    customerEmail: 'sarah@example.com',
    customerAvatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
    assignedTo: 'agent-2',
    status: 'open',
    priority: 'high',
    subject: 'Missing order',
    lastMessage: 'My order #34567 hasn\'t arrived yet. It\'s been 2 weeks now.',
    lastMessageTime: subHours(new Date(), 1).toISOString(),
    unreadCount: 3,
    tags: ['order', 'urgent', 'shipping'],
    createdAt: subDays(new Date(), 14).toISOString(),
  },
];

// Generate messages for a conversation
export const getMessagesForConversation = (conversationId: string): Message[] => {
  const conversation = conversations.find(c => c.id === conversationId);
  if (!conversation) return [];
  
  const customer = users.find(u => u.id === conversation.customerId);
  const agent = users.find(u => u.id === conversation.assignedTo);
  
  const messages: Message[] = [];
  
  // Initial message
  messages.push({
    id: `msg-${conversationId}-1`,
    conversationId,
    senderId: conversation.customerId,
    senderType: 'user',
    content: `Hello, I\'m having an issue with ${conversation.subject.toLowerCase()}.`,
    timestamp: conversation.createdAt,
    isRead: true,
  });
  
  // Bot auto-response
  messages.push({
    id: `msg-${conversationId}-2`,
    conversationId,
    senderId: 'bot',
    senderType: 'bot',
    content: `Hi ${customer?.name || 'there'}! Thanks for reaching out. An agent will be with you shortly. In the meantime, can you provide more details about your issue?`,
    timestamp: subMinutes(new Date(conversation.createdAt), -5).toISOString(),
    isRead: true,
  });
  
  // Customer response
  messages.push({
    id: `msg-${conversationId}-3`,
    conversationId,
    senderId: conversation.customerId,
    senderType: 'user',
    content: conversationId === 'conv-1' 
      ? "I\'ve been trying to log in to my account but keep getting an \'invalid credentials\' error even though I\'m sure my password is correct."
      : conversationId === 'conv-2'
      ? "I noticed my subscription is about to renew, but I\'m considering changing plans. What are my options?"
      : conversationId === 'conv-3'
      ? "I really like your dashboard, but it would be great if I could export the data to CSV or Excel."
      : conversationId === 'conv-4'
      ? "I\'m trying to integrate your API with our system but I\'m getting a 401 error. Here\'s my API key: API-****."
      : "I ordered product #34567 two weeks ago and still haven\'t received it. The tracking number doesn\'t work either.",
    timestamp: subMinutes(new Date(conversation.createdAt), -15).toISOString(),
    isRead: true,
  });
  
  // Agent response if assigned
  if (agent) {
    messages.push({
      id: `msg-${conversationId}-4`,
      conversationId,
      senderId: agent.id,
      senderType: 'agent',
      content: conversationId === 'conv-1'
        ? `Hi ${customer?.name || 'there'}, I\'m ${agent.name}. Sorry to hear you\'re having trouble logging in. Have you tried resetting your password using the \'Forgot Password\' link?`
        : conversationId === 'conv-2'
        ? `Hello ${customer?.name || 'there'}, this is ${agent.name}. I\'d be happy to go over your subscription options. Currently, we offer Basic ($9/mo), Pro ($19/mo), and Enterprise ($49/mo) plans.`
        : conversationId === 'conv-4'
        ? `Hi ${customer?.name || 'there'}, ${agent.name} here. For security reasons, please don\'t share your full API key in messages. Let\'s try to troubleshoot your 401 error. Have you made sure to use the correct API endpoint?`
        : `Hello ${customer?.name || 'there'}, I\'m ${agent.name}. I\'m sorry to hear about your missing order. Let me look into this for you right away. Could you confirm your order number once more?`,
      timestamp: subMinutes(new Date(conversation.createdAt), -30).toISOString(),
      isRead: true,
    });
  }
  
  // Add the last message
  messages.push({
    id: `msg-${conversationId}-5`,
    conversationId,
    senderId: conversation.status === 'closed' ? (agent?.id || 'agent-1') : conversation.customerId,
    senderType: conversation.status === 'closed' ? 'agent' : 'user',
    content: conversation.lastMessage,
    timestamp: conversation.lastMessageTime,
    isRead: conversation.unreadCount === 0,
  });
  
  return messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};

// Generate analytics data
export const generateDailyStats = (): DailyStats[] => {
  const stats: DailyStats[] = [];
  const today = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = subDays(today, i);
    const dateString = format(date, 'yyyy-MM-dd');
    
    // Generate some random but somewhat realistic data
    const baseConversations = 20 + Math.floor(Math.random() * 30);
    const dayOfWeek = date.getDay();
    // Fewer conversations on weekends
    const conversations = dayOfWeek === 0 || dayOfWeek === 6 
      ? Math.floor(baseConversations * 0.7) 
      : baseConversations;
    
    const messages = conversations * (3 + Math.floor(Math.random() * 4));
    const resolvedConversations = Math.floor(conversations * (0.6 + Math.random() * 0.3));
    const newUsers = 5 + Math.floor(Math.random() * 10);
    
    stats.push({
      date: dateString,
      conversations,
      messages,
      resolvedConversations,
      newUsers,
    });
  }
  
  return stats;
};

export const dailyStats = generateDailyStats();

// Dashboard metrics
export const getDashboardMetrics = () => {
  const totalConversations = dailyStats.reduce((sum, day) => sum + day.conversations, 0);
  const totalMessages = dailyStats.reduce((sum, day) => sum + day.messages, 0);
  const resolvedConversations = dailyStats.reduce((sum, day) => sum + day.resolvedConversations, 0);
  const totalUsers = users.filter(u => u.role === 'customer').length;
  
  // Calculate percentages for today vs yesterday
  const today = dailyStats[dailyStats.length - 1];
  const yesterday = dailyStats[dailyStats.length - 2];
  
  const conversationsChange = ((today.conversations - yesterday.conversations) / yesterday.conversations) * 100;
  const messagesChange = ((today.messages - yesterday.messages) / yesterday.messages) * 100;
  const resolutionChange = ((today.resolvedConversations - yesterday.resolvedConversations) / yesterday.resolvedConversations) * 100;
  const usersChange = ((today.newUsers - yesterday.newUsers) / yesterday.newUsers) * 100;
  
  return {
    totalConversations,
    totalMessages,
    resolvedConversations,
    totalUsers,
    conversationsChange: Math.round(conversationsChange),
    messagesChange: Math.round(messagesChange),
    resolutionChange: Math.round(resolutionChange),
    usersChange: Math.round(usersChange),
    responseTime: '1h 23m',
    responseTimeChange: -12,
    satisfactionScore: 92,
    satisfactionScoreChange: 3,
  };
};

// Chatbot configuration
export const chatbotConfig: ChatbotConfig = {
  enabled: true,
  greeting: "Hi there! I\'m the IntercomAI assistant. How can I help you today?",
  model: "gemini-pro",
  temperature: 0.7,
  autoRespondCategories: ['billing', 'account', 'password-reset', 'general-info'],
  knowledgeBase: [
    'Our business hours are 9am-5pm EST Monday through Friday.',
    'Password reset links are valid for 24 hours after being sent.',
    'We offer Basic ($9/mo), Pro ($19/mo), and Enterprise ($49/mo) subscription plans.',
    'Refunds can be processed within 30 days of purchase.',
    'Our support team typically responds within 1-2 business hours.'
  ]
};

// Initial dummy chatbot responses (simulating Gemini API)
export const getDummyChatbotResponse = (message: string): ChatbotResponse => {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('password') || lowercaseMessage.includes('reset') || lowercaseMessage.includes('login')) {
    return {
      text: "To reset your password, please go to the login page and click \'Forgot Password\'. You\'ll receive an email with instructions to create a new password. The reset link is valid for 24 hours.",
      confidence: 0.92
    };
  } else if (lowercaseMessage.includes('price') || lowercaseMessage.includes('plan') || lowercaseMessage.includes('subscription') || lowercaseMessage.includes('cost')) {
    return {
      text: "We offer three subscription plans: Basic ($9/mo) which includes core features, Pro ($19/mo) with advanced analytics, and Enterprise ($49/mo) with dedicated support and custom integrations. Would you like more details about any specific plan?",
      confidence: 0.89
    };
  } else if (lowercaseMessage.includes('refund') || lowercaseMessage.includes('money back')) {
    return {
      text: "We offer full refunds within 30 days of purchase. To request a refund, please email billing@intercomai.com with your order details. Our team will process your request within 3-5 business days.",
      confidence: 0.87
    };
  } else if (lowercaseMessage.includes('contact') || lowercaseMessage.includes('support') || lowercaseMessage.includes('help')) {
    return {
      text: "Our support team is available Monday through Friday, 9am-5pm EST. You can reach us via email at support@intercomai.com or through this chat. Is there something specific I can help you with today?",
      confidence: 0.95
    };
  } else {
    return {
      text: "Thank you for your message. I\'m not quite sure how to help with that specific request. Would you like me to connect you with a human agent who can assist you further?",
      confidence: 0.65
    };
  }
};