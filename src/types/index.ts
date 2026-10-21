export interface SubjectItem {
  id: string;
  name: string;
  category: 'geral' | 'especifica';
  weight: number;
  officialQuestions: number;
  masteryPercentage: number;
  topicsReviewed: number;
  questionsSolved: number;
  statusText: string;
  statusColor: 'secondary' | 'primary' | 'tertiary' | 'error';
}

export interface TopicItem {
  id: string;
  syllabusTopicId?: string;
  subjectId: string;
  subjectName: string;
  moduleCode: string;
  title: string;
  subtitle: string;
  banca: string;
  estimatedMinutes: number;
  flashcardCount: number;
  testCount: number;
  incidenceRate: string;
  audioDuration: string;
  summary: string;
  markdownContent?: string;
  lessonSections?: Array<{ heading: string; body: string; code?: string }>;
  example?: string;
  references?: Array<{ label: string; url: string }>;
  stfJurisprudence?: string;
  comparativeMatrix?: {
    title: string;
    dayRules: string[];
    nightRules: string[];
  };
  warningTrap?: {
    title: string;
    description: string;
    goldenTip: string;
  };
  mnemonics?: Array<{
    acronym: string;
    color: string;
    title: string;
    description: string;
  }>;
  quickQuestions: Array<{
    id: string;
    prompt: string;
    source: string;
    correctAnswer: 'certo' | 'errado';
    explanation: string;
  }>;
}

export interface EnrichedLesson {
  summary: string;
  sections: Array<{ heading: string; body: string }>;
  example: string;
  pitfalls: string[];
  sources: Array<{ title: string; url: string }>;
  generatedAt: string;
}

export interface ReviewQueueItem {
  id: string;
  intervalTag: 'D+1' | 'D+3' | 'D+7' | 'D+15' | 'D+30';
  scheduledDate: string;
  dueDate?: string;
  durationMinutes: number;
  subject: string;
  topicTitle: string;
  subtitle: string;
  category: string;
  icon: string;
  color: 'primary' | 'secondary' | 'tertiary' | 'outline';
  type: 'flashcards' | 'questoes' | 'resumo' | 'simulado';
  typeCountText: string;
  completed?: boolean;
}

export interface CompletedSessionItem {
  id: string;
  completedAt: string;
  subject: string;
  topicTitle: string;
  durationMinutes: number;
}

export interface UserStats {
  editalProgressCurrent: number;
  editalProgressTotal: number;
  streakDays: number;
  metaDailyDone: number;
  metaDailyTotal: number;
  plannedMinutesToday: number;
  doneMinutesToday: number;
  completedCyclesToday: number;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: string;
  topic: string;
  interval: string;
}

