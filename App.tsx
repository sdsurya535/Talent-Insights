
import React, { useState, useCallback, useEffect } from 'react';
import { TopNav, DashboardHeader } from './components/Layout';
import { Sidebar, FilterState } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';
import { RightSidebar } from './components/RightSidebar';
import { ChevronDown, X } from 'lucide-react';

const tabs = [
  'Overview', 'Location', 'Company', 'Titles', 'Skills', 'Industry', 'Education', 'Employer brand', 'Profiles'
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    jobTitles: ['Senior Software Engineer'],
    locations: ['New York, United States', 'Atlanta, Georgia, US', 'Charlotte, NC, US', 'Dallas, Texas, US'],
    skills: ['Angular.js', 'React.js', 'Typescript']
  });

  const notify = (msg: string) => {
    setNotification(msg);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const updateFilters = useCallback((key: keyof FilterState, value: string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleApplyFilters = () => {
    setIsLoading(true);
    notify("Applying selected filters to report...");
    setTimeout(() => {
      setIsLoading(false);
      notify("Report updated successfully.");
    }, 1200);
  };

  return (
    <div className="h-screen flex flex-col bg-[#f3f2f0] overflow-hidden relative">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-4 py-2 rounded-md shadow-2xl flex items-center space-x-3 animate-in fade-in slide-in-from-top-4">
          <span className="text-sm font-medium">{notification}</span>
          <button onClick={() => setNotification(null)} className="hover:text-gray-400 transition-colors"><X size={14} /></button>
        </div>
      )}

      <TopNav onAction={notify} />
      
      <div className="flex flex-1 relative overflow-hidden">
        {/* Fixed Left Sidebar */}
        <Sidebar 
          filters={filters} 
          onUpdateFilters={updateFilters}
          onApply={handleApplyFilters}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          onAction={notify}
        />

        {/* Main Scrollable Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-white">
          <DashboardHeader 
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            onAction={notify}
          />
          
          {/* Tab Navigation - Sticky within main scroll */}
          <div className="bg-white px-4 md:px-6 sticky top-0 z-40 border-b overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex space-x-8 h-12 items-center">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    notify(`Switched to ${tab} view`);
                  }}
                  className={`h-full px-1 text-sm font-semibold transition-colors relative flex items-center shrink-0 ${
                    activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Actual Dashboard Content Grid */}
          <div className="flex flex-col lg:flex-row flex-1">
            <div className="flex-1 min-w-0">
              <DashboardContent isLoading={isLoading} onAction={notify} />
            </div>
            
            <div className="lg:w-[320px] xl:w-[360px] flex-shrink-0 border-l bg-white">
              <RightSidebar onAction={notify} />
            </div>
          </div>

          {/* Footer - Improved Responsiveness and Layout */}
          <footer className="bg-gray-50 border-t p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between text-[11px] md:text-xs text-gray-500 max-w-7xl mx-auto w-full gap-6">
              <div className="flex items-center space-x-2 shrink-0">
                <div className="bg-blue-600 text-white font-bold p-0.5 rounded-sm leading-none">in</div>
                <span className="font-semibold">LinkedIn Corporation © 2025</span>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-end items-center gap-x-6 gap-y-3 font-medium">
                <button onClick={() => notify("Opening User Agreement")} className="hover:underline hover:text-blue-600 transition-colors">User Agreement</button>
                <button onClick={() => notify("Opening Privacy Policy")} className="hover:underline hover:text-blue-600 transition-colors">Privacy Policy</button>
                <button onClick={() => notify("Opening Community Guidelines")} className="hover:underline hover:text-blue-600 transition-colors">Community Guidelines</button>
                <button onClick={() => notify("Opening Cookie Policy")} className="hover:underline hover:text-blue-600 transition-colors">Cookie Policy</button>
                <button onClick={() => notify("Opening Copyright Policy")} className="hover:underline hover:text-blue-600 transition-colors">Copyright Policy</button>
                <button onClick={() => notify("Changing Language")} className="hover:underline hover:text-blue-600 transition-colors flex items-center bg-white px-2 py-1 border rounded shadow-sm">
                  Language <ChevronDown size={12} className="ml-1" />
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
