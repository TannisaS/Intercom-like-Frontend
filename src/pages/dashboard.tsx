import React from 'react';
import Layout from '../components/layout/layout';
import MetricCard from '../components/dashboard/metric-card';
import RecentConversations from '../components/dashboard/recent-conversations';
import ActivityChart from '../components/dashboard/activity-chart';
import { getDashboardMetrics } from '../data/mockData';
import { MessageCircle, Users, CheckCircle, Clock, BarChart, ThumbsUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const metrics = getDashboardMetrics();
  
  const metricCards = [
    {
      title: 'Total Conversations',
      value: metrics.totalConversations,
      change: metrics.conversationsChange,
      trend: metrics.conversationsChange > 0 ? 'up' as const : 'down' as const,
      icon: <MessageCircle className="h-6 w-6 text-primary-500" />,
    },
    {
      title: 'Total Messages',
      value: metrics.totalMessages,
      change: metrics.messagesChange,
      trend: metrics.messagesChange > 0 ? 'up' as const : 'down' as const,
      icon: <MessageCircle className="h-6 w-6 text-secondary-500" />,
    },
    {
      title: 'Resolved Conversations',
      value: metrics.resolvedConversations,
      change: metrics.resolutionChange,
      trend: metrics.resolutionChange > 0 ? 'up' as const : 'down' as const,
      icon: <CheckCircle className="h-6 w-6 text-success-500" />,
    },
    {
      title: 'Total Users',
      value: metrics.totalUsers,
      change: metrics.usersChange,
      trend: metrics.usersChange > 0 ? 'up' as const : 'down' as const,
      icon: <Users className="h-6 w-6 text-accent-500" />,
    },
    {
      title: 'Average Response Time',
      value: metrics.responseTime,
      change: metrics.responseTimeChange,
      trend: metrics.responseTimeChange < 0 ? 'up' as const : 'down' as const,
      icon: <Clock className="h-6 w-6 text-warning-500" />,
    },
    {
      title: 'Satisfaction Score',
      value: `${metrics.satisfactionScore}%`,
      change: metrics.satisfactionScoreChange,
      trend: metrics.satisfactionScoreChange > 0 ? 'up' as const : 'down' as const,
      icon: <ThumbsUp className="h-6 w-6 text-success-500" />,
    },
  ];

  return (
    <Layout 
      title="Dashboard" 
      subtitle="Welcome back, Jane!"
      showSearch={false}
      showActions={true}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <RecentConversations />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;