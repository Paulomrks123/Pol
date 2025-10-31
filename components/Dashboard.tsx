
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'USA', 'Active Ads': 4000, 'Expired Ads': 2400 },
  { name: 'Brazil', 'Active Ads': 3000, 'Expired Ads': 1398 },
  { name: 'UK', 'Active Ads': 2000, 'Expired Ads': 9800 },
  { name: 'Canada', 'Active Ads': 2780, 'Expired Ads': 3908 },
  { name: 'Australia', 'Active Ads': 1890, 'Expired Ads': 4800 },
];

const topKeywords = ["Fitness", "Summer Sale", "Free Shipping", "AI Tools", "Healthy Recipes", "Online Course"];
const topAdvertisers = ["BrandX", "E-Shop Global", "FitLife", "LearnFast", "Gourmet Delivered"];

const ChartCard: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <div className="bg-brand-gray-600 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        {children}
    </div>
);

const ListCard: React.FC<{title: string, items: string[]}> = ({ title, items }) => (
     <ChartCard title={title}>
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="text-brand-gray-100 bg-brand-gray-500 px-3 py-2 rounded-md flex justify-between">
                    <span>{item}</span>
                    <span className="font-mono text-brand-gray-300">#{index + 1}</span>
                </li>
            ))}
        </ul>
    </ChartCard>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
       <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Ad Status by Country">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                        <XAxis dataKey="name" stroke="#A0AEC0" />
                        <YAxis stroke="#A0AEC0" />
                        <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
                        <Legend wrapperStyle={{ color: '#E2E8F0' }} />
                        <Bar dataKey="Active Ads" fill="#4299E1" />
                        <Bar dataKey="Expired Ads" fill="#F56565" />
                    </BarChart>
                </ResponsiveContainer>
            </ChartCard>
            <ListCard title="Top Advertisers" items={topAdvertisers} />
            <ListCard title="Emerging Keywords" items={topKeywords} />
       </div>
    </div>
  );
};

export default Dashboard;
