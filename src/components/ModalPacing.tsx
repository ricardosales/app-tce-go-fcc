import React, { useState } from 'react';

interface ModalPacingProps {
  onClose: () => void;
  currentGoal: number;
  onSavePacing: (dailyTopics: number) => void;
}

export const ModalPacing: React.FC<ModalPacingProps> = ({ onClose, currentGoal, onSavePacing }) => {
  const [dailyTopics, setDailyTopics] = useState(currentGoal);

  return <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-xs">
    <div className="flex max-h-[90vh] w-full max-w-sm flex-col gap-4 overflow-y-auto rounded-3xl border border-slate-100 bg-surface-container-lowest p-5 shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <div><h3 className="text-[15px] font-bold text-on-surface">Meta diária de tópicos</h3><p className="text-[10px] text-on-surface-variant">Ajuste quantos tópicos quer concluir por dia</p></div>
        <button onClick={onClose} aria-label="Fechar" className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"><span className="material-symbols-outlined">close</span></button>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-surface-container-low p-4">
        <div className="flex items-center justify-between text-[12px] font-semibold"><span>Tópicos por dia</span><span className="font-bold text-primary">{dailyTopics} {dailyTopics === 1 ? 'tópico' : 'tópicos'}</span></div>
        <input type="range" min="1" max="5" step="1" value={dailyTopics} onChange={(event) => setDailyTopics(Number(event.target.value))} aria-label="Tópicos por dia" className="mt-4 w-full accent-primary" />
        <div className="flex justify-between text-[10px] text-on-surface-variant"><span>1 tópico</span><span>3 tópicos</span><span>5 tópicos</span></div>
      </div>
      <div className="rounded-2xl bg-surface-container-high p-3 text-[12px] leading-relaxed text-on-surface-variant">
        <strong className="text-on-surface">Como funciona:</strong> cada tópico de estudo concluído conta uma vez para a meta do dia. O app continua somando o tempo estimado das sessões como referência, sem exigir um número de horas.
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onClose} className="flex-1 rounded-full bg-surface-container py-2.5 text-[13px] font-semibold text-on-surface-variant">Cancelar</button>
        <button onClick={() => { onSavePacing(dailyTopics); onClose(); }} className="flex-1 rounded-full bg-primary py-2.5 text-[13px] font-bold text-on-primary">Salvar meta</button>
      </div>
    </div>
  </div>;
};
