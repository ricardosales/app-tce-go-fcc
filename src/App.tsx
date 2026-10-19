import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StudyService, AppStoreState } from './services/studyService';
import { TabType, BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { ScreenHoje } from './components/ScreenHoje';
import { ScreenEstudo } from './components/ScreenEstudo';
import { ScreenRevisoes } from './components/ScreenRevisoes';
import { ScreenProgresso } from './components/ScreenProgresso';
import { ScreenEdital } from './components/ScreenEdital';
import { ModalProfileAndEdital } from './components/ModalProfileAndEdital';
import { ModalWelcome } from './components/ModalWelcome';
import { ModalPacing } from './components/ModalPacing';
import { ThemeMode } from './components/ThemeSelector';
import { CompletedSessionItem, EnrichedLesson } from './types';
import { SYLLABUS } from './data/syllabus';
import { STUDY_CONTENT } from './data/studyContent';
import { DRIVE_PDF_REFERENCES } from './data/drivePdfReferences';

export default function App() {
  const service = StudyService.getInstance();
  const [appState, setAppState] = useState<AppStoreState>(service.getState());
  const [activeTab, setActiveTab] = useState<TabType>('hoje');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      return localStorage.getItem('revisaai_theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPacingOpen, setIsPacingOpen] = useState(false);
  const [inspectedSession, setInspectedSession] = useState<CompletedSessionItem | null>(null);

  // View mode: mobile frame simulation vs responsive full width
  const isNativeApp = Capacitor.isNativePlatform();
  const [viewMode, setViewMode] = useState<'mobile' | 'expanded'>(() => isNativeApp ? 'expanded' : 'mobile');

  // Synchronize state
  const refreshState = () => {
    setAppState({ ...service.getState() });
  };

  useEffect(() => {
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleStartStudy = () => {
    setActiveTab('estudo');
  };

  const handleStartCurriculumTopic = (subjectName: string, subjectId: string, title: string, topicId: string) => {
    const lesson = STUDY_CONTENT[topicId];
    const references = lesson?.references ?? [];
    service.setCurrentTopic({
      id: topicId,
      syllabusTopicId: topicId,
      subjectId,
      subjectName,
      moduleCode: 'Conteúdo Programático · TCE-GO B02',
      title,
      subtitle: lesson ? 'Aula de estudo · material autoral com referências' : 'Assunto do edital verticalizado · aula em preparação',
      banca: 'FCC',
      estimatedMinutes: 60,
      flashcardCount: 0,
      testCount: 0,
      incidenceRate: 'Conteúdo previsto no edital oficial',
      audioDuration: '—',
      summary: lesson?.summary || `Assunto previsto no conteúdo programático do TCE-GO B02: ${title}. Ainda não há aula cadastrada para este assunto. Use suas anotações e consulte as referências do edital.`,
      lessonSections: lesson?.lessonSections,
      example: lesson?.example,
      references: [
        ...references,
        ...(DRIVE_PDF_REFERENCES[topicId] ?? []).filter(
          (pdf) => !references.some((reference) => reference.url === pdf.url),
        ),
      ],
      quickQuestions: lesson?.quickQuestions || [],
    });
    refreshState();
    setActiveTab('estudo');
  };

  const handleFinishStudy = (rating: 'dificil' | 'medio' | 'facil') => {
    service.completeSession(rating);
    refreshState();
  };

  const handleReviewItem = (id: string, rating: 'dificil' | 'medio' | 'facil' = 'medio') => {
    service.completeReviewQueueItem(id, rating);
    refreshState();
  };

  const handleAnticipateReviews = () => {
    service.anticipateReviews();
    refreshState();
  };

  const handleResetData = () => {
    service.resetToDefault();
    refreshState();
  };

  const handleSaveProfileName = (name: string) => {
    service.saveProfileName(name);
    refreshState();
  };

  const handleThemeChange = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    try {
      localStorage.setItem('revisaai_theme', nextTheme);
    } catch {
      // The current selection still applies for this session if storage is unavailable.
    }
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const handleSaveEnrichedLesson = (topicId: string, lesson: EnrichedLesson) => {
    service.saveEnrichedLesson(topicId, lesson);
    refreshState();
  };

  const handleSavePacing = (dailyTopics: number) => {
    service.setDailyTopicGoal(dailyTopics);
    refreshState();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-on-surface selection:bg-primary-fixed">
      {/* Top Bar with View Mode Toggle and Edital Quick Switcher */}
      {!isNativeApp && <div className="w-full bg-white border-b border-slate-200 py-2 px-4 flex items-center justify-between text-xs text-on-surface-variant z-50 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>RevisaAI</span>
          </div>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="hidden sm:inline">
            TCE-GO B02 • Plano de Estudos
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Shell vs Full Width View Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'expanded' : 'mobile')}
            className="flex items-center gap-1 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-on-surface-variant font-medium transition-colors cursor-pointer"
            title="Alternar entre Visualização Mobile e Expandida"
          >
            <span className="material-symbols-outlined text-[15px]">
              {viewMode === 'mobile' ? 'aspect_ratio' : 'smartphone'}
            </span>
            <span className="hidden sm:inline">
              {viewMode === 'mobile' ? 'Expandir' : 'Modo Mobile'}
            </span>
          </button>
        </div>
      </div>}

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 flex justify-center ${
          isNativeApp ? 'py-0 px-0' : viewMode === 'mobile' ? 'py-4 sm:py-6 px-2' : 'py-2 px-4 max-w-2xl'
        }`}
      >
        <div
          className={`w-full bg-surface relative flex flex-col min-h-screen ${
            isNativeApp
              ? 'w-full'
              : viewMode === 'mobile'
              ? 'max-w-md rounded-[38px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] border-[7px] border-slate-900/95 overflow-hidden'
              : 'rounded-2xl shadow-sm border border-slate-200'
          }`}
        >
          {/* Dynamic Island / Notch Simulation in Mobile Mode */}
          {!isNativeApp && viewMode === 'mobile' && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-50 pointer-events-none flex items-center justify-end pr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700/60"></div>
            </div>
          )}

          {/* Header */}
          <Header
            streakDays={appState.stats.streakDays}
            profileName={appState.profileName}
            onOpenProfile={() => setIsProfileOpen(true)}
          />

          {/* Main Scrollable Screen Content */}
          <main
            className="flex flex-col relative w-full px-4 pt-30 pb-32 bg-surface flex-grow min-h-[750px]"
            style={{ paddingTop: 'calc(7rem + env(safe-area-inset-top, 0px) + 1rem)' }}
          >
            {activeTab === 'hoje' && (
              <ScreenHoje
                profileName={appState.profileName}
                stats={appState.stats}
                heroTopic={appState.currentHeroTopic}
                reviewQueue={appState.reviewQueue}
                completedSessions={appState.completedSessions}
                onStartStudy={handleStartStudy}
                onReviewItem={handleReviewItem}
                onViewCompleted={(session) => setInspectedSession(session)}
              />
            )}

            {activeTab === 'estudo' && (
              <ScreenEstudo
                topic={appState.currentHeroTopic}
                enrichedLesson={appState.enrichedLessons[appState.currentHeroTopic.id]}
                notes={appState.topicNotes[appState.currentHeroTopic.id] || ''}
                onSaveNotes={(topicId, notes) => {
                  service.saveTopicNotes(topicId, notes);
                }}
                onSaveEnrichedLesson={handleSaveEnrichedLesson}
                onFinishStudy={handleFinishStudy}
                onBackToToday={() => setActiveTab('hoje')}
              />
            )}

            {activeTab === 'edital' && (
              <ScreenEdital
                completedTopicIds={appState.completedTopicIds}
                onStartTopic={handleStartCurriculumTopic}
              />
            )}

            {activeTab === 'revisoes' && (
              <ScreenRevisoes
                reviewQueue={appState.reviewQueue}
                upcomingCycles={appState.upcomingCycles}
                onReviewItem={handleReviewItem}
                onAnticipateReviews={handleAnticipateReviews}
                onOpenPacingModal={() => setIsPacingOpen(true)}
                onSelectTopicForReview={(item) => {
                  const subject = SYLLABUS.find((entry) => entry.name === item.subject);
                  if (!subject) return;
                  const index = subject.topics.indexOf(item.topicTitle);
                  if (index >= 0) {
                    handleStartCurriculumTopic(subject.name, subject.id, item.topicTitle, `${subject.id}-${index}`);
                  } else {
                    setActiveTab('estudo');
                  }
                }}
              />
            )}

            {activeTab === 'progresso' && (
              <ScreenProgresso
                stats={appState.stats}
                subjects={appState.subjects}
                pendingReviewsCount={appState.reviewQueue.length}
                onOpenEditalModal={() => setActiveTab('edital')}
              />
            )}
          </main>

          {/* Bottom Floating Navigation */}
          <BottomNav activeTab={activeTab} onChangeTab={(tab) => setActiveTab(tab)} />
        </div>
      </div>

      {/* Modal: Perfil e Configurações de Edital */}
      {!appState.profileName.trim() && <ModalWelcome onSaveName={handleSaveProfileName} theme={theme} onThemeChange={handleThemeChange} />}

      {isProfileOpen && (
        <ModalProfileAndEdital
          profileName={appState.profileName}
          onSaveName={handleSaveProfileName}
          dailyTopicGoal={appState.stats.metaDailyTotal}
          theme={theme}
          onThemeChange={handleThemeChange}
          onResetData={handleResetData}
          onClose={() => setIsProfileOpen(false)}
        />
      )}

      {/* Modal: Ajustar Ritmo */}
      {isPacingOpen && (
        <ModalPacing
          onClose={() => setIsPacingOpen(false)}
          currentGoal={appState.stats.metaDailyTotal}
          onSavePacing={handleSavePacing}
        />
      )}

      {/* Modal: Detalhes de Sessão Concluída */}
      {inspectedSession && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-3xl p-5 shadow-2xl flex flex-col gap-3 border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-on-surface">Ciclo Concluído</h3>
                  <span className="text-[10px] font-label-code text-on-surface-variant">
                    Finalizado às {inspectedSession.completedAt}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setInspectedSession(null)}
                className="w-7 h-7 rounded-full hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-3 rounded-2xl space-y-1 text-[12px]">
              <span className="font-label-code text-primary uppercase font-bold text-[10px]">
                {inspectedSession.subject}
              </span>
              <p className="font-semibold text-on-surface">{inspectedSession.topicTitle}</p>
              <div className="pt-1 font-label-code text-[11px] text-on-surface-variant">
                {inspectedSession.durationMinutes} min · {inspectedSession.completedAt}
              </div>
            </div>

            <div className="text-[11px] text-on-surface-variant leading-relaxed">
              Sessão registrada. O app programou uma revisão conforme sua autoavaliação.
            </div>

            <button
              onClick={() => setInspectedSession(null)}
              className="w-full py-2 bg-secondary text-on-secondary font-bold text-[12px] rounded-xl cursor-pointer"
            >
              Fechar Detalhes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
