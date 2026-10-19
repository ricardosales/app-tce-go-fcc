import React from 'react';
import { ReviewQueueItem } from '../types';

interface ScreenRevisoesProps {
  reviewQueue: ReviewQueueItem[];
  upcomingCycles: ReviewQueueItem[];
  onReviewItem: (id: string, rating: 'dificil' | 'medio' | 'facil') => void;
  onAnticipateReviews: () => void;
  onOpenPacingModal: () => void;
  onSelectTopicForReview: (item: ReviewQueueItem) => void;
}

export const ScreenRevisoes: React.FC<ScreenRevisoesProps> = ({ reviewQueue, upcomingCycles, onReviewItem, onAnticipateReviews, onOpenPacingModal, onSelectTopicForReview }) => (
  <div className="flex flex-col gap-4 pb-8">
    <header>
      <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Revisão espaçada</div>
      <h1 className="text-[24px] font-bold text-on-surface">Revisões</h1>
      <p className="text-[12px] text-on-surface-variant">As datas são calculadas com base na sua autoavaliação ao terminar cada estudo.</p>
    </header>

    <section className="rounded-2xl border border-slate-100 bg-surface-container-lowest p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div><h2 className="text-[15px] font-bold text-on-surface">Para revisar hoje</h2><p className="text-[11px] text-on-surface-variant">{reviewQueue.length} assuntos vencidos</p></div>
        <span className="material-symbols-outlined text-primary">today</span>
      </div>
      {reviewQueue.length === 0 ? <p className="rounded-xl bg-surface-container-low p-3 text-[12px] text-on-surface-variant">Nenhuma revisão vencida. O app adicionará uma quando chegar a data programada.</p> : <div className="flex flex-col gap-2">
        {reviewQueue.map((item) => <ReviewCard key={item.id} item={item} actionLabel="Concluir revisão" onReview={(rating) => onReviewItem(item.id, rating)} />)}
      </div>}
    </section>

    <section className="rounded-2xl border border-slate-100 bg-surface-container-lowest p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div><h2 className="text-[15px] font-bold text-on-surface">Próximas revisões</h2><p className="text-[11px] text-on-surface-variant">{upcomingCycles.length} assuntos agendados</p></div>
        <span className="material-symbols-outlined text-primary">event_upcoming</span>
      </div>
      {upcomingCycles.length === 0 ? <p className="rounded-xl bg-surface-container-low p-3 text-[12px] text-on-surface-variant">Conclua um estudo e indique se foi difícil, médio ou fácil para criar a próxima revisão.</p> : <div className="flex flex-col gap-2">
        {upcomingCycles.map((item) => <ReviewCard key={item.id} item={item} actionLabel="Revisar agora" onReview={() => onSelectTopicForReview(item)} />)}
      </div>}
    </section>

    <button disabled={upcomingCycles.length === 0} onClick={onAnticipateReviews} className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-bold text-on-primary shadow-sm disabled:cursor-not-allowed disabled:opacity-40">
      <span className="material-symbols-outlined">bolt</span>Antecipar próxima revisão
    </button>
    <button onClick={onOpenPacingModal} className="flex h-11 items-center justify-center gap-2 rounded-full bg-surface-container-high text-[12px] font-semibold text-primary">
      <span className="material-symbols-outlined text-[18px]">tune</span>Ajustar meta semanal
    </button>
  </div>
);

const ReviewCard = ({ item, actionLabel, onReview }: { item: ReviewQueueItem; actionLabel: string; onReview: (rating: 'dificil' | 'medio' | 'facil') => void }) => (
  <div className="rounded-xl border border-slate-100 bg-surface-container-low p-3">
    <div className="flex items-start justify-between gap-2">
      <div><div className="text-[10px] font-bold uppercase tracking-wide text-primary">{item.subject} · {item.intervalTag}</div><div className="mt-1 text-[13px] font-semibold text-on-surface">{item.topicTitle}</div><div className="mt-1 text-[11px] text-on-surface-variant">{item.scheduledDate} · {item.durationMinutes} min</div></div>
      {actionLabel === 'Concluir revisão' ? <div className="flex flex-col gap-1"><span className="text-[9px] font-bold text-on-surface-variant">Como foi?</span><div className="flex gap-1">{(['dificil', 'medio', 'facil'] as const).map((rating) => <button key={rating} onClick={() => onReview(rating)} className="rounded-full bg-white px-2 py-1 text-[9px] font-bold text-primary shadow-sm">{rating === 'dificil' ? 'Difícil' : rating === 'medio' ? 'Médio' : 'Fácil'}</button>)}</div></div> : <button onClick={() => onReview('medio')} className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-primary shadow-sm">{actionLabel}</button>}
    </div>
  </div>
);
