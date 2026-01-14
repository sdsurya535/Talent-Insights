
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const engagementData = [
  { month: 'Apr 2024', value: 800 },
  { month: 'May', value: 1200 },
  { month: 'Jun', value: 1500 },
  { month: 'Jul', value: 1800 },
  { month: 'Aug', value: 1600 },
  { month: 'Sep', value: 1400 },
  { month: 'Oct', value: 2100 },
  { month: 'Nov', value: 2300 },
  { month: 'Dec', value: 2000 },
  { month: 'Jan 2025', value: 2200 },
  { month: 'Feb', value: 2100 },
  { month: 'Mar', value: 2500 },
  { month: 'Apr', value: 3800 },
];

const diversityData = [
  { name: 'Female', value: 16 },
  { name: 'Male', value: 84 },
];

const COLORS = ['#00a3c2', '#0073b1'];

export const EngagementLineChart: React.FC = () => {
  return (
    <div className="h-64 w-full min-w-0 min-h-0 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <LineChart data={engagementData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#666' }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#666' }}
            ticks={[0, 1500, 3000, 4500]}
          />
          <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '4px', border: '1px solid #eee' }} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#0073b1" 
            strokeWidth={2} 
            dot={{ r: 4, fill: '#fff', stroke: '#0073b1', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DiversityDonutChart: React.FC = () => {
  return (
    <div className="h-28 w-28 min-w-0 min-h-0 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <PieChart>
          <Pie
            data={diversityData}
            cx="50%"
            cy="50%"
            innerRadius={28}
            outerRadius={40}
            paddingAngle={2}
            dataKey="value"
          >
            {diversityData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
