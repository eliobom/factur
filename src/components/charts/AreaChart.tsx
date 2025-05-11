import React from 'react';

interface DataPoint {
  name: string;
  value: number;
}

interface AreaChartProps {
  data: DataPoint[];
}

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const padding = 20;
  const chartHeight = 200;
  const chartWidth = 500;
  
  // Renderizamos una visualización simplificada ya que no tenemos una biblioteca de gráficos real
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative flex-grow">
        <div className="absolute inset-0 flex items-end">
          {data.map((item, index) => {
            const height = (item.value / maxValue) * chartHeight;
            const width = chartWidth / data.length;
            
            return (
              <div key={index} className="flex flex-col items-center justify-end h-full" style={{ width: `${100 / data.length}%` }}>
                <div 
                  className="w-full bg-blue-500 opacity-75 rounded-t-sm"
                  style={{ height: `${(height / chartHeight) * 100}%` }}
                ></div>
                <div className="text-xs text-gray-500 mt-1">{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-8 flex justify-center items-center">
        <p className="text-sm text-gray-500">Meses</p>
      </div>
    </div>
  );
};

export default AreaChart;