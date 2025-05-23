import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { MetricCard as MetricCardType } from '../../types';

interface MetricCardProps {
  metric: MetricCardType;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const { title, value, change, trend, icon } = metric;
  
  const renderTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-success-500" />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-4 w-4 text-error-500" />;
    }
    return <Minus className="h-4 w-4 text-gray-400" />;
  };
  
  const getTrendTextColor = () => {
    if (trend === 'up') {
      return 'text-success-600';
    } else if (trend === 'down') {
      return 'text-error-600';
    }
    return 'text-gray-500';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6 animate-fade-in hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h3>
        </div>
        <div className={cn(
          "p-3 rounded-full",
          trend === 'up' ? 'bg-success-50' : 
          trend === 'down' ? 'bg-error-50' : 'bg-gray-100'
        )}>
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-1">
        {renderTrendIcon()}
        <span className={cn("text-sm font-medium", getTrendTextColor())}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-gray-500 ml-1">vs. yesterday</span>
      </div>
    </div>
  );
};

export default MetricCard;