import React, { useState } from 'react';
import { StudyAvatar } from './StudyAvatar';
import { ThemeMode, ThemeSelector } from './ThemeSelector';

export const ModalWelcome: React.FC<{
  onSaveName: (name: string) => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}> = ({ onSaveName, theme, onThemeChange }) => {
  const [name, setName] = useState('');
  const trimmedName = name.trim();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
      <form onSubmit={(event) => { event.preventDefault(); if (trimmedName) onSaveName(trimmedName); }} className="flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl border border-slate-100 bg-surface-container-lowest p-6 text-center shadow-2xl">
        <StudyAvatar size="lg" />
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-primary">Seu espaço de estudo</p>
          <h1 className="mt-1 text-[23px] font-bold text-on-surface">Como podemos te chamar?</h1>
          <p className="mt-1 text-[12px] text-on-surface-variant">Seu nome fica salvo apenas neste dispositivo e pode ser alterado no perfil.</p>
        </div>
        <ThemeSelector value={theme} onChange={onThemeChange} />
        <label className="w-full text-left">
          <span className="mb-1 block text-[11px] font-semibold text-on-surface-variant">Seu nome</span>
          <input autoFocus autoComplete="given-name" maxLength={48} value={name} onChange={(event) => setName(event.target.value)} placeholder="Digite seu nome" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-[14px] text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
        </label>
        <button type="submit" disabled={!trimmedName} className="w-full rounded-full bg-primary py-3 text-[13px] font-bold text-on-primary shadow-sm disabled:cursor-not-allowed disabled:opacity-40">Começar a estudar</button>
      </form>
    </div>
  );
};
