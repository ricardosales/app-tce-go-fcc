import React, { useMemo, useState } from 'react';
import { SYLLABUS } from '../data/syllabus';
import { STUDY_CONTENT, STUDY_CONTENT_COUNT } from '../data/studyContent';

interface ScreenEditalProps {
  completedTopicIds: string[];
  onStartTopic: (subjectName: string, subjectId: string, title: string, topicId: string) => void;
}

export const ScreenEdital: React.FC<ScreenEditalProps> = ({ completedTopicIds, onStartTopic }) => {
  const [search, setSearch] = useState('');
  const [openSubject, setOpenSubject] = useState<string | null>('portugues');
  const query = search.trim().toLocaleLowerCase('pt-BR');
  const filteredSubjects = useMemo(() => SYLLABUS.map((subject) => ({
    ...subject,
    topics: subject.topics.map((title, index) => ({ title, id: `${subject.id}-${index}` }))
      .filter(({ title }) => !query || `${subject.name} ${title}`.toLocaleLowerCase('pt-BR').includes(query)),
  })).filter((subject) => subject.topics.length > 0), [query]);
  const totalTopics = SYLLABUS.reduce((n, subject) => n + subject.topics.length, 0);
  const lessonCount = STUDY_CONTENT_COUNT;
  const doneCount = completedTopicIds.length;

  return (
    <section className="flex flex-col gap-4 pb-8">
      <header>
        <div className="text-[11px] font-bold uppercase tracking-wider text-primary">TCE-GO · B02 · FCC</div>
        <h1 className="text-[24px] font-bold text-on-surface">Edital verticalizado</h1>
        <p className="text-[12px] text-on-surface-variant">Prova objetiva: 25 questões gerais (peso 1) e 45 específicas (peso 2), organizadas por assunto.</p>
      </header>

      <div className="rounded-2xl border border-slate-100 bg-surface-container-lowest p-4 shadow-sm">
        <div className="flex items-end justify-between">
          <div><span className="text-[11px] text-on-surface-variant">Assuntos estudados</span>
            <div className="text-[24px] font-bold text-on-surface">{doneCount}<span className="text-[14px] font-normal text-on-surface-variant"> / {totalTopics}</span></div></div>
          <span className="text-[12px] font-bold text-primary">{Math.round((doneCount / totalTopics) * 100)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-container-high"><div className="h-full bg-primary" style={{ width: `${Math.min(100, (doneCount / totalTopics) * 100)}%` }} /></div>
        <p className="mt-2 text-[10px] text-on-surface-variant">Aulas disponíveis: {lessonCount}/{totalTopics}. Os demais tópicos já estão listados e serão preenchidos por etapas. Questões autorais são material de treino, não questões oficiais.</p>
      </div>

      <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
        <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
        <input aria-label="Buscar assunto do edital" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar disciplina ou assunto" className="w-full bg-transparent text-[13px] outline-none" />
      </label>

      <div className="flex flex-col gap-2">
        {filteredSubjects.map((subject) => {
          const complete = subject.topics.filter(({ id }) => completedTopicIds.includes(id)).length;
          const expanded = query.length > 0 || openSubject === subject.id;
          return <div key={subject.id} className="overflow-hidden rounded-2xl border border-slate-100 bg-surface-container-lowest shadow-sm">
            <button onClick={() => setOpenSubject(expanded && !query ? null : subject.id)} className="flex w-full items-center justify-between gap-3 p-3.5 text-left">
              <span className="min-w-0"><span className="block text-[13px] font-bold text-on-surface">{subject.name}</span>
                <span className="text-[10px] text-on-surface-variant">{subject.group === 'geral' ? 'Conhecimentos gerais · peso 1' : 'Conhecimentos específicos · peso 2'} · {complete}/{subject.topics.length} assuntos</span></span>
              <span className="material-symbols-outlined text-primary">{expanded ? 'expand_less' : 'expand_more'}</span>
            </button>
            {expanded && <div className="border-t border-slate-100 px-3 pb-2">
              {subject.topics.map(({ title, id }) => {
                const isDone = completedTopicIds.includes(id);
                const hasLesson = Boolean(STUDY_CONTENT[id]);
                return <button key={id} onClick={() => onStartTopic(subject.name, subject.id, title, id)} className="flex w-full items-start gap-2.5 border-b border-slate-100 py-3 text-left last:border-0 hover:bg-surface-container-low">
                  <span className={`material-symbols-outlined mt-0.5 text-[17px] ${isDone ? 'text-secondary' : 'text-outline'}`}>{isDone ? 'check_circle' : 'radio_button_unchecked'}</span>
                  <span className="flex-1 text-[12px] leading-snug text-on-surface">{title}<span className={`mt-1 block text-[9px] ${hasLesson ? 'text-secondary' : 'text-on-surface-variant'}`}>{hasLesson ? 'Aula, exemplo e questão disponíveis' : 'Aula em preparação'}</span></span>
                  <span className="material-symbols-outlined text-[16px] text-primary">play_arrow</span>
                </button>;
              })}
            </div>}
          </div>;
        })}
      </div>
    </section>
  );
};
