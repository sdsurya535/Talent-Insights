
import React from 'react';
import { HelpCircle, User, LayoutGrid, ChevronDown, Bookmark, Share2, Download, Menu } from 'lucide-react';

interface LayoutProps {
  onAction: (msg: string) => void;
}

export const TopNav: React.FC<LayoutProps> = ({ onAction }) => {
  return (
    <nav className="bg-[#004182] text-white h-12 flex items-center justify-between px-4 sticky top-0 z-50">
      <div className="flex items-center space-x-6 h-full">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onAction("Navigating Home")}>
          <div className="bg-white text-[#004182] font-bold px-1 rounded-sm text-lg leading-none">in</div>
          <span className="font-semibold tracking-wider text-sm hidden md:block">TALENT INSIGHTS</span>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <button onClick={() => onAction("Navigating Home")} className="hover:text-gray-200 border-b-2 border-transparent border-white h-12 flex items-center">Home</button>
          <button onClick={() => onAction("Navigating Saved Reports")} className="hover:text-gray-200 border-b-2 border-transparent hover:border-white h-12 flex items-center">Saved</button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onAction("Opening Create Report dialog")}
          className="flex items-center space-x-1 text-sm bg-[#002d5a] px-3 py-1 rounded hover:bg-[#00376d] transition-colors"
        >
          <span>Create report</span>
          <ChevronDown size={14} />
        </button>
        <div className="flex items-center space-x-3 border-l border-blue-800 pl-4">
          <HelpCircle 
            size={20} 
            className="cursor-pointer hover:text-gray-300" 
            onClick={() => onAction("Opening Help Center")}
          />
          <div className="relative cursor-pointer" onClick={() => onAction("Opening Profile Menu")}>
            <User size={24} className="bg-gray-400 rounded-full p-0.5" />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 border-2 border-[#004182] rounded-full"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface HeaderProps extends LayoutProps {
  onToggleSidebar?: () => void;
}

export const DashboardHeader: React.FC<HeaderProps> = ({ onToggleSidebar, onAction }) => {
  return (
    <div className="bg-white border-b px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start space-x-4">
        <button 
          onClick={onToggleSidebar}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded"
        >
          <Menu size={24} />
        </button>
        <div className="bg-blue-50 p-3 rounded-md hidden sm:block">
          <LayoutGrid className="text-blue-600" size={28} />
        </div>
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">Talent Pool Report</h1>
          <div className="flex flex-wrap items-center text-xs md:text-sm text-gray-500 mt-1">
            <span className="mr-2 cursor-pointer hover:underline" onClick={() => onAction("Changing primary job title filter")}>Software Engineer</span>
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="mx-2 cursor-pointer hover:underline" onClick={() => onAction("Opening location overview")}>4 locations</span>
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="mx-2 cursor-pointer hover:underline" onClick={() => onAction("Opening skills details")}>6 skills</span>
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="ml-0 sm:ml-2 font-medium">885,533 professionals</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-3">
        <button 
          onClick={() => onAction("Report Bookmarked")}
          className="text-gray-600 hover:text-gray-800 hover:bg-gray-50 p-2 rounded transition-colors"
        >
          <Bookmark size={20} />
        </button>
        <button 
          onClick={() => onAction("Opening Share Dialog")}
          className="flex items-center space-x-2 border border-gray-300 px-3 md:px-4 py-1.5 rounded-sm text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Share2 size={16} />
          <span className="hidden sm:inline">Share</span>
        </button>
        <button 
          onClick={() => onAction("Exporting Report to PDF...")}
          className="flex items-center space-x-2 border border-gray-300 px-3 md:px-4 py-1.5 rounded-sm text-xs md:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Export</span>
        </button>
      </div>
    </div>
  );
};
