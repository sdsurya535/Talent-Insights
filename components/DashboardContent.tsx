
import React from 'react';
import { EngagementLineChart } from './Charts';
import { HelpCircle, TrendingUp, Loader2, MapPin, Building2, Users, Briefcase, GraduationCap, BarChart3, Star, Search, Filter, ArrowUpRight, Target, Zap } from 'lucide-react';

const MetricCard: React.FC<{ label: string; value: string; change?: string; changeType?: 'pos' | 'neg' }> = ({ label, value, change, changeType }) => (
  <div className="flex flex-col p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default">
    <div className="text-2xl md:text-3xl font-light text-gray-800 tracking-tight">{value}</div>
    <div className="text-[11px] md:text-xs text-gray-500 mt-1 flex items-center font-medium">
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

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-both">
    {children}
  </div>
);

const OverviewPage: React.FC<{ onAction: (msg: string) => void }> = ({ onAction }) => (
  <PageWrapper>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 border-b pb-10">
      <MetricCard label="Professionals" value="885,533" change="3.2%" changeType="pos" />
      <MetricCard label="Changed jobs" value="112,402" />
      <MetricCard label="Job posts" value="15,201" />
      <MetricCard label="Engaged talent" value="38,414" />
    </div>

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
              Geographic Distribution View
            </div>
          </div>
          <div className="absolute bottom-6 left-6 flex flex-col space-y-2">
            <button onClick={() => onAction("Zoomed In")} className="bg-white border-2 border-gray-100 rounded-lg shadow-md w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold active:scale-95 transition-all">+</button>
            <button onClick={() => onAction("Zoomed Out")} className="bg-white border-2 border-gray-100 rounded-lg shadow-md w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-50 font-bold active:scale-95 transition-all">-</button>
          </div>
        </div>
        <div className="w-full xl:w-80 flex-shrink-0">
          <div className="flex justify-between text-[11px] text-gray-400 mb-3 font-bold uppercase tracking-wider">
            <span>Top locations</span>
            <span>Professionals</span>
          </div>
          <ul className="space-y-4 divide-y divide-gray-100">
            {[
              { name: 'New York Area', count: '162,000' },
              { name: 'Atlanta Metro', count: '52,300' },
              { name: 'Dallas Metro', count: '47,100' },
              { name: 'Charlotte Metro', count: '27,800' },
              { name: 'Albany Metro', count: '17,200' }
            ].map((loc, i) => (
              <li key={i} className="flex justify-between text-sm pt-3 first:pt-0 group hover:translate-x-1 transition-transform">
                <span onClick={() => onAction(`Filtering report for ${loc.name}`)} className="text-gray-700 truncate mr-4 cursor-pointer hover:text-blue-600 font-medium group-hover:underline">{loc.name}</span>
                <span className="text-gray-900 font-bold flex-shrink-0 tabular-nums">{loc.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <section className="pb-12 border-t pt-10">
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Employer brand engagement</h2>
        <button onClick={() => onAction("Viewing brand analytics details")} className="text-sm font-bold text-blue-600 hover:underline px-3 py-1 hover:bg-blue-50 rounded-md transition-all">See brand insights</button>
      </div>
      <div className="flex flex-col lg:flex-row items-stretch gap-10 bg-white p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex-grow w-full min-h-[300px]">
          <EngagementLineChart />
        </div>
        <div className="w-full lg:w-80 pt-6 flex flex-col justify-center lg:border-l lg:pl-10">
          <div className="text-4xl font-light text-gray-900 tracking-tight">38,414</div>
          <p className="text-xs text-gray-500 mt-2 mb-8 leading-relaxed font-medium">Talent in this pool who engaged with your employer brand on LinkedIn over the past year.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer group" onClick={() => onAction("Conversion view")}>
              <div className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">32%</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Conversion</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:bg-blue-50 transition-colors cursor-pointer group" onClick={() => onAction("InMail view")}>
              <div className="text-2xl font-bold text-gray-800 group-hover:text-blue-600">18.5%</div>
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PageWrapper>
);

const LocationPage: React.FC<{ onAction: (msg: string) => void }> = ({ onAction }) => (
  <PageWrapper>
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800">Geographic Insights</h2>
      <div className="flex space-x-2">
        <button onClick={() => onAction("Exporting Location Data")} className="px-4 py-2 bg-white border rounded-md text-sm font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2">
          <span>Export Data</span>
        </button>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Talent Concentration Heatmap</h3>
        <div className="aspect-video bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden relative">
          <img src="https://picsum.photos/seed/heatmap/800/450" className="w-full h-full object-cover opacity-40" alt="Heatmap" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
          <span className="text-blue-800 font-bold text-sm bg-white/80 px-4 py-2 rounded-full border shadow-sm backdrop-blur-sm">Dynamic Geographic Layer</span>
        </div>
      </div>
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Top Growth Regions</h3>
        <div className="space-y-6">
          {[
            { name: 'Austin, TX', growth: '+12.4%', icon: <Target className="text-blue-500" /> },
            { name: 'Denver, CO', growth: '+9.2%', icon: <Zap className="text-yellow-500" /> },
            { name: 'Salt Lake City, UT', growth: '+8.1%', icon: <ArrowUpRight className="text-green-500" /> },
            { name: 'Seattle, WA', growth: '+5.5%', icon: <MapPin className="text-red-500" /> },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 -m-2 rounded-lg transition-all">
              <div className="flex items-center space-x-3">
                <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-white shadow-sm transition-colors">{item.icon}</div>
                <span className="font-semibold text-gray-700">{item.name}</span>
              </div>
              <span className="text-green-600 font-bold">{item.growth}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageWrapper>
);

const CompanyPage: React.FC<{ onAction: (msg: string) => void }> = ({ onAction }) => (
  <PageWrapper>
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-800">Top Employers</h2>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95">View Trends</button>
      </div>
    </div>
    <div className="bg-white border rounded-xl shadow-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-[10px] font-bold uppercase text-gray-500 border-b">
          <tr>
            <th className="px-8 py-5">Employer</th>
            <th className="px-8 py-5 text-right">Headcount</th>
            <th className="px-8 py-5 text-right">YoY Growth</th>
            <th className="px-8 py-5 text-right">Median Tenure</th>
          </tr>
        </thead>
        <tbody className="divide-y text-sm">
          {[
            { name: 'Google', count: '14,281', growth: '+5.2%', tenure: '3.4 yrs' },
            { name: 'Meta', count: '9,408', growth: '+2.1%', tenure: '2.8 yrs' },
            { name: 'Microsoft', count: '8,406', growth: '+0.5%', tenure: '4.2 yrs' },
            { name: 'Amazon', count: '7,350', growth: '-1.2%', tenure: '1.8 yrs' },
            { name: 'Apple', count: '6,297', growth: '+3.1%', tenure: '3.6 yrs' },
            { name: 'Nvidia', count: '4,102', growth: '+15.4%', tenure: '2.5 yrs' },
          ].map((c, i) => (
            <tr key={i} className="hover:bg-blue-50/50 transition-colors group">
              <td className="px-8 py-4 font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => onAction(`Details for ${c.name}`)}>{c.name}</td>
              <td className="px-8 py-4 text-right tabular-nums font-medium text-gray-700">{c.count}</td>
              <td className={`px-8 py-4 text-right font-bold ${c.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{c.growth}</td>
              <td className="px-8 py-4 text-right text-gray-500">{c.tenure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </PageWrapper>
);

const TitlesPage: React.FC = () => (
  <PageWrapper>
    <h2 className="text-2xl font-bold text-gray-800 mb-8">Role & Seniority Analysis</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 border rounded-xl shadow-sm">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Seniority Breakdown</h3>
        <div className="space-y-6">
          {[
            { level: 'Senior / Staff', pct: 42, color: 'bg-blue-600' },
            { level: 'Lead / Principal', pct: 24, color: 'bg-blue-400' },
            { level: 'Manager / Director', pct: 18, color: 'bg-blue-300' },
            { level: 'Junior / Mid-level', pct: 16, color: 'bg-blue-200' },
          ].map(s => (
            <div key={s.level} className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-700">{s.level}</span>
                <span className="text-blue-600">{s.pct}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${s.color} transition-all duration-1000 ease-out`} style={{ width: `${s.pct}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-8 border rounded-xl shadow-sm">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8">Role Distribution</h3>
        <div className="flex flex-wrap gap-3">
          {['Software Engineer', 'Systems Architect', 'Frontend Lead', 'DevOps Specialist', 'QA Architect', 'Cloud Engineer', 'ML Researcher', 'Data Engineer'].map(t => (
            <span key={t} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-100 hover:bg-blue-100 transition-colors cursor-default">{t}</span>
          ))}
        </div>
      </div>
    </div>
  </PageWrapper>
);

const SkillsPage: React.FC = () => (
  <PageWrapper>
    <h2 className="text-2xl font-bold text-gray-800 mb-8">Primary Skills Portfolio</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Core Languages', items: ['Typescript', 'Python', 'Java', 'Go', 'Rust'] },
        { title: 'Web Tech', items: ['React.js', 'Angular', 'Vue.js', 'Next.js', 'Node.js'] },
        { title: 'Data/Cloud', items: ['AWS', 'Kubernetes', 'Docker', 'PostgreSQL', 'Terraform'] },
      ].map(cat => (
        <div key={cat.title} className="bg-white p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-800 border-b pb-3 mb-4">{cat.title}</h3>
          <div className="space-y-4">
            {cat.items.map((skill, i) => (
              <div key={i} className="flex justify-between items-center group">
                <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors">{skill}</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(dot => (
                    <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= 4 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </PageWrapper>
);

const ProfilesPage: React.FC<{ onAction: (msg: string) => void }> = ({ onAction }) => (
  <PageWrapper>
    <h2 className="text-2xl font-bold text-gray-800 mb-8">Talent Profile Highlights</h2>
    <div className="grid grid-cols-1 gap-4">
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex items-center p-6 border rounded-xl bg-white hover:border-blue-300 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-16 h-16 bg-gray-200 rounded-full mr-6 flex-shrink-0 overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition-all">
            <img src={`https://picsum.photos/seed/${i + 100}/100/100`} alt="profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-grow min-w-0">
            <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">Candidate Name {i}</h4>
            <p className="text-sm text-gray-800 font-semibold mb-1">Senior Software Architect at Fortune 500 Corp</p>
            <p className="text-xs text-gray-500 flex items-center">
              <MapPin size={12} className="mr-1" /> Greater New York City Area • 500+ mutual connections
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <button onClick={(e) => { e.stopPropagation(); onAction("Opening full profile..."); }} className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-sm">View Full Profile</button>
            <button onClick={(e) => { e.stopPropagation(); onAction("Saving candidate to list"); }} className="px-6 py-2 bg-white border border-gray-300 text-gray-600 rounded-full font-bold text-sm hover:bg-gray-50 transition-all active:scale-95">Save Candidate</button>
          </div>
        </div>
      ))}
    </div>
  </PageWrapper>
);

const EmptyState: React.FC<{ title: string }> = ({ title }) => (
  <PageWrapper>
    <div className="h-96 flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-gray-50/50">
      <div className="p-6 bg-white rounded-full shadow-lg mb-4 text-gray-300 animate-pulse">
        <BarChart3 size={48} />
      </div>
      <h3 className="text-xl font-bold text-gray-400">{title} Data Processing</h3>
      <p className="text-sm text-gray-400 mt-2 text-center max-w-xs">We're currently refining our AI models for these specific talent insights. Please check back shortly.</p>
    </div>
  </PageWrapper>
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
      case 'Location': return <LocationPage onAction={onAction} />;
      case 'Company': return <CompanyPage onAction={onAction} />;
      case 'Titles': return <TitlesPage />;
      case 'Skills': return <SkillsPage />;
      case 'Profiles': return <ProfilesPage onAction={onAction} />;
      case 'Industry': return <EmptyState title="Industry" />;
      case 'Education': return <EmptyState title="Education" />;
      case 'Employer brand': return <EmptyState title="Employer Brand" />;
      default: return <OverviewPage onAction={onAction} />;
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 relative min-h-screen">
      {isLoading && (
        <div className="absolute inset-0 bg-white/75 z-40 flex items-center justify-center backdrop-blur-[4px] transition-all duration-500 animate-in fade-in">
          <div className="flex flex-col items-center bg-white p-10 rounded-2xl shadow-2xl border border-gray-100 scale-100 animate-in zoom-in-95 duration-300">
            <div className="relative mb-6">
              <Loader2 className="animate-spin text-blue-600" size={56} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-100 w-2 h-2 rounded-full"></div>
              </div>
            </div>
            <span className="text-lg font-bold text-gray-800 tracking-tight">Syncing Real-time Talent Insights...</span>
            <p className="text-sm text-gray-500 mt-2 font-medium">This typically takes just a few seconds.</p>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
};
