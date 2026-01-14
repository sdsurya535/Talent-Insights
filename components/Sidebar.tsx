
import React, { useState } from 'react';
import { X, Plus, ChevronDown, ChevronUp } from 'lucide-react';

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
  <div className="flex items-center bg-[#e7f3ff] text-[#006097] px-2 py-1 rounded text-xs font-semibold mb-2 mr-2 max-w-full">
    <span className="truncate">{label}</span>
    <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="ml-1 flex-shrink-0 hover:text-[#004182]">
      <X size={12} />
    </button>
  </div>
);

interface FilterSectionProps {
  title: string;
  children?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  onAdd?: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, isOpen, onToggle, onAdd }) => (
  <div className="border-b">
    <div 
      onClick={onToggle}
      className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-gray-50 transition-colors group"
    >
      <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      <div className="flex items-center space-x-2">
        {onAdd && (
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(); }} 
            className="p-1 hover:bg-blue-50 rounded-full text-gray-400 group-hover:text-blue-600 transition-colors"
          >
            <Plus size={16} />
          </button>
        )}
        <div className="text-gray-400">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
    </div>
    {isOpen && <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-1 duration-200">{children}</div>}
  </div>
);

interface SidebarProps {
  filters: FilterState;
  onUpdateFilters: (key: keyof FilterState, value: string[]) => void;
  onApply: () => void;
  isOpen?: boolean;
  onCloseMobile?: () => void;
  onAction: (msg: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ filters, onUpdateFilters, onApply, isOpen, onCloseMobile, onAction }) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Job title': true,
    'Location': true,
    'Skill': true
  });

  const toggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleRemove = (key: keyof FilterState, index: number) => {
    const label = filters[key][index];
    const newList = [...filters[key]];
    newList.splice(index, 1);
    onUpdateFilters(key, newList);
    onAction(`Removed filter: ${label}`);
  };

  const handleAddPrompt = (key: keyof FilterState) => {
    const val = prompt(`Enter new ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}:`);
    if (val && val.trim()) {
      onUpdateFilters(key, [...filters[key], val.trim()]);
      onAction(`Added filter: ${val.trim()}`);
      const title = key === 'jobTitles' ? 'Job title' : key === 'locations' ? 'Location' : 'Skill';
      setOpenSections(prev => ({ ...prev, [title]: true }));
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] lg:hidden" 
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        fixed lg:sticky top-12 left-0 h-[calc(100vh-48px)] w-72 bg-white border-r flex flex-col z-[70] transition-transform duration-300 shadow-xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          <FilterSection 
            title="Job title" 
            isOpen={!!openSections['Job title']} 
            onToggle={() => toggleSection('Job title')}
            onAdd={() => handleAddPrompt('jobTitles')}
          >
            <div className="flex flex-wrap">
              {filters.jobTitles.map((label, idx) => (
                <FilterChip key={idx} label={label} onRemove={() => handleRemove('jobTitles', idx)} />
              ))}
            </div>
            <div onClick={() => onAction("Opening Exclude Job Titles menu")} className="mt-2 text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Exclude titles</div>
          </FilterSection>

          <FilterSection 
            title="Location" 
            isOpen={!!openSections['Location']} 
            onToggle={() => toggleSection('Location')}
            onAdd={() => handleAddPrompt('locations')}
          >
            <div className="flex flex-wrap">
              {filters.locations.map((label, idx) => (
                <FilterChip key={idx} label={label} onRemove={() => handleRemove('locations', idx)} />
              ))}
            </div>
          </FilterSection>

          <FilterSection 
            title="Skill" 
            isOpen={!!openSections['Skill']} 
            onToggle={() => toggleSection('Skill')}
            onAdd={() => handleAddPrompt('skills')}
          >
            <div className="flex flex-wrap">
              {filters.skills.map((label, idx) => (
                <FilterChip key={idx} label={label} onRemove={() => handleRemove('skills', idx)} />
              ))}
            </div>
            <div onClick={() => onAction("Opening Mandatory Skills criteria")} className="mt-2 text-xs text-blue-600 font-semibold cursor-pointer hover:underline">And include skills</div>
          </FilterSection>

          {['Company', 'Industry', 'Function', 'Advanced filters'].map(title => (
             <FilterSection key={title} title={title} isOpen={!!openSections[title]} onToggle={() => toggleSection(title)} />
          ))}
        </div>

        <div className="p-4 bg-white border-t sticky bottom-0 flex flex-col items-center">
          <button 
            onClick={() => {
              onApply();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full bg-[#0a66c2] text-white font-semibold py-2 rounded-full hover:bg-[#004182] transition-all shadow-sm active:scale-[0.98]"
          >
            Apply filters
          </button>
          <p className="text-center text-[10px] text-gray-500 mt-2 font-medium tracking-wide">885,533 Professionals on LinkedIn</p>
        </div>
      </aside>
    </>
  );
};
