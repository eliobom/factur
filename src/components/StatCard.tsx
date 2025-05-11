import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  changeType = 'neutral'
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 transform transition-transform duration-200 hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-full">
          {icon}
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center">
          {changeType === 'positive' ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : changeType === 'negative' ? (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          ) : null}
          <span className={`text-sm font-medium ${
            changeType === 'positive' 
              ? 'text-green-500' 
              : changeType === 'negative' 
                ? 'text-red-500' 
                : 'text-gray-500'
          }`}>
            {change} desde el mes pasado
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;