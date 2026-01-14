
import React from 'react';
import { EngagementLineChart, DiversityDonutChart } from './Charts';
import { HelpCircle, TrendingUp, Loader2, MapPin, Building2, Users, Briefcase, GraduationCap, BarChart3, Star, Search, Filter } from 'lucide-react';

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

// --- Sub-page Components ---

const OverviewPage: React.FC<{ onAction: (msg: string) => void }> = ({ onAction }) => (
  <div className="animate-in fade-in duration-500">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 border-b pb-10">
      <MetricCard label="Professionals" value="885,533" change="3.2%" changeType="pos" />
      <MetricCard label="Changed jobs" value="112,402" />
      <MetricCard label="Job posts" value="15,201" />
      <MetricCard label="Engaged talent" value="38,414" />
    </div>

    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Talent Distribution</h2>
        <button onClick={() => onAction("Viewing full location report")} className="text-sm font-bold text-blue-600 hover:underline">See all</button>
      </div>
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-grow bg-gray-50 rounded-xl border min-h-[300px] relative overflow-hidden">
          <img src="https://picsum.photos/seed/map/800/400" className="w-full h-full object-cover opacity-30" alt="map" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/80 px-4 py-2 rounded shadow-sm text-xs font-bold text-gray-500 uppercase">Map Visualization</div>
          </div>
        </div>
        <div className="w-full xl:w-80 flex-shrink-0">
          <ul className="space-y-4 divide-y">
            {[
              { name: 'New York Area', count: '162,000' },
              { name: 'Atlanta Metro', count: '52,300' },
              { name: 'Dallas Metro', count: '47,100' },
              { name: 'Charlotte Metro', count: '27,800' }
            ].map((loc, i) => (
              <li key={loc.name} className="flex justify-between text-sm pt-3 first:pt-0">
                <span className="text-gray-700">{loc.name}</span>
                <span className="text-gray-900 font-bold tabular-nums">{loc.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const LocationPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <h2 className="text-2xl font-bold mb-6">Talent Locations</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
      <div className="border rounded-xl p-6 bg-white shadow-sm">
        <h3 className="font-bold mb-4 text-gray-500 uppercase text-xs tracking-widest">Global Reach</h3>
        <div className="h-64 bg-blue-50 rounded-lg flex items-center justify-center text-blue-300 italic">Detailed Heatmap</div>
      </div>
      <div className="border rounded-xl p-6 bg-white shadow-sm">
        <h3 className="font-bold mb-4 text-gray-500 uppercase text-xs tracking-widest">Growth Markets</h3>
        <div className="space-y-4">
           {[
             { name: 'Austin, TX', growth: '+12%', count: '14,200' },
             { name: 'Denver, CO', growth: '+8%', count: '11,100' },
             { name: 'Seattle, WA', growth: '+5%', count: '22,400' },
             { name: 'Salt Lake City, UT', growth: '+15%', count: '6,200' },
           ].map(l => (
             <div key={l.name} className="flex items-center justify-between border-b pb-2">
               <div>
                 <p className="font-semibold">{l.name}</p>
                 <p className="text-xs text-gray-400">Emerging Talent Hub</p>
               </div>
               <div className="text-right">
                 <p className="font-bold text-blue-600">{l.count}</p>
                 <p className="text-xs text-green-600">{l.growth}</p>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const CompanyPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <h2 className="text-2xl font-bold mb-6">Employer Insights</h2>
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-[10px] font-bold uppercase text-gray-500">
          <tr>
            <th className="px-6 py-4">Current Employer</th>
            <th className="px-6 py-4">Professionals</th>
            <th className="px-6 py-4">Market Share</th>
            <th className="px-6 py-4">Avg. Tenure</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {[
            { name: 'Google', count: '14,281', share: '4.2%', tenure: '3.2 years' },
            { name: 'Meta', count: '9,408', share: '2.8%', tenure: '2.8 years' },
            { name: 'Microsoft', count: '8,406', share: '2.5%', tenure: '4.1 years' },
            { name: 'Amazon', count: '7,350', share: '2.2%', tenure: '1.9 years' },
            { name: 'Apple', count: '6,297', share: '1.9%', tenure: '3.5 years' },
          ].map(c => (
            <tr key={c.name} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-bold text-blue-600">{c.name}</td>
              <td className="px-6 py-4">{c.count}</td>
              <td className="px-6 py-4">{c.share}</td>
              <td className="px-6 py-4">{c.tenure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TitlesPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <h2 className="text-2xl font-bold mb-6">Job Titles & Roles</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-4">Top Seniority Levels</h3>
        <div className="space-y-3">
          {[
            { level: 'Senior', pct: 45 },
            { level: 'Lead / Principal', pct: 22 },
            { level: 'Manager', pct: 18 },
            { level: 'Director+', pct: 8 },
            { level: 'Entry', pct: 7 },
          ].map(s => (
            <div key={s.level} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>{s.level}</span>
                <span>{s.pct}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: `${s.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 border rounded-xl bg-white shadow-sm">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-4">Most Frequent Titles</h3>
        <div className="flex flex-wrap gap-2">
           {['Software Engineer', 'Senior Software Engineer', 'Full Stack Developer', 'Frontend Architect', 'Engineering Manager', 'Cloud Architect', 'Systems Lead', 'DevOps Engineer'].map(t => (
             <span key={t} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-100">{t}</span>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const SkillsPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <h2 className="text-2xl font-bold mb-6">Skill Analysis</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Programming Languages', 'Web Technologies', 'Cloud Platforms'].map(cat => (
        <div key={cat} className="p-6 border rounded-xl bg-white shadow-sm">
          <h3 className="font-bold text-sm mb-4">{cat}</h3>
          <ul className="space-y-3">
            {[1, 2, 3, 4, 5].map(i => (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-gray-600">Sample Skill {i}</span>
                <span className="text-blue-600 font-bold">88%</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

const ProfilesPage: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <h2 className="text-2xl font-bold mb-6">Talent Profiles</h2>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex items-center p-4 border rounded-xl bg-white hover:shadow-md transition-shadow">
          <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex-shrink-0 overflow-hidden">
            <img src={`https://picsum.photos/seed/${i + 50}/100/100`} alt="profile" />
          </div>
          <div className="flex-grow min-w-0">
            <h4 className="font-bold text-blue-600 hover:underline cursor-pointer truncate">Candidate Name {i}</h4>
            <p className="text-sm text-gray-800 font-medium">Senior Software Engineer at Major Tech Corp</p>
            <p className="text-xs text-gray-500">Greater New York City Area • 500+ connections</p>
          </div>
          <button className="ml-4 px-4 py-1.5 border border-blue-600 text-blue-600 rounded-full font-bold text-sm hover:bg-blue-50">View</button>
        </div>
      ))}
    </div>
  </div>
);

const EmptyState: React.FC<{ title: string }> = ({ title }) => (
  <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-gray-50 animate-in fade-in duration-500">
    <BarChart3 className="text-gray-300 mb-2" size={48} />
    <h3 className="text-lg font-bold text-gray-400">{title} Data Coming Soon</h3>
    <p className="text-sm text-gray-400">Refining insights for this talent pool...</p>
  </div>
);

interface DashboardContentProps {
  isLoading?: boolean;
  activeTab: string;
  onAction: (msg: string) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ isLoading, activeTab, onAction }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return <OverviewPage onAction={onAction} />;
      case 'Location': return <LocationPage />;
      case 'Company': return <CompanyPage />;
      case 'Titles': return <TitlesPage />;
      case 'Skills': return <SkillsPage />;
      case 'Profiles': return <ProfilesPage />;
      case 'Industry': return <EmptyState title="Industry" />;
      case 'Education': return <EmptyState title="Education" />;
      case 'Employer brand': return <EmptyState title="Employer Brand" />;
      default: return <OverviewPage onAction={onAction} />;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 relative max-w-full min-h-screen">
      {isLoading && (
        <div className="absolute inset-0 bg-white/75 z-30 flex items-center justify-center backdrop-blur-[2px] transition-all duration-300">
          <div className="flex flex-col items-center bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
            <Loader2 className="animate-spin text-blue-600 mb-3" size={40} />
            <span className="text-sm font-bold text-gray-700 tracking-wide">Updating insights...</span>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
};
