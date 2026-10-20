import React, { useState } from 'react';
import { TopicItem, ReviewQueueItem, CompletedSessionItem, UserStats } from '../types';

interface ScreenHojeProps {
  profileName: string;
  stats: UserStats;
  heroTopic: TopicItem | null;
  reviewQueue: ReviewQueueItem[];
  completedSessions: CompletedSessionItem[];
  onStartStudy: (topic: TopicItem) => void;
  onReviewItem: (id: string) => void;
  onViewCompleted: (item: CompletedSessionItem) => void;
}

export const ScreenHoje: React.FC<ScreenHojeProps> = ({
  profileName,
  stats,
  heroTopic,
  reviewQueue,
  completedSessions,
  onStartStudy,
  onReviewItem,
  onViewCompleted,
}) => {
  const [quickReviewToast, setQuickReviewToast] = useState<string | null>(null);

  const handleQuickReview = (item: ReviewQueueItem) => {
    onReviewItem(item.id);
    setQuickReviewToast(`Revisão de "${item.subject}" concluída.`);
    setTimeout(() => {
      setQuickReviewToast(null);
    }, 3000);
  };

  const progressPercent = Math.min(
    100,
    Math.round((stats.metaDailyDone / Math.max(1, stats.metaDailyTotal)) * 100)
  );

  const remainingTopics = Math.max(0, stats.metaDailyTotal - stats.metaDailyDone);
  const remainingText = remainingTopics > 0
    ? `Faltam ${remainingTopics} ${remainingTopics === 1 ? 'tópico' : 'tópicos'}`
    : 'Meta diária concluída — continue no seu ritmo!';

  return (
    <div className="flex flex-col w-full space-y-4">
      {/* Toast Notification */}
      {quickReviewToast && (
        <div className="fixed top-24 left-4 right-4 z-50 bg-secondary text-on-secondary px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="text-xs font-semibold">{quickReviewToast}</span>
        </div>
      )}

      {/* Saudação e Boas-vindas */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[26px] font-bold text-on-surface tracking-tight leading-tight">
              Olá, {profileName || 'estudante'}!
            </h1>
            <span className="text-xl animate-bounce">👋</span>
          </div>
          <p className="text-[13px] text-on-surface-variant mt-0.5">
            {heroTopic ? (
              <>Seu próximo tópico é <span className="text-primary font-semibold">{heroTopic.subjectName}</span> e há{' '}
                <span className="text-on-surface font-semibold">{reviewQueue.length} revisões</span> para hoje.</>
            ) : (
              <>Você concluiu todos os tópicos disponíveis e há <span className="text-on-surface font-semibold">{reviewQueue.length} revisões</span> para hoje.</>
            )}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full shadow-xs">
            <span
              className="material-symbols-outlined text-tertiary text-[17px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span className="font-label-code text-tertiary text-[11px]">
              Meta {stats.metaDailyDone}/{stats.metaDailyTotal}
            </span>
          </div>
        </div>
      </div>

      {/* Indicador de Foco e Ritmo Diário */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">menu_book</span>
            </div>
            <div>
              <span className="font-label-code uppercase tracking-wider text-on-surface-variant block text-[10px]">
                Meta de Hoje
              </span>
              <span className="text-[16px] text-on-surface font-bold leading-tight">
                {stats.metaDailyTotal} {stats.metaDailyTotal === 1 ? 'tópico' : 'tópicos'} planejados
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-label-code text-secondary font-bold text-[12px] block">
              {progressPercent}% concluído
            </span>
            <span className="text-on-surface-variant block text-[11px]">
              {stats.doneMinutesToday} min estimados
            </span>
          </div>
        </div>

        {/* Barra de Progresso Segmentada */}
        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden flex">
          <div
            className="bg-secondary h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-on-surface-variant font-label-code text-[11px]">
          <span className="flex items-center gap-1.5 text-on-surface">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>{stats.metaDailyDone}/{stats.metaDailyTotal} tópicos concluídos</span>
          </span>
          <span className="text-on-surface-variant">{remainingText}</span>
        </div>
      </div>

      {/* META DO DIA - CONTEÚDO NOVO (Card Hero / Destaque) */}
      {heroTopic ? (
      <div className="relative bg-surface-container-lowest rounded-2xl p-4 shadow-md border border-slate-100 overflow-hidden flex flex-col gap-3">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent rounded-full -mr-16 -mt-16 pointer-events-none"></div>

        {/* Badges de Cabeçalho */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 bg-primary-fixed px-2.5 py-1 rounded-full text-on-primary-fixed font-semibold text-[11px] shadow-xs">
            <span
              className="material-symbols-outlined text-[15px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_awesome
            </span>
            <span>Tópico selecionado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-surface-container-high text-on-surface font-label-code text-[10px] px-2 py-0.5 rounded uppercase">
              {heroTopic.banca}
            </span>
          </div>
        </div>

        {/* Matéria e Título */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="font-label-code text-primary uppercase font-bold tracking-wider text-[11px]">
              {heroTopic.subjectName}
            </span>
          </div>
          <h2 className="text-[17px] text-on-surface font-bold leading-snug">
            {heroTopic.title}
          </h2>
          <p className="text-[12px] text-on-surface-variant line-clamp-2 leading-relaxed">
            {heroTopic.subtitle}
          </p>
        </div>

        {/* Métricas do Conteúdo (Cards Informativos Compactos) */}
        <div className="grid grid-cols-3 gap-2 py-0.5">
          <div className="bg-surface-container-low rounded-xl p-2 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-primary text-[19px]">schedule</span>
            <span className="font-label-code text-on-surface font-bold mt-0.5 text-[11px]">
              {heroTopic.estimatedMinutes} min
            </span>
            <span className="text-on-surface-variant text-[10px]">Estimado</span>
          </div>
          <div className="bg-surface-container-low rounded-xl p-2 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-tertiary text-[19px]">style</span>
            <span className="font-label-code text-on-surface font-bold mt-0.5 text-[11px]">
              {heroTopic.flashcardCount} cards
            </span>
            <span className="text-on-surface-variant text-[10px]">Flashcards</span>
          </div>
          <div className="bg-surface-container-low rounded-xl p-2 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-secondary text-[19px]">fact_check</span>
            <span className="font-label-code text-on-surface font-bold mt-0.5 text-[11px]">
              {heroTopic.testCount} testes
            </span>
            <span className="text-on-surface-variant text-[10px]">Fixação</span>
          </div>
        </div>

        {/* Miniatura Ilustrativa / Contextual */}
        <div className="relative w-full h-22 rounded-xl overflow-hidden bg-surface-container-high flex items-center px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-surface-container-highest via-surface-container-high to-primary/10"></div>
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[24px]">gavel</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-code text-primary font-bold uppercase tracking-wider text-[10px]">
                Pontos Críticos Mapeados
              </span>
              <span className="text-[12px] text-on-surface font-medium leading-tight mt-0.5">
                {heroTopic.incidenceRate}
              </span>
            </div>
          </div>
        </div>

        {/* Botão Primário */}
        <button
          onClick={() => onStartStudy(heroTopic)}
          className="w-full h-12 py-3 px-6 bg-primary hover:bg-primary-container text-on-primary text-[15px] font-semibold rounded-full shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-1 cursor-pointer"
        >
            <span>Abrir tópico de estudo</span>
          <span className="material-symbols-outlined text-[19px]">arrow_forward</span>
        </button>
      </div>
      ) : (
        <div className="bg-surface-container-lowest rounded-2xl p-5 text-center shadow-sm border border-slate-100">
          <span className="material-symbols-outlined text-secondary text-[32px]">task_alt</span>
          <h2 className="text-[16px] text-on-surface font-bold mt-2">Todos os tópicos foram concluídos</h2>
          <p className="text-[12px] text-on-surface-variant mt-1">
            Não há outro tópico pendente no edital. Você ainda pode revisar os conteúdos já estudados.
          </p>
        </div>
      )}

      {/* FILA DE REVISÕES DE HOJE (Repetição Espaçada SRS) */}
      <div className="flex flex-col space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[17px] text-on-surface font-bold">Fila de Revisões</h3>
            <span className="bg-secondary-fixed text-on-secondary-fixed font-label-code text-[10px] px-2 py-0.5 rounded-full font-bold">
              {reviewQueue.length} pendentes
            </span>
          </div>
          <span className="text-[11px] text-on-surface-variant font-label-code flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">sync</span> Revisões espaçadas
          </span>
        </div>

        {/* Lista de Cards de Revisão */}
        <div className="flex flex-col space-y-2.5">
          {reviewQueue.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-xl p-4 text-center text-on-surface-variant text-xs">
              🎉 Todas as revisões de hoje estão concluídas!
            </div>
          ) : (
            reviewQueue.map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-xl p-3.5 shadow-sm border border-slate-100 flex items-center justify-between gap-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      item.color === 'tertiary'
                        ? 'bg-tertiary-fixed text-tertiary'
                        : item.color === 'secondary'
                        ? 'bg-secondary-fixed text-secondary'
                        : 'bg-surface-container-high text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-label-code text-[9px] px-1.5 py-0.5 rounded uppercase font-semibold ${
                          item.color === 'tertiary'
                            ? 'bg-tertiary-fixed/60 text-tertiary'
                            : item.color === 'secondary'
                            ? 'bg-secondary-container text-secondary'
                            : 'bg-surface-container text-primary'
                        }`}
                      >
                        {item.intervalTag}
                      </span>
                      <span className="text-on-surface-variant text-[11px] flex items-center gap-0.5 font-label-code">
                        <span className="material-symbols-outlined text-[12px]">timer</span>{' '}
                        {item.durationMinutes} min
                      </span>
                    </div>
                    <h4 className="text-[14px] leading-tight text-on-surface font-semibold truncate mt-0.5">
                      {item.subject}
                    </h4>
                    <p className="text-on-surface-variant text-[11px] truncate">{item.topicTitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleQuickReview(item)}
                  className="shrink-0 px-3 py-1.5 bg-surface-container text-primary hover:bg-primary hover:text-on-primary text-[12px] font-semibold rounded-full transition-colors flex items-center gap-1 shadow-xs cursor-pointer active:scale-95"
                >
                  <span>Revisar</span>
                  <span className="material-symbols-outlined text-[15px]">play_arrow</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sessões recentes */}
      <div className="flex flex-col space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="font-label-code uppercase tracking-wider text-on-surface-variant font-semibold text-[10px]">
            Últimas sessões ({completedSessions.length})
          </span>
          <span className="font-label-code text-secondary text-[11px]">Sessões registradas</span>
        </div>

        {completedSessions.map((session) => (
          <div
            key={session.id}
            className="bg-surface-container-low/70 rounded-xl p-3 flex items-center justify-between gap-3 opacity-95 hover:opacity-100 transition-opacity border border-slate-100"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">check</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-code text-[10px] text-on-surface-variant">
                    Concluído às {session.completedAt}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="font-label-code text-[10px] text-secondary font-bold">
                    {session.durationMinutes} min
                  </span>
                </div>
                <span className="text-[12px] text-on-surface font-medium truncate">
                  {session.subject}: {session.topicTitle}
                </span>
              </div>
            </div>
            <button
              onClick={() => onViewCompleted(session)}
              className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0 cursor-pointer"
              title="Ver detalhes"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
            </button>
          </div>
        ))}
      </div>

      {/* Orientação de estudo */}
      <div className="bg-surface-container-high/60 rounded-xl p-3 flex items-center gap-3 border border-slate-100/60">
        <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0">
          <span className="material-symbols-outlined text-[16px]">neurology</span>
        </div>
        <p className="text-on-surface-variant text-[11px] leading-relaxed">
          <strong className="text-on-surface font-semibold">Sugestão:</strong> avance nos tópicos no seu ritmo e use o tempo registrado para acompanhar sua rotina de estudo.
        </p>
      </div>
    </div>
  );
};
