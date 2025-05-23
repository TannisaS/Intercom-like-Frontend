import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { dailyStats } from '../data/mockData';
import { format, parseISO, subDays } from 'date-fns';

const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  
  // Get data based on time range
  const getFilteredData = () => {
    switch(timeRange) {
      case '7d':
        return dailyStats.slice(-7);
      case '14d':
        return dailyStats.slice(-14);
      case '30d':
      default:
        return dailyStats;
    }
  };
  
  const filteredData = getFilteredData();
  
  // Prepare data for pie chart
  const statusDistribution = [
    { name: 'Open', value: 42, color: '#4F46E5' },
    { name: 'Pending', value: 28, color: '#F59E0B' },
    { name: 'Closed', value: 85, color: '#22C55E' },
  ];
  
  // Prepare data for bar chart
  const responseTimeData = [
    { day: 'Mon', responseTime: 65 },
    { day: 'Tue', responseTime: 59 },
    { day: 'Wed', responseTime: 80 },
    { day: 'Thu', responseTime: 71 },
    { day: 'Fri', responseTime: 56 },
    { day: 'Sat', responseTime: 45 },
    { day: 'Sun', responseTime: 42 },
  ];
  
  return (
    <Layout 
      title="Analytics" 
      subtitle="Track and analyze conversation metrics"
      showSearch={false}
      showActions={false}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Overview</h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setTimeRange('7d')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              timeRange === '7d' ? 'bg-primary-100 text-primary-700' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Last 7 days
          </button>
          <button 
            onClick={() => setTimeRange('14d')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              timeRange === '14d' ? 'bg-primary-100 text-primary-700' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Last 14 days
          </button>
          <button 
            onClick={() => setTimeRange('30d')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md ${
              timeRange === '30d' ? 'bg-primary-100 text-primary-700' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Last 30 days
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation Activity</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorConversations" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(parseISO(date), 'MMM d')}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                />
                <Tooltip 
                  formatter={(value: any) => [value, '']}
                  labelFormatter={(label) => format(parseISO(label), 'MMM d, yyyy')}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="circle"
                  iconSize={8}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversations" 
                  name="Conversations"
                  stroke="#4F46E5" 
                  fill="url(#colorConversations)" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="messages" 
                  name="Messages"
                  stroke="#0D9488" 
                  fill="url(#colorMessages)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Rate</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333EA" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#9333EA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(parseISO(date), 'MMM d')}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                />
                <Tooltip 
                  formatter={(value: any) => [value, '']}
                  labelFormatter={(label) => format(parseISO(label), 'MMM d, yyyy')}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="circle"
                  iconSize={8}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversations" 
                  name="New Conversations"
                  stroke="#9333EA" 
                  fill="url(#colorCreated)" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="resolvedConversations" 
                  name="Resolved"
                  stroke="#22C55E" 
                  fill="url(#colorResolved)"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation Status</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => [value, 'Conversations']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Time by Day</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={responseTimeData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                  unit="m"
                />
                <Tooltip formatter={(value: any) => [`${value} minutes`, 'Avg. Response Time']} />
                <Bar 
                  dataKey="responseTime" 
                  name="Response Time" 
                  fill="#4F46E5" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">New Users</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={filteredData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333EA" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#9333EA" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(parseISO(date), 'MMM d')}
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={35}
                />
                <Tooltip 
                  formatter={(value: any) => [value, 'New Users']}
                  labelFormatter={(label) => format(parseISO(label), 'MMM d, yyyy')}
                />
                <Area 
                  type="monotone" 
                  dataKey="newUsers" 
                  name="New Users"
                  stroke="#9333EA" 
                  fill="url(#colorUsers)" 
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;