import React from 'react';
import { UserStats, SubjectItem } from '../types';

interface ScreenProgressoProps {
  stats: UserStats;
  subjects: SubjectItem[];
  pendingReviewsCount: number;
  onOpenEditalModal: () => void;
}

export const ScreenProgresso: React.FC<ScreenProgressoProps> = ({ stats, subjects, pendingReviewsCount, onOpenEditalModal }) => {
  const progress = stats.editalProgressTotal > 0
    ? Math.round((stats.editalProgressCurrent / stats.editalProgressTotal) * 100)
    : 0;

  return <div className="flex flex-col gap-4 pb-8">
    <header>
      <div className="text-[11px] font-bold uppercase tracking-wider text-primary">TCE-GO · B02</div>
      <h1 className="text-[24px] font-bold text-on-surface">Seu progresso</h1>
      <p className="text-[12px] text-on-surface-variant">Indicadores baseados nas sessões registradas no app.</p>
    </header>

    <div className="rounded-2xl border border-slate-100 bg-surface-container-lowest p-4 shadow-sm">
      <div className="flex items-end justify-between">
        <div><span className="text-[11px] text-on-surface-variant">Assuntos concluídos</span>
          <div className="text-[26px] font-bold text-on-surface">{stats.editalProgressCurrent}<span className="text-[14px] font-normal text-on-surface-variant"> / {stats.editalProgressTotal}</span></div></div>
        <span className="text-[13px] font-bold text-primary">{progress}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-container-high"><div className="h-full bg-primary" style={{ width: `${progress}%` }} /></div>
      <button onClick={onOpenEditalModal} className="mt-3 text-[12px] font-bold text-primary">Abrir edital verticalizado →</button>
    </div>

    <div className="grid grid-cols-2 gap-2.5">
      <Metric label="Estudo hoje" value={`${Math.floor(stats.doneMinutesToday / 60)}h ${stats.doneMinutesToday % 60}m`} detail="Tempo estimado" icon="timer" />
      <Metric label="Tópicos concluídos hoje" value={String(stats.metaDailyDone)} detail={`Meta: ${stats.metaDailyTotal} ${stats.metaDailyTotal === 1 ? 'tópico' : 'tópicos'}`} icon="task_alt" />
      <Metric label="Revisões pendentes" value={String(pendingReviewsCount)} detail="Na fila de hoje" icon="history" />
      <Metric label="Dias consecutivos" value={String(stats.streakDays)} detail="Calculado pelo uso do app" icon="local_fire_department" />
    </div>

    <section className="rounded-2xl border border-slate-100 bg-surface-container-lowest p-4 shadow-sm">
      <div className="mb-3"><h2 className="text-[15px] font-bold text-on-surface">Andamento por disciplina</h2>
        <p className="text-[11px] text-on-surface-variant">Percentual de assuntos do edital que você marcou como estudados.</p></div>
      <div className="flex flex-col gap-3">
        {subjects.map((subject) => <div key={subject.id}>
          <div className="mb-1 flex items-center justify-between gap-2">
            <span className="text-[12px] font-medium text-on-surface">{subject.name}</span>
            <span className="shrink-0 text-[10px] text-on-surface-variant">{subject.topicsReviewed} assuntos · {subject.masteryPercentage}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high"><div className="h-full bg-secondary" style={{ width: `${subject.masteryPercentage}%` }} /></div>
        </div>)}
      </div>
    </section>
  </div>;
};

const Metric = ({ label, value, detail, icon }: { label: string; value: string; detail: string; icon: string }) => (
  <div className="rounded-2xl border border-slate-100 bg-surface-container-lowest p-3.5 shadow-sm">
    <span className="material-symbols-outlined text-[18px] text-primary">{icon}</span>
    <div className="mt-2 text-[10px] text-on-surface-variant">{label}</div>
    <div className="text-[20px] font-bold text-on-surface">{value}</div>
    <div className="text-[10px] text-on-surface-variant">{detail}</div>
  </div>
);
