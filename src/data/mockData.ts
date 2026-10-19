import { TopicItem, ReviewQueueItem, CompletedSessionItem, UserStats, SubjectItem, Flashcard } from '../types';
import { SYLLABUS, SYLLABUS_TOPIC_COUNT } from './syllabus';
import { STUDY_CONTENT } from './studyContent';

export const INITIAL_USER_STATS: UserStats = {
  editalProgressCurrent: 0,
  editalProgressTotal: SYLLABUS_TOPIC_COUNT,
  streakDays: 0,
  metaDailyDone: 0,
  metaDailyTotal: 2,
  plannedMinutesToday: 120,
  doneMinutesToday: 0,
  completedCyclesToday: 0,
};

export const TCE_GO_HERO_TOPIC: TopicItem = {
  id: 'topic-tcego-agentic',
  syllabusTopicId: 'ia-agentiva-0',
  subjectId: 'ia-agentiva',
  subjectName: 'Engenharia de Software Assistida por IA e Sistemas Agentivos',
  moduleCode: 'Conhecimentos Específicos · B02',
  title: 'Fundamentos de IA aplicada ao desenvolvimento e modelos LLM',
  subtitle: 'Tópico do programa oficial. Selecione qualquer assunto no Edital para estudar.',
  banca: 'FCC',
  estimatedMinutes: 60,
  flashcardCount: 0,
  testCount: 0,
  incidenceRate: 'Incluído no conteúdo programático oficial',
  audioDuration: '—',
  ...STUDY_CONTENT['ia-agentiva-0'],
  quickQuestions: [],
};

// Novas revisões e sessões surgem somente a partir de atividades do usuário.
export const INITIAL_REVIEWS: ReviewQueueItem[] = [];
export const INITIAL_UPCOMING_CYCLES: ReviewQueueItem[] = [];
export const INITIAL_COMPLETED_SESSIONS: CompletedSessionItem[] = [];
export const INITIAL_SUBJECTS: SubjectItem[] = SYLLABUS.map((subject) => ({
  id: subject.id,
  name: subject.name,
  category: subject.group,
  weight: subject.weight,
  officialQuestions: 0,
  masteryPercentage: 0,
  topicsReviewed: 0,
  questionsSolved: 0,
  statusText: 'Não iniciado',
  statusColor: 'primary',
}));
export const RESCUE_FLASHCARDS: Flashcard[] = [];

