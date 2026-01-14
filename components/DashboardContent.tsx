
import React from 'react';
import { EngagementLineChart } from './Charts';
import { HelpCircle, TrendingUp, Loader2 } from 'lucide-react';

const MetricCard: React.FC<{ label: string; value: string; change?: string; changeType?: 'pos' | 'neg' }> = ({ label, value, change, changeType }) => (
  <div className="flex flex-col">
    <div className="text-2xl md:text-3xl font-light text-gray-800">{value}</div>
    <div className="text-[11px] md:text-xs text-gray-500 mt-1 flex items-center">
      {label}
      {change && (
        <span className={`ml-2 flex items-center font-medium ${changeType === 'pos' ? 'text-green-600' : 'text-red-600'}`}>
          {changeType === 'pos' ? <TrendingUp size={12} className="mr-0.5" /> : null}
          {change}
        </span>
      )}
    </div>
  </div>
);

interface DashboardContentProps {
  isLoading?: boolean;
  onAction: (msg: string) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ isLoading, onAction }) => {
  return (
    <div className="p-4 md:p-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 z-30 flex items-center justify-center backdrop-blur-[2px] transition-all duration-300">
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-xl border border-gray-100">
            <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
            <span className="text-sm font-semibold text-gray-700">Recalculating insights...</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 border-b pb-8">
        <MetricCard label="Professionals" value="885,533" change="3.2%" changeType="pos" />
        <MetricCard label="Changed jobs" value="112,402" />
        <MetricCard label="Job posts" value="15,201" />
        <MetricCard label="Engaged talent" value="38,414" />
      </div>

      {/* Location Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Where is this talent located?</h2>
          <button onClick={() => onAction("Viewing full location report")} className="text-sm font-semibold text-blue-600 hover:underline">See all locations</button>
        </div>
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-grow bg-gray-50 rounded border flex items-center justify-center min-h-[300px] relative shadow-inner overflow-hidden">
            <img src="https://picsum.photos/seed/map-pro/800/400" alt="Map" className="w-full h-full object-cover opacity-40 grayscale" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-gray-400 font-semibold italic text-sm">Interactive Geographic Distribution</span>
            </div>
            <div className="absolute bottom-4 left-4 flex flex-col space-y-1">
              <button 
                onClick={() => onAction("Zoomed In")}
                className="bg-white border rounded shadow-sm w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold active:bg-gray-200 transition-colors"
              >
                +
              </button>
              <button 
                onClick={() => onAction("Zoomed Out")}
                className="bg-white border rounded shadow-sm w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold active:bg-gray-200 transition-colors"
              >
                -
              </button>
            </div>
          </div>
          <div className="w-full xl:w-80 flex-shrink-0">
            <div className="flex justify-between text-[11px] text-gray-400 mb-2 font-bold uppercase tracking-wider">
              <span>Top locations</span>
              <span>Professionals</span>
            </div>
            <ul className="space-y-3 divide-y divide-gray-50">
              {[
                { name: 'New York City Metropolitan Area', count: '162,000' },
                { name: 'Atlanta Metropolitan Area', count: '52,300' },
                { name: 'Dallas Fort Worth Metroplex', count: '47,100' },
                { name: 'Charlotte Metro', count: '27,800' },
                { name: 'Albany, NY Metro Area', count: '17,200' }
              ].map((loc, i) => (
                <li key={i} className="flex justify-between text-sm pt-2 first:pt-0 group">
                  <span onClick={() => onAction(`Filtering report for ${loc.name}`)} className="text-gray-700 truncate mr-4 cursor-pointer hover:text-blue-600 group-hover:underline">{loc.name}</span>
                  <span className="text-gray-900 font-medium flex-shrink-0">{loc.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Employing Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Who is employing this talent?</h2>
          <button onClick={() => onAction("Viewing full company report")} className="text-sm font-semibold text-blue-600 hover:underline">See all companies</button>
        </div>
        <div className="overflow-x-auto rounded border border-gray-100 shadow-sm custom-scrollbar">
          <table className="w-full text-sm min-w-[650px] table-fixed">
            <thead className="text-[11px] text-gray-400 font-bold border-b text-left bg-gray-50/50">
              <tr>
                <th className="py-3 px-4 uppercase tracking-wider w-[40%]">Top companies</th>
                <th className="py-3 px-4 uppercase tracking-wider text-right w-[20%]">Professionals</th>
                <th className="py-3 px-4 uppercase tracking-wider text-right w-[20%]">1y growth</th>
                <th className="py-3 px-4 uppercase tracking-wider text-right w-[20%]">Job posts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Google', count: '14,281', growth: '5%', growthType: 'pos', posts: 142 },
                { name: 'Meta', count: '9,408', growth: '2%', growthType: 'pos', posts: 84 },
                { name: 'Microsoft', count: '8,406', growth: '0%', growthType: 'neu', posts: 211 },
                { name: 'Amazon', count: '7,350', growth: '1%', growthType: 'neg', posts: 350 },
                { name: 'Apple', count: '6,297', growth: '3%', growthType: 'pos', posts: 92 },
              ].map((comp, i) => (
                <tr key={i} className="hover:bg-blue-50/30 group transition-colors">
                  <td className="py-3 px-4 flex items-center space-x-3 overflow-hidden">
                    <div className="w-8 h-8 bg-white rounded border flex items-center justify-center font-bold text-blue-600 text-xs flex-shrink-0 shadow-sm">{comp.name[0]}</div>
                    <span onClick={() => onAction(`Opening company details for ${comp.name}`)} className="font-semibold text-blue-600 hover:underline cursor-pointer truncate">{comp.name}</span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700 font-medium">{comp.count}</td>
                  <td className={`py-3 px-4 text-right font-semibold whitespace-nowrap ${comp.growthType === 'pos' ? 'text-green-600' : comp.growthType === 'neg' ? 'text-red-600' : 'text-gray-500'}`}>
                    {comp.growthType === 'pos' ? '▲ ' : comp.growthType === 'neg' ? '▼ ' : ''}{comp.growth}
                  </td>
                  <td onClick={() => onAction(`Viewing job posts for ${comp.name}`)} className="py-3 px-4 text-right text-gray-700 hover:text-blue-600 cursor-pointer hover:underline">{comp.posts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-gray-800">Employer brand engagement</h2>
            <HelpCircle size={14} className="text-gray-400 cursor-pointer" onClick={() => onAction("Engagement metric help")} />
          </div>
          <button onClick={() => onAction("Viewing brand analytics details")} className="text-sm font-semibold text-blue-600 hover:underline">See brand insights</button>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch gap-8 bg-white p-6 border border-gray-100 rounded-lg shadow-sm">
          <div className="flex-grow w-full min-h-[250px] cursor-crosshair">
            <EngagementLineChart />
          </div>
          <div className="w-full lg:w-72 pt-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l lg:pl-8">
            <div className="text-3xl font-light text-gray-900">38,414 <span className="text-sm text-gray-500 font-normal">(14% of pool)</span></div>
            <p className="text-xs text-gray-500 mt-1 mb-6 leading-relaxed">Talent in this pool who engaged with your employer brand on LinkedIn over the past year.</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => onAction("Opening Job Conversion detailed view")}>
                <div className="text-lg font-bold text-gray-800">32%</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Job conversion</div>
              </div>
              <div className="bg-gray-50 p-3 rounded cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => onAction("Opening InMail Response detailed view")}>
                <div className="text-lg font-bold text-gray-800">18.5%</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">InMail response</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
