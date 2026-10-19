import {
  TopicItem,
  ReviewQueueItem,
  CompletedSessionItem,
  UserStats,
  SubjectItem,
  Flashcard,
  EnrichedLesson,
} from '../types';
import {
  TCE_GO_HERO_TOPIC,
  INITIAL_USER_STATS,
  INITIAL_REVIEWS,
  INITIAL_UPCOMING_CYCLES,
  INITIAL_COMPLETED_SESSIONS,
  INITIAL_SUBJECTS,
  RESCUE_FLASHCARDS,
} from '../data/mockData';
import { SYLLABUS } from '../data/syllabus';

export interface AppStoreState {
  profileName: string;
  enrichedLessons: Record<string, EnrichedLesson>;
  stats: UserStats;
  currentHeroTopic: TopicItem;
  reviewQueue: ReviewQueueItem[];
  upcomingCycles: ReviewQueueItem[];
  completedSessions: CompletedSessionItem[];
  subjects: SubjectItem[];
  flashcards: Flashcard[];
  completedTopicIds: string[];
  completedTodayTopicIds: string[];
  topicNotes: Record<string, string>;
  activityDate: string;
  lastStudiedDate: string | null;
}

const STORAGE_KEY = 'revisa_ai_data_v2';
const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const dateLabel = (date: Date) => `${date.getDate()} ${date.toLocaleString('pt-BR', { month: 'short' })}`;

export class StudyService {
  private static instance: StudyService;
  private state: AppStoreState;

  private constructor() {
    this.state = this.loadState();
  }

  public static getInstance(): StudyService {
    if (!StudyService.instance) {
      StudyService.instance = new StudyService();
    }
    return StudyService.instance;
  }

  private loadState(): AppStoreState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const savedState = JSON.parse(saved) as AppStoreState;
        const migratedStats = { ...INITIAL_USER_STATS, ...savedState.stats };
        if (!Array.isArray(savedState.completedTodayTopicIds)) migratedStats.metaDailyDone = 0;
        return {
          ...this.createInitialState(),
          ...savedState,
          profileName: typeof savedState.profileName === 'string' ? savedState.profileName.trim() : '',
          enrichedLessons: savedState.enrichedLessons || {},
          stats: migratedStats,
          currentHeroTopic: savedState.currentHeroTopic || { ...TCE_GO_HERO_TOPIC },
          completedTopicIds: savedState.completedTopicIds || [],
          completedTodayTopicIds: savedState.completedTodayTopicIds || [],
          topicNotes: savedState.topicNotes || {},
          activityDate: savedState.activityDate || dateKey(new Date()),
          lastStudiedDate: savedState.lastStudiedDate || null,
        };
      }
    } catch (e) {
      console.warn('Could not read from localStorage, using initial state:', e);
    }

    return this.createInitialState();
  }

  private createInitialState(): AppStoreState {
    return {
      profileName: '',
      enrichedLessons: {},
      stats: { ...INITIAL_USER_STATS },
      currentHeroTopic: { ...TCE_GO_HERO_TOPIC },
      reviewQueue: [...INITIAL_REVIEWS],
      upcomingCycles: [...INITIAL_UPCOMING_CYCLES],
      completedSessions: [...INITIAL_COMPLETED_SESSIONS],
      subjects: [...INITIAL_SUBJECTS],
      flashcards: [...RESCUE_FLASHCARDS],
      completedTopicIds: [],
      completedTodayTopicIds: [],
      topicNotes: {},
      activityDate: dateKey(new Date()),
      lastStudiedDate: null,
    };
  }

  public saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  public getState(): AppStoreState {
    this.resetDailyCountersIfNeeded();
    this.promoteDueReviews();
    return this.state;
  }

  private resetDailyCountersIfNeeded(): void {
    const today = dateKey(new Date());
    if (this.state.activityDate === today) return;
    this.state.stats.doneMinutesToday = 0;
    this.state.stats.completedCyclesToday = 0;
    this.state.stats.metaDailyDone = 0;
    this.state.completedTodayTopicIds = [];
    this.state.activityDate = today;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (this.state.lastStudiedDate !== dateKey(yesterday)) this.state.stats.streakDays = 0;
    this.saveState();
  }

  private recordActivity(minutes: number): void {
    this.resetDailyCountersIfNeeded();
    const today = dateKey(new Date());
    if (this.state.lastStudiedDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      this.state.stats.streakDays = this.state.lastStudiedDate === dateKey(yesterday)
        ? this.state.stats.streakDays + 1
        : 1;
      this.state.lastStudiedDate = today;
    }
    this.state.stats.doneMinutesToday += minutes;
    this.state.stats.completedCyclesToday += 1;
  }

  private promoteDueReviews(): void {
    const today = dateKey(new Date());
    const due = this.state.upcomingCycles.filter((item) => item.dueDate && item.dueDate <= today);
    if (due.length === 0) return;
    this.state.upcomingCycles = this.state.upcomingCycles.filter((item) => !due.includes(item));
    this.state.reviewQueue.push(...due.map((item) => ({ ...item, scheduledDate: 'Hoje' })));
    this.saveState();
  }

  public setCurrentTopic(topic: TopicItem): AppStoreState {
    this.state.currentHeroTopic = topic;
    this.saveState();
    return this.state;
  }

  public saveTopicNotes(topicId: string, notes: string): AppStoreState {
    this.state.topicNotes[topicId] = notes;
    this.saveState();
    return this.state;
  }

  public setDailyTopicGoal(topicCount: number): AppStoreState {
    this.state.stats.metaDailyTotal = Math.min(5, Math.max(1, Math.round(topicCount)));
    this.saveState();
    return this.state;
  }

  public saveProfileName(name: string): AppStoreState {
    this.state.profileName = name.trim();
    this.saveState();
    return this.state;
  }

  public saveEnrichedLesson(topicId: string, lesson: EnrichedLesson): AppStoreState {
    this.state.enrichedLessons[topicId] = lesson;
    this.saveState();
    return this.state;
  }

  /**
   * Deterministic priority score from syllabus weight, mastery and forgetting interval.
   */
  public calculateTopicPriority(params: {
    weight: number; // 0-100
    mastery: number; // 0-100
    importance: number; // 0-100
    daysSinceStudy: number; // in days
    errorRate: number; // 0-100
  }): { priorityScore: number; justification: string } {
    const W = Math.min(100, Math.max(0, params.weight));
    const F = Math.min(100, Math.max(0, 100 - params.mastery));
    const I = Math.min(100, Math.max(0, params.importance));
    const R = Math.min(100, Math.max(0, params.daysSinceStudy * 10));
    const E = Math.min(100, Math.max(0, params.errorRate));

    const priorityScore = Math.round(
      0.3 * W + 0.3 * F + 0.2 * I + 0.1 * R + 0.1 * E
    );

    let justification = `Prioridade calibrada (${priorityScore}/100): `;
    if (F > 30) justification += `Fraqueza detectada na disciplina (${F}% inverso). `;
    if (W >= 60) justification += `Alto peso nas questões do edital. `;
    if (R > 50) justification += `Faz tempo desde o último estudo. `;

    return { priorityScore, justification };
  }

  /**
   * Complete study session and schedule a simple spaced review.
   */
  public completeSession(rating: 'dificil' | 'medio' | 'facil'): AppStoreState {
    const minutesAdded = this.state.currentHeroTopic.estimatedMinutes || 45;

    this.recordActivity(minutesAdded);
    const dailyTopicId = this.state.currentHeroTopic.syllabusTopicId || this.state.currentHeroTopic.id;
    if (!this.state.completedTodayTopicIds.includes(dailyTopicId)) {
      this.state.completedTodayTopicIds.push(dailyTopicId);
      this.state.stats.metaDailyDone += 1;
    }

    // Reavaliação simples por dificuldade; não é o algoritmo SM-2 completo.
    let intervalDays = 1;
    let nextTag: 'D+1' | 'D+3' | 'D+7' | 'D+15' | 'D+30' = 'D+1';

    if (rating === 'dificil') {
      intervalDays = 1;
      nextTag = 'D+1';
    } else if (rating === 'medio') {
      intervalDays = 3;
      nextTag = 'D+3';
    } else {
      intervalDays = 7;
      nextTag = 'D+7';
    }

    // Add to completed sessions
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    this.state.completedSessions.unshift({
      id: `done-${Date.now()}`,
      completedAt: timeStr,
      subject: this.state.currentHeroTopic.subjectName,
      topicTitle: this.state.currentHeroTopic.title,
      durationMinutes: minutesAdded,
    });
    if (this.state.currentHeroTopic.syllabusTopicId && !this.state.completedTopicIds.includes(this.state.currentHeroTopic.syllabusTopicId)) {
      this.state.completedTopicIds.push(this.state.currentHeroTopic.syllabusTopicId);
    }
    this.state.stats.editalProgressCurrent = this.state.completedTopicIds.length;
    this.state.subjects = this.state.subjects.map((subject) => {
      if (subject.id !== this.state.currentHeroTopic.subjectId) return subject;
      const topicsReviewed = this.state.completedTopicIds.filter((id) => id.startsWith(`${subject.id}-`)).length;
      const totalTopics = SYLLABUS.find((entry) => entry.id === subject.id)?.topics.length || 1;
      return { ...subject, topicsReviewed, masteryPercentage: Math.round((topicsReviewed / totalTopics) * 100), statusText: topicsReviewed >= totalTopics ? 'Concluído' : 'Em andamento' };
    });
    this.state.upcomingCycles = this.state.upcomingCycles.filter((item) => item.subject !== this.state.currentHeroTopic.subjectName || item.topicTitle !== this.state.currentHeroTopic.title);
    this.state.reviewQueue = this.state.reviewQueue.filter((item) => item.subject !== this.state.currentHeroTopic.subjectName || item.topicTitle !== this.state.currentHeroTopic.title);

    // Add scheduled review to upcoming cycles
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + intervalDays);
    const dateFormatted = dateLabel(nextDate);

    this.state.upcomingCycles.unshift({
      id: `up-${Date.now()}`,
      intervalTag: nextTag,
      dueDate: dateKey(nextDate),
      scheduledDate: `${intervalDays === 1 ? 'Amanhã' : `Em ${intervalDays} dias`} • ${dateFormatted}`,
      durationMinutes: 15,
      subject: this.state.currentHeroTopic.subjectName,
      topicTitle: this.state.currentHeroTopic.title,
      subtitle: `Revisão agendada com base na sua autoavaliação: ${rating}.`,
      category: 'Estudo Ativo',
      icon: 'sync',
      color: rating === 'dificil' ? 'primary' : rating === 'medio' ? 'tertiary' : 'secondary',
      type: 'flashcards',
      typeCountText: `${this.state.currentHeroTopic.flashcardCount} cards de consolidação`,
    });

    this.saveState();
    return this.state;
  }

  /**
   * Complete an item from the review queue
   */
  public completeReviewQueueItem(id: string, rating: 'dificil' | 'medio' | 'facil' = 'medio'): AppStoreState {
    const item = this.state.reviewQueue.find((i) => i.id === id);
    if (item) {
      this.state.reviewQueue = this.state.reviewQueue.filter((i) => i.id !== id);
      this.recordActivity(item.durationMinutes);

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}`;

      this.state.completedSessions.unshift({
        id: `done-${Date.now()}`,
        completedAt: timeStr,
        subject: item.subject,
        topicTitle: item.topicTitle,
        durationMinutes: item.durationMinutes,
      });

      const days = rating === 'dificil' ? 1 : rating === 'medio' ? 3 : 7;
      const due = new Date();
      due.setDate(due.getDate() + days);
      this.state.upcomingCycles.unshift({
        ...item,
        id: `review-${Date.now()}`,
        intervalTag: days === 1 ? 'D+1' : days === 3 ? 'D+3' : 'D+7',
        dueDate: dateKey(due),
        scheduledDate: `${days === 1 ? 'Amanhã' : `Em ${days} dias`} · ${dateLabel(due)}`,
        subtitle: `Revisão após autoavaliação: ${rating}.`,
      });

      this.saveState();
    }
    return this.state;
  }

  /**
   * Anticipate overdue or next reviews
   */
  public anticipateReviews(): AppStoreState {
    if (this.state.upcomingCycles.length > 0) {
      const moved = this.state.upcomingCycles.shift();
      if (moved) {
        this.state.reviewQueue.push({ ...moved, scheduledDate: 'Antecipado para Hoje' });
      }
    }
    this.saveState();
    return this.state;
  }

  /**
   * Reset data to initial prototype state
   */
  public resetToDefault(): AppStoreState {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.loadState();
    return this.state;
  }
}
