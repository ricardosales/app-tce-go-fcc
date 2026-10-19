import React from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeSelectorProps {
  value: ThemeMode;
  onChange: (theme: ThemeMode) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ value, onChange }) => (
  <div className="space-y-1.5 text-left">
    <span className="block text-[11px] font-semibold text-on-surface-variant">Aparência</span>
    <div className="grid grid-cols-2 gap-2" role="group" aria-label="Escolher tema">
      {([
        { id: 'light', label: 'Claro', icon: 'light_mode' },
        { id: 'dark', label: 'Escuro', icon: 'dark_mode' },
      ] as const).map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[12px] font-semibold transition-colors ${selected ? 'border-primary bg-primary text-on-primary' : 'border-slate-200 bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            <span className="material-symbols-outlined text-[17px]">{option.icon}</span>
            {option.label}
          </button>
        );
      })}
    </div>
  </div>
);
