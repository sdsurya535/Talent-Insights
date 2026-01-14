
import React from 'react';
import { DiversityDonutChart } from './Charts';
import { HelpCircle, ExternalLink, MapPin, Users } from 'lucide-react';

interface RightSidebarProps {
  onAction: (msg: string) => void;
}

const InsightSection: React.FC<{ title: string; help?: boolean; onHelp?: () => void; children: React.ReactNode }> = ({ title, help, onHelp, children }) => (
  <div className="mb-8 last:mb-0">
    <div className="flex items-center space-x-2 mb-3">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{title}</h3>
      {help && <HelpCircle size={14} className="text-gray-400 cursor-pointer hover:text-blue-600" onClick={onHelp} />}
    </div>
    {children}
  </div>
);

export const RightSidebar: React.FC<RightSidebarProps> = ({ onAction }) => {
  return (
    <aside className="w-full lg:w-80 bg-white border-l p-6 flex flex-col space-y-8 h-full">
      <InsightSection 
        title="Hiring demand" 
        help 
        onHelp={() => onAction("Demand index help")}
      >
        <div className="w-full h-2 bg-gray-100 rounded-full flex overflow-hidden">
          <div className="w-3/4 h-full bg-blue-600"></div>
          <div className="w-1/4 h-full bg-blue-200"></div>
        </div>
        <div className="mt-2 text-sm text-gray-800 font-semibold">Very high</div>
        <div className="text-xs text-gray-500">This talent is very hard to hire</div>
      </InsightSection>

      <InsightSection 
        title="View in Recruiter Search" 
        help
        onHelp={() => onAction("Recruiter search tips")}
      >
        <div className="flex -space-x-2 mb-3">
          {[1,2,3,4,5].map(i => (
            <img key={i} src={`https://picsum.photos/seed/${i+10}/40/40`} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Recruiter" />
          ))}
        </div>
        <div className="space-y-1">
          <div className="text-sm"><span className="font-semibold">2,064</span> open to new opportunities</div>
          <div className="text-sm"><span className="font-semibold">1,034</span> have company connections</div>
          <div className="text-sm"><span className="font-semibold">5,056</span> open to contract work</div>
        </div>
        <button 
          onClick={() => onAction("Opening Recruiter with current filters...")}
          className="flex items-center space-x-1 text-blue-600 font-semibold text-sm mt-3 hover:underline"
        >
          <span>See candidates</span>
          <ExternalLink size={14} />
        </button>
      </InsightSection>

      <InsightSection title="Gender diversity" help onHelp={() => onAction("Diversity methodology")}>
        <div className="flex items-center space-x-6">
          <div className="cursor-pointer" onClick={() => onAction("Viewing detailed diversity report")}>
             <DiversityDonutChart />
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 bg-[#00a3c2] rounded-full mr-2"></span>
              <span className="font-semibold">16%</span>
              <span className="text-gray-500 ml-1">Female</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 bg-[#0073b1] rounded-full mr-2"></span>
              <span className="font-semibold">84%</span>
              <span className="text-gray-500 ml-1">Male</span>
            </div>
          </div>
        </div>
      </InsightSection>

      <InsightSection title="Compensation" help onHelp={() => onAction("Compensation insights help")}>
        <div className="text-xs text-gray-500 mb-1">Average total compensation</div>
        <div className="text-lg font-semibold text-gray-800">$130,500</div>
        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-1">Range</div>
          <div className="text-sm font-semibold text-gray-700">$75,800 - $204,800</div>
        </div>
        <p className="text-[10px] text-gray-400 mt-2">Data is inferred for 14% of this talent pool</p>
      </InsightSection>

      <InsightSection title="Key insights">
        <div className="space-y-6">
          <div className="flex items-start space-x-3 cursor-pointer group" onClick={() => onAction("Exploring Hidden Gems")}>
            <div className="bg-blue-50 p-1.5 rounded text-blue-600 group-hover:bg-blue-100 transition-colors"><MapPin size={18} /></div>
            <div>
              <div className="text-sm font-semibold group-hover:text-blue-600">3 hidden gem locations</div>
              <div className="text-xs text-gray-500">Atlanta Metropolitan Area • Dallas Fort Worth Metroplex • Charlotte Metro</div>
            </div>
          </div>
          <div className="flex items-start space-x-3 cursor-pointer group" onClick={() => onAction("Exploring Tenure insights")}>
            <div className="bg-blue-50 p-1.5 rounded text-blue-600 group-hover:bg-blue-100 transition-colors"><Users size={18} /></div>
            <div>
              <div className="text-sm font-semibold group-hover:text-blue-600">2.5 year median tenure</div>
              <div className="text-xs text-gray-500">When professionals are most likely to switch jobs</div>
            </div>
          </div>
        </div>
      </InsightSection>
    </aside>
  );
};
