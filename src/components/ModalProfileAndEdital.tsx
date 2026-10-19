import React, { useEffect, useState } from 'react';
import { StudyAvatar } from './StudyAvatar';
import { ThemeMode, ThemeSelector } from './ThemeSelector';
interface ModalProfileAndEditalProps {
  profileName: string;
  onSaveName: (name: string) => void;
  dailyTopicGoal: number;
  onResetData: () => void;
  onClose: () => void;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export const ModalProfileAndEdital: React.FC<ModalProfileAndEditalProps> = ({
  profileName,
  onSaveName,
  dailyTopicGoal,
  onResetData,
  onClose,
  theme,
  onThemeChange,
}) => {
  const [name, setName] = useState(profileName);
  const [nameSaved, setNameSaved] = useState(false);
  useEffect(() => setName(profileName), [profileName]);
  // Days to exam (target: 17/01/2027)
  const examDate = new Date(2027, 0, 17);
  const today = new Date();
  const diffTime = examDate.getTime() - today.getTime();
  const daysToExam = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl p-5 shadow-2xl flex flex-col gap-4 border border-slate-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <StudyAvatar />
            <div>
              <h3 className="text-[15px] font-bold text-on-surface">{profileName || 'Estudante'}</h3>
              <p className="text-[11px] font-label-code text-primary">Plano de estudos</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={(event) => { event.preventDefault(); const trimmedName = name.trim(); if (trimmedName) { onSaveName(trimmedName); setNameSaved(true); } }} className="space-y-2">
          <label className="block text-[11px] font-semibold text-on-surface-variant" htmlFor="profile-name">Seu nome</label>
          <div className="flex gap-2">
            <input id="profile-name" value={name} maxLength={48} onChange={(event) => { setName(event.target.value); setNameSaved(false); }} placeholder="Como podemos te chamar?" className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[13px] text-on-surface outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" />
            <button type="submit" disabled={!name.trim()} className="rounded-xl bg-primary px-3 text-[12px] font-bold text-on-primary disabled:opacity-40">Salvar</button>
          </div>
          {nameSaved && <p role="status" className="text-[11px] text-secondary">Nome salvo.</p>}
        </form>

        <ThemeSelector value={theme} onChange={onThemeChange} />

        {/* Exam Countdown */}
        <div className="bg-gradient-to-r from-primary to-primary-container p-3.5 rounded-2xl text-on-primary flex items-center justify-between shadow-sm">
          <div>
            <span className="text-[11px] font-label-code opacity-90 block">Contagem para a Prova</span>
            <span className="text-[13px] font-semibold">17 de Janeiro de 2027</span>
          </div>
          <div className="text-right">
            <span className="text-[20px] font-bold block">{daysToExam}</span>
            <span className="text-[10px] font-label-code opacity-90">dias restantes</span>
          </div>
        </div>

        {/* Active Exam */}
        <div className="space-y-2">
          <span className="text-[12px] font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-primary">school</span>
            <span>Concurso em foco</span>
          </span>
          <div className="p-3 rounded-2xl border border-primary bg-primary-fixed/40 ring-1 ring-primary">
            <span className="text-[13px] font-bold text-on-surface block">
              TCE-GO 2026 · Cargo B02
            </span>
            <span className="text-[11px] text-on-surface-variant">
              Técnico de Controle Externo (Tecnologia da Informação)
            </span>
          </div>
        </div>

        {/* Daily Study Goal */}
        <div className="bg-surface-container-low p-3.5 rounded-2xl space-y-2 text-[12px] border border-slate-100">
          <div className="flex items-center justify-between font-semibold text-on-surface">
            <span>Meta diária:</span>
            <span className="text-primary font-label-code">{dailyTopicGoal} {dailyTopicGoal === 1 ? 'tópico' : 'tópicos'}</span>
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            Conclua os tópicos no seu ritmo. O tempo de estudo continua sendo registrado como referência, sem uma meta fixa de horas.
          </p>
        </div>

        {/* Reset State Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Deseja apagar seu progresso, anotações, nome e configurações salvos neste dispositivo?')) {
                onResetData();
                onClose();
              }
            }}
            className="text-[11px] text-on-surface-variant hover:text-error flex items-center gap-1 cursor-pointer font-label-code"
          >
            <span className="material-symbols-outlined text-[15px]">restart_alt</span>
            <span>Restaurar dados iniciais</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-on-primary font-bold text-[12px] rounded-full cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
