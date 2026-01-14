
import React, { useState } from 'react';
import { X, Plus, ChevronDown, ChevronUp, Search, MapPin, Briefcase, Database, Filter, Building2, Globe, GraduationCap, Users } from 'lucide-react';

export interface FilterState {
  jobTitles: string[];
  locations: string[];
  skills: string[];
}

interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, onRemove }) => (
  <div className="flex items-center bg-[#e7f3ff] text-[#006097] px-2 py-1 rounded text-xs font-semibold mb-2 mr-2 max-w-full group/chip animate-in zoom-in-95 duration-200">
    <span className="truncate">{label}</span>
    <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="ml-1 flex-shrink-0 hover:text-[#004182] active:scale-75 transition-transform">
      <X size={12} />
    </button>
  </div>
);

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, icon, children, isOpen, onToggle }) => (
  <div className="border-b">
    <div 
      onClick={onToggle}
      className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-gray-50 transition-colors group"
    >
      <div className="flex items-center space-x-3">
        <span className="text-gray-400 group-hover:text-blue-600 transition-colors transform group-hover:scale-110 duration-200">{icon}</span>
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      <div className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
        <ChevronDown size={16} />
      </div>
    </div>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="px-4 pb-4">{children}</div>
    </div>
  </div>
);

interface SidebarProps {
  filters: FilterState;
  onUpdateFilters: (key: keyof FilterState, value: string[]) => void;
  onApply: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  onAction: (msg: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ filters, onUpdateFilters, onApply, isOpen, onCloseMobile, onAction }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Job title': true,
    'Location': true,
    'Skills': true
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleRemove = (key: keyof FilterState, index: number) => {
    const label = filters[key][index];
    const newList = [...filters[key]];
    newList.splice(index, 1);
    onUpdateFilters(key, newList);
    onAction(`Removed: ${label}`);
  };

  const handleAddPrompt = (key: keyof FilterState) => {
    const val = prompt(`Add ${key === 'jobTitles' ? 'Job Title' : key === 'locations' ? 'Location' : 'Skill'}:`);
    if (val && val.trim()) {
      onUpdateFilters(key, [...filters[key], val.trim()]);
      onAction(`Added: ${val.trim()}`);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={onCloseMobile}
      />

      <aside className={`
        fixed lg:sticky top-12 left-0 h-[calc(100vh-48px)] bg-white border-r flex flex-col z-[70] shadow-xl lg:shadow-none transition-all duration-300 ease-in-out
        ${isOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0 lg:border-none lg:overflow-hidden'}
      `}>
        <div className={`p-4 border-b flex items-center justify-between shrink-0 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <h2 className="font-bold text-gray-800 flex items-center truncate">
            <Filter size={18} className="mr-2 text-blue-600 flex-shrink-0" />
            Report Filters
          </h2>
          <button className="lg:hidden p-1 text-gray-400 hover:text-gray-600 transition-colors" onClick={onCloseMobile}>
            <X size={20} />
          </button>
        </div>

        <div className={`flex-grow overflow-y-auto custom-scrollbar transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <FilterSection 
            title="Job title" 
            icon={<Briefcase size={18} />}
            isOpen={!!openSections['Job title']} 
            onToggle={() => toggleSection('Job title')}
          >
            <div className="flex flex-wrap">
              {filters.jobTitles.map((label, idx) => (
                <FilterChip key={idx} label={label} onRemove={() => handleRemove('jobTitles', idx)} />
              ))}
              <button onClick={() => handleAddPrompt('jobTitles')} className="text-gray-400 hover:text-blue-600 p-1 border border-dashed border-gray-200 rounded mb-2 hover:border-blue-300 transition-all active:scale-90">
                <Plus size={14} />
              </button>
            </div>
            <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider cursor-pointer hover:underline mt-1" onClick={() => onAction("Excluded titles list")}>Exclude Titles</div>
          </FilterSection>

          <FilterSection 
            title="Location" 
            icon={<MapPin size={18} />}
            isOpen={!!openSections['Location']} 
            onToggle={() => toggleSection('Location')}
          >
            <div className="flex flex-wrap">
              {filters.locations.map((label, idx) => (
                <FilterChip key={idx} label={label} onRemove={() => handleRemove('locations', idx)} />
              ))}
              <button onClick={() => handleAddPrompt('locations')} className="text-gray-400 hover:text-blue-600 p-1 border border-dashed border-gray-200 rounded mb-2 hover:border-blue-300 transition-all active:scale-90">
                <Plus size={14} />
              </button>
            </div>
          </FilterSection>

          <FilterSection 
            title="Skills" 
            icon={<Database size={18} />}
            isOpen={!!openSections['Skills']} 
            onToggle={() => toggleSection('Skills')}
          >
             <div className="flex flex-wrap">
              {filters.skills.map((label, idx) => (
                <FilterChip key={idx} label={label} onRemove={() => handleRemove('skills', idx)} />
              ))}
              <button onClick={() => handleAddPrompt('skills')} className="text-gray-400 hover:text-blue-600 p-1 border border-dashed border-gray-200 rounded mb-2 hover:border-blue-300 transition-all active:scale-90">
                <Plus size={14} />
              </button>
            </div>
          </FilterSection>

          <FilterSection title="Company" icon={<Building2 size={18} />} isOpen={!!openSections['Company']} onToggle={() => toggleSection('Company')} />
          <FilterSection title="Industry" icon={<Globe size={18} />} isOpen={!!openSections['Industry']} onToggle={() => toggleSection('Industry')} />
          <FilterSection title="Seniority" icon={<Users size={18} />} isOpen={!!openSections['Seniority']} onToggle={() => toggleSection('Seniority')} />
          <FilterSection title="Education" icon={<GraduationCap size={18} />} isOpen={!!openSections['Education']} onToggle={() => toggleSection('Education')} />
        </div>

        <div className={`p-4 bg-white border-t sticky bottom-0 flex flex-col items-center shrink-0 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => {
              onApply();
              if (window.innerWidth < 1024) onCloseMobile();
            }}
            className="w-full bg-[#0a66c2] text-white font-bold py-2 rounded-full hover:bg-[#004182] transition-all shadow-md active:scale-95 flex items-center justify-center"
          >
            Apply filters
          </button>
          <p className="text-center text-[10px] text-gray-500 mt-2 font-bold tracking-widest uppercase">Analytical Talent Insights</p>
        </div>
      </aside>
    </>
  );
};
