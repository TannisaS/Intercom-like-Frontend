import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { dailyStats } from '../../data/mockData';
import { format, parseISO } from 'date-fns';

const ActivityChart: React.FC = () => {
  // Format data for chart
  const chartData = dailyStats
    .slice(-14) // Get last 14 days
    .map(day => ({
      date: day.date,
      conversations: day.conversations,
      messages: day.messages,
      resolved: day.resolvedConversations,
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
          <p className="font-medium text-xs text-gray-600 mb-2">
            {format(parseISO(label), 'MMM d, yyyy')}
          </p>
          {payload.map((entry: any) => (
            <div key={entry.name} className="flex items-center gap-2 text-sm">
              <div 
                className="h-3 w-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="capitalize">{entry.name}:</span>
              <span className="font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Conversation Activity</h3>
        <p className="text-sm text-gray-500">Last 14 days of activity</p>
      </div>
      
      <div className="p-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
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
              <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
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
              tickFormatter={(value) => value}
              width={35}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-sm capitalize">{value}</span>}
            />
            <Area 
              type="monotone" 
              dataKey="conversations" 
              stroke="#4F46E5" 
              fill="url(#colorConversations)" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Area 
              type="monotone" 
              dataKey="messages" 
              stroke="#0D9488" 
              fill="url(#colorMessages)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Area 
              type="monotone" 
              dataKey="resolved" 
              stroke="#9333EA" 
              fill="url(#colorResolved)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;