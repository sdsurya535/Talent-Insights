
import React from 'react';
import { EngagementLineChart } from './Charts';
import { HelpCircle, TrendingUp, Loader2 } from 'lucide-react';

const MetricCard: React.FC<{ label: string; value: string; change?: string; changeType?: 'pos' | 'neg' }> = ({ label, value, change, changeType }) => (
  <div className="flex flex-col">
    <div className="text-2xl md:text-3xl font-light text-gray-800 tracking-tight">{value}</div>
    <div className="text-[11px] md:text-xs text-gray-500 mt-1 flex items-center">
      {label}
      {change && (
        <span className={`ml-2 flex items-center font-bold ${changeType === 'pos' ? 'text-green-600' : 'text-red-600'}`}>
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
    <div className="p-4 md:p-6 lg:p-8 relative max-w-full">
      {isLoading && (
        <div className="absolute inset-0 bg-white/75 z-30 flex items-center justify-center backdrop-blur-[2px] transition-all duration-300">
          <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
            <Loader2 className="animate-spin text-blue-600 mb-3" size={40} />
            <span className="text-sm font-bold text-gray-700 tracking-wide">Updating insights...</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 border-b pb-10">
        <MetricCard label="Professionals" value="885,533" change="3.2%" changeType="pos" />
        <MetricCard label="Changed jobs" value="112,402" />
        <MetricCard label="Job posts" value="15,201" />
        <MetricCard label="Engaged talent" value="38,414" />
      </div>

      {/* Location Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Where is this talent located?</h2>
          <button onClick={() => onAction("Viewing full location report")} className="text-sm font-bold text-blue-600 hover:underline px-3 py-1 hover:bg-blue-50 rounded-md transition-all">See all locations</button>
        </div>
        <div className="flex flex-col xl:flex-row gap-8">
          <div className="flex-grow bg-gray-50 rounded-xl border flex items-center justify-center min-h-[350px] relative shadow-inner overflow-hidden ring-1 ring-gray-200">
            <img src="https://picsum.photos/seed/map-pro/1000/500" alt="Map" className="w-full h-full object-cover opacity-30 grayscale contrast-125" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border text-gray-500 font-bold text-xs uppercase tracking-widest flex items-center">
                Interactive Distribution View
              </div>
            </div>
            <div className="absolute bottom-6 left-6 flex flex-col space-y-2">
              <button 
                onClick={() => onAction("Zoomed In")}
                className="bg-white border-2 border-gray-100 rounded-lg shadow-md w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold active:bg-gray-200 transition-all"
              >
                +
              </button>
              <button 
                onClick={() => onAction("Zoomed Out")}
                className="bg-white border-2 border-gray-100 rounded-lg shadow-md w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold active:bg-gray-200 transition-all"
              >
                -
              </button>
            </div>
          </div>
          <div className="w-full xl:w-80 flex-shrink-0">
            <div className="flex justify-between text-[11px] text-gray-400 mb-3 font-bold uppercase tracking-wider">
              <span>Top locations</span>
              <span>Professionals</span>
            </div>
            <ul className="space-y-4 divide-y divide-gray-100">
              {[
                { name: 'New York City Metropolitan Area', count: '162,000' },
                { name: 'Atlanta Metropolitan Area', count: '52,300' },
                { name: 'Dallas Fort Worth Metroplex', count: '47,100' },
                { name: 'Charlotte Metro', count: '27,800' },
                { name: 'Albany, NY Metro Area', count: '17,200' }
              ].map((loc, i) => (
                <li key={i} className="flex justify-between text-sm pt-3 first:pt-0 group">
                  <span onClick={() => onAction(`Filtering report for ${loc.name}`)} className="text-gray-700 truncate mr-4 cursor-pointer hover:text-blue-600 font-medium group-hover:underline transition-all">{loc.name}</span>
                  <span className="text-gray-900 font-bold flex-shrink-0 tabular-nums">{loc.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Employing Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Who is employing this talent?</h2>
          <button onClick={() => onAction("Viewing full company report")} className="text-sm font-bold text-blue-600 hover:underline px-3 py-1 hover:bg-blue-50 rounded-md transition-all">See all companies</button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg bg-white custom-scrollbar">
          <table className="w-full text-sm min-w-[700px] table-fixed">
            <thead className="text-[11px] text-gray-500 font-bold border-b text-left bg-gray-50">
              <tr>
                <th className="py-4 px-6 uppercase tracking-widest w-[40%]">Top companies</th>
                <th className="py-4 px-6 uppercase tracking-widest text-right w-[20%]">Professionals</th>
                <th className="py-4 px-6 uppercase tracking-widest text-right w-[20%]">1y growth</th>
                <th className="py-4 px-6 uppercase tracking-widest text-right w-[20%]">Job posts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { name: 'Google', count: '14,281', growth: '5%', growthType: 'pos', posts: 142 },
                { name: 'Meta', count: '9,408', growth: '2%', growthType: 'pos', posts: 84 },
                { name: 'Microsoft', count: '8,406', growth: '0%', growthType: 'neu', posts: 211 },
                { name: 'Amazon', count: '7,350', growth: '1%', growthType: 'neg', posts: 350 },
                { name: 'Apple', count: '6,297', growth: '3%', growthType: 'pos', posts: 92 },
              ].map((comp, i) => (
                <tr key={i} className="hover:bg-blue-50/40 group transition-all duration-150">
                  <td className="py-4 px-6 flex items-center space-x-4 overflow-hidden">
                    <div className="w-10 h-10 bg-white rounded-lg border-2 border-gray-100 flex items-center justify-center font-bold text-blue-600 text-sm flex-shrink-0 shadow-sm group-hover:border-blue-200 transition-colors">{comp.name[0]}</div>
                    <span onClick={() => onAction(`Opening company details for ${comp.name}`)} className="font-bold text-blue-600 hover:underline cursor-pointer truncate text-base">{comp.name}</span>
                  </td>
                  <td className="py-4 px-6 text-right text-gray-700 font-bold tabular-nums">{comp.count}</td>
                  <td className={`py-4 px-6 text-right font-bold whitespace-nowrap tabular-nums ${comp.growthType === 'pos' ? 'text-green-600' : comp.growthType === 'neg' ? 'text-red-600' : 'text-gray-500'}`}>
                    {comp.growthType === 'pos' ? '▲ ' : comp.growthType === 'neg' ? '▼ ' : ''}{comp.growth}
                  </td>
                  <td onClick={() => onAction(`Viewing job posts for ${comp.name}`)} className="py-4 px-6 text-right text-gray-700 hover:text-blue-600 font-bold cursor-pointer hover:underline tabular-nums">{comp.posts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-gray-800">Employer brand engagement</h2>
            <HelpCircle size={16} className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onAction("Engagement metric help")} />
          </div>
          <button onClick={() => onAction("Viewing brand analytics details")} className="text-sm font-bold text-blue-600 hover:underline px-3 py-1 hover:bg-blue-50 rounded-md transition-all">See brand insights</button>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch gap-10 bg-white p-8 border border-gray-200 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="flex-grow w-full min-h-[300px] cursor-crosshair">
            <EngagementLineChart />
          </div>
          <div className="w-full lg:w-80 pt-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-l lg:pl-10">
            <div className="text-4xl font-light text-gray-900 tracking-tight">38,414 <span className="text-base text-gray-500 font-normal ml-1"> (14%)</span></div>
            <p className="text-xs text-gray-500 mt-2 mb-8 leading-relaxed font-medium">Talent in this pool who engaged with your employer brand on LinkedIn over the past year.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition-all group" onClick={() => onAction("Opening Job Conversion detailed view")}>
                <div className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">32%</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Job conversion</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 cursor-pointer hover:bg-blue-50 hover:border-blue-100 transition-all group" onClick={() => onAction("Opening InMail Response detailed view")}>
                <div className="text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">18.5%</div>
                <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">InMail response</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
