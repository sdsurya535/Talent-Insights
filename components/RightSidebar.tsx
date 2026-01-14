
import React from 'react';
import { DiversityDonutChart } from './Charts';
import { HelpCircle, ExternalLink, MapPin, Users } from 'lucide-react';

interface RightSidebarProps {
  onAction: (msg: string) => void;
}

const InsightSection: React.FC<{ title: string; help?: boolean; onHelp?: () => void; children: React.ReactNode }> = ({ title, help, onHelp, children }) => (
  <div className="mb-8 last:mb-0">
    <div className="flex items-center space-x-2 mb-3">
      <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
      {help && <HelpCircle size={14} className="text-gray-400 cursor-pointer hover:text-blue-600 transition-colors" onClick={onHelp} />}
    </div>
    <div className="text-sm">
      {children}
    </div>
  </div>
);

export const RightSidebar: React.FC<RightSidebarProps> = ({ onAction }) => {
  return (
    <aside className="w-full p-6 flex flex-col space-y-8 bg-white h-full">
      <InsightSection 
        title="Hiring demand" 
        help 
        onHelp={() => onAction("Demand index help")}
      >
        <div className="w-full h-2 bg-gray-100 rounded-full flex overflow-hidden">
          <div className="w-3/4 h-full bg-blue-600"></div>
          <div className="w-1/4 h-full bg-blue-200"></div>
        </div>
        <div className="mt-2 text-sm text-gray-800 font-bold">Very high</div>
        <div className="text-xs text-gray-500">This talent is very hard to hire</div>
      </InsightSection>

      <InsightSection 
        title="View in Recruiter Search" 
        help
        onHelp={() => onAction("Recruiter search tips")}
      >
        <div className="flex -space-x-2 mb-4">
          {[1,2,3,4,5].map(i => (
            <img key={i} src={`https://picsum.photos/seed/${i+10}/40/40`} className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" alt="Recruiter" />
          ))}
        </div>
        <div className="space-y-2">
          <div className="text-xs flex items-center text-gray-700">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
            <span className="font-bold mr-1">2,064</span> open to new opportunities
          </div>
          <div className="text-xs flex items-center text-gray-700">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
            <span className="font-bold mr-1">1,034</span> have company connections
          </div>
          <div className="text-xs flex items-center text-gray-700">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
            <span className="font-bold mr-1">5,056</span> open to contract work
          </div>
        </div>
        <button 
          onClick={() => onAction("Opening Recruiter with current filters...")}
          className="flex items-center space-x-1 text-blue-600 font-bold text-sm mt-4 hover:underline transition-all"
        >
          <span>See candidates</span>
          <ExternalLink size={14} />
        </button>
      </InsightSection>

      <InsightSection title="Gender diversity" help onHelp={() => onAction("Diversity methodology")}>
        <div className="flex items-center space-x-6">
          <div className="cursor-pointer shrink-0" onClick={() => onAction("Viewing detailed diversity report")}>
             <DiversityDonutChart />
          </div>
          <div className="space-y-2 min-w-0">
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 bg-[#00a3c2] rounded-full mr-2 shrink-0"></span>
              <span className="font-bold">16%</span>
              <span className="text-gray-500 ml-1 truncate">Female</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 bg-[#0073b1] rounded-full mr-2 shrink-0"></span>
              <span className="font-bold">84%</span>
              <span className="text-gray-500 ml-1 truncate">Male</span>
            </div>
          </div>
        </div>
      </InsightSection>

      <InsightSection title="Compensation" help onHelp={() => onAction("Compensation insights help")}>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Average total compensation</div>
          <div className="text-2xl font-light text-gray-900 leading-tight">$130,500</div>
          <div className="mt-4 border-t pt-3 border-gray-200">
            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Inferred Range</div>
            <div className="text-sm font-bold text-gray-700 tracking-tight">$75,800 - $204,800</div>
          </div>
          <p className="text-[9px] text-gray-400 mt-3 italic leading-tight">Data is inferred for 14% of this talent pool based on current market trends.</p>
        </div>
      </InsightSection>

      <InsightSection title="Key insights">
        <div className="space-y-6">
          <div className="flex items-start space-x-3 cursor-pointer group p-2 -m-2 rounded hover:bg-blue-50 transition-colors" onClick={() => onAction("Exploring Hidden Gems")}>
            <div className="bg-blue-50 p-2 rounded text-blue-600 group-hover:bg-white transition-colors shadow-sm"><MapPin size={16} /></div>
            <div className="min-w-0">
              <div className="text-sm font-bold group-hover:text-blue-600 truncate">3 hidden gem locations</div>
              <div className="text-[11px] text-gray-500 leading-tight">Atlanta, Dallas Fort Worth, and Charlotte Metro areas</div>
            </div>
          </div>
          <div className="flex items-start space-x-3 cursor-pointer group p-2 -m-2 rounded hover:bg-blue-50 transition-colors" onClick={() => onAction("Exploring Tenure insights")}>
            <div className="bg-blue-50 p-2 rounded text-blue-600 group-hover:bg-white transition-colors shadow-sm"><Users size={16} /></div>
            <div className="min-w-0">
              <div className="text-sm font-bold group-hover:text-blue-600 truncate">2.5 year median tenure</div>
              <div className="text-[11px] text-gray-500 leading-tight">Professionals are most likely to switch jobs at this stage</div>
            </div>
          </div>
        </div>
      </InsightSection>
    </aside>
  );
};
