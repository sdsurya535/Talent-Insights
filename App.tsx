
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    jobTitles: ['Software Engineer'],
    locations: ['New York, US', 'Atlanta, US'],
    skills: ['React.js', 'Typescript']
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
    notify("Updating talent pool data...");
    setTimeout(() => {
      setIsLoading(false);
      notify("Report updated successfully.");
    }, 1200);
  };

  return (
    <div className="h-screen flex flex-col bg-[#f3f2f0] overflow-hidden relative selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold tracking-tight">{notification}</span>
          <button onClick={() => setNotification(null)} className="hover:text-gray-400 transition-colors p-1"><X size={14} /></button>
        </div>
      )}

      <TopNav onAction={notify} />
      
      <div className="flex flex-1 relative overflow-hidden">
        {/* Toggleable Sidebar */}
        <Sidebar 
          filters={filters} 
          onUpdateFilters={updateFilters}
          onApply={handleApplyFilters}
          isOpen={isSidebarOpen}
          onCloseMobile={() => setIsSidebarOpen(false)}
          onAction={notify}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white relative overflow-hidden transition-all duration-300">
          <DashboardHeader 
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            isSidebarOpen={isSidebarOpen}
            onAction={notify}
          />
          
          {/* Tab Navigation */}
          <div className="bg-white px-4 md:px-6 sticky top-0 z-40 border-b overflow-x-auto whitespace-nowrap scrollbar-hide shrink-0 shadow-sm">
            <div className="flex space-x-8 h-12 items-center">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    notify(`Viewing ${tab}`);
                  }}
                  className={`h-full px-1 text-sm font-bold transition-all relative flex items-center shrink-0 ${
                    activeTab === tab ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full transition-all duration-300"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-page and Right Sidebar Grid */}
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
              <DashboardContent 
                isLoading={isLoading} 
                activeTab={activeTab} 
                onAction={notify} 
              />
              
              <footer className="bg-gray-50 border-t p-8 mt-auto shrink-0">
                <div className="flex flex-col lg:flex-row items-center justify-between text-[11px] md:text-xs text-gray-500 max-w-7xl mx-auto w-full gap-8">
                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="bg-[#0a66c2] text-white font-bold p-1 rounded-sm text-xs leading-none">in</div>
                    <span className="font-bold tracking-tight text-gray-400">LinkedIn Corporation © 2025</span>
                  </div>
                  
                  <div className="flex flex-wrap justify-center lg:justify-end items-center gap-x-8 gap-y-4 font-bold uppercase tracking-widest text-[10px]">
                    <button onClick={() => notify("User Agreement")} className="hover:text-blue-600 transition-colors">User Agreement</button>
                    <button onClick={() => notify("Privacy Policy")} className="hover:text-blue-600 transition-colors">Privacy Policy</button>
                    <button onClick={() => notify("Cookie Policy")} className="hover:text-blue-600 transition-colors">Cookie Policy</button>
                    <button onClick={() => notify("Change Language")} className="flex items-center bg-white px-3 py-1.5 border rounded-lg shadow-sm hover:border-blue-300 transition-all">
                      Language <ChevronDown size={12} className="ml-2" />
                    </button>
                  </div>
                </div>
              </footer>
            </div>
            
            {/* Right Sidebar */}
            <div className="lg:w-[320px] xl:w-[380px] flex-shrink-0 border-l bg-white hidden lg:block overflow-y-auto custom-scrollbar animate-in slide-in-from-right duration-500">
              <RightSidebar onAction={notify} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
