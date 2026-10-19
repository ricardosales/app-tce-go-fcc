import React from 'react';

export type TabType = 'hoje' | 'estudo' | 'edital' | 'revisoes' | 'progresso';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'hoje', label: 'Hoje', icon: 'task_alt' },
    { id: 'estudo', label: 'Estudo', icon: 'auto_stories' },
    { id: 'edital', label: 'Edital', icon: 'checklist' },
    { id: 'revisoes', label: 'Revisões', icon: 'history_toggle_off' },
    { id: 'progresso', label: 'Progresso', icon: 'analytics' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full z-40 pointer-events-none pb-safe">
      <div className="px-4 pb-2.5 pointer-events-auto">
        <nav className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-full h-16 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.12)] border border-white/60 px-2 flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center w-16 h-12 group transition-all duration-200 ${
                  isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-12 h-7 rounded-full transition-colors ${
                    isActive ? 'bg-surface-container-high' : 'bg-transparent'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{
                      fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    {tab.icon}
                  </span>
                </div>
                <span
                  className={`font-label-sm text-[11px] tracking-tight mt-0.5 ${
                    isActive ? 'font-bold' : 'font-medium'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
      {/* Home Indicator line */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-on-surface/25 rounded-full"></div>
      </div>
    </div>
  );
};
