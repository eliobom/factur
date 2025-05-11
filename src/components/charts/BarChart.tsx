import React from 'react';

interface DataPoint {
  name: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500',
  ];
  
  return (
    <div className="w-full h-full flex items-center">
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        
        return (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="text-xs text-gray-500 mb-1">{item.value}</div>
            <div className="w-full flex justify-center">
              <div 
                className={`${colors[index % colors.length]} w-8 rounded-t-sm`}
                style={{ height: `${percentage * 0.8}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1 truncate w-full text-center">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;