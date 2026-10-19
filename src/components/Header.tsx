import React from 'react';
import { Capacitor } from '@capacitor/core';
import { StudyAvatar } from './StudyAvatar';
import logoUrl from '../assets/revisaai-mark.svg';
interface HeaderProps {
  streakDays: number;
  profileName: string;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  streakDays,
  profileName,
  onOpenProfile,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 max-w-md mx-auto w-full z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-safe">
      <div className="flex flex-col h-28">
        {/* Status Bar */}
        {!Capacitor.isNativePlatform() && <div className="flex items-center justify-between px-4 h-7 text-on-surface-variant font-label-code text-[11px] select-none">
          <span>09:41</span>
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-[15px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[15px]">wifi</span>
            <span className="material-symbols-outlined text-[16px]">battery_full</span>
          </div>
        </div>}

        {/* App Bar */}
        <div className="flex items-center justify-between px-4 flex-1">
          {/* Logo & Edital Title */}
          <div className="flex items-center gap-2.5">
            <img
              alt="RevisaAI Logo"
              className="h-8 w-8 object-contain rounded-lg"
              src={logoUrl}
            />
            <div className="flex flex-col">
              <span className="font-bold text-[17px] text-primary tracking-tight leading-none">
                RevisaAI
              </span>
              <span className="font-label-code text-on-surface-variant uppercase tracking-wider text-[10px] mt-0.5 flex items-center gap-1">
                <span>Edital Ativo: TCE-GO (B02)</span>
              </span>
            </div>
          </div>

          {/* Streak & Profile Avatar */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
              <span className="text-sm leading-none">🔥</span>
              <span className="font-label-code text-tertiary leading-none font-bold text-[11px]">
                {streakDays} dias
              </span>
            </div>

            <button
              onClick={onOpenProfile}
              aria-label={`Perfil de ${profileName || 'estudante'}`}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors focus:outline-none ring-2 ring-primary/20"
            >
              <StudyAvatar size="sm" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
