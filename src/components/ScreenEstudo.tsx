import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { EnrichedLesson, TopicItem } from '../types';
import { AudioSummaryController } from '../utils/audioPlayer';
import { MarkdownContent } from './MarkdownContent';

interface ScreenEstudoProps {
  topic: TopicItem;
  enrichedLesson?: EnrichedLesson;
  notes: string;
  onSaveNotes: (topicId: string, notes: string) => void;
  onSaveEnrichedLesson: (topicId: string, lesson: EnrichedLesson) => void;
  onFinishStudy: (rating: 'dificil' | 'medio' | 'facil') => void;
  onBackToToday: () => void;
}

export const ScreenEstudo: React.FC<ScreenEstudoProps> = ({
  topic,
  enrichedLesson,
  notes,
  onSaveNotes,
  onSaveEnrichedLesson,
  onFinishStudy,
  onBackToToday,
}) => {
  // Audio Player State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioElapsedSeconds, setAudioElapsedSeconds] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioControllerRef = useRef<AudioSummaryController | null>(null);

  // Quiz State
  const [selectedAnswer, setSelectedAnswer] = useState<'certo' | 'errado' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [draftNotes, setDraftNotes] = useState(notes);
  const [showEnrichment, setShowEnrichment] = useState(false);
  const [geminiKey, setGeminiKey] = useState(() => {
    try { return localStorage.getItem('revisa_ai_gemini_key') || ''; } catch { return ''; }
  });
  const [keySaved, setKeySaved] = useState(() => {
    try { return Boolean(localStorage.getItem('revisa_ai_gemini_key')?.trim()); } catch { return false; }
  });
  const [isEditingKey, setIsEditingKey] = useState(() => {
    try { return !localStorage.getItem('revisa_ai_gemini_key')?.trim(); } catch { return true; }
  });
  const [keySaveError, setKeySaveError] = useState<string | null>(null);
  const [isGeneratingEnrichment, setIsGeneratingEnrichment] = useState(false);
  const [enrichmentError, setEnrichmentError] = useState<string | null>(null);
  const [enrichmentDraft, setEnrichmentDraft] = useState<EnrichedLesson | null>(enrichedLesson || null);

  // SRS Rating Selection
  const [selectedSRS, setSelectedSRS] = useState<'dificil' | 'medio' | 'facil'>('facil');
  const [isFinishing, setIsFinishing] = useState(false);
  const [showCelebrationToast, setShowCelebrationToast] = useState(false);

  // Setup Audio Controller
  useEffect(() => {
    const controller = new AudioSummaryController((playing, elapsed) => {
      setIsPlayingAudio(playing);
      setAudioElapsedSeconds(elapsed);
    }, (message) => setAudioError(message));
    audioControllerRef.current = controller;

    return () => {
      controller.stop();
    };
  }, []);

  useEffect(() => {
    setDraftNotes(notes);
  }, [topic.id, notes]);

  useEffect(() => {
    setEnrichmentDraft(enrichedLesson || null);
    setEnrichmentError(null);
  }, [topic.id, enrichedLesson]);

  const handleSaveGeminiKey = () => {
    const trimmedKey = geminiKey.trim();
    if (!trimmedKey) {
      setKeySaveError('Cole a chave do Google AI Studio antes de salvar.');
      return;
    }
    try {
      localStorage.setItem('revisa_ai_gemini_key', trimmedKey);
      setGeminiKey(trimmedKey);
      setKeySaved(true);
      setIsEditingKey(false);
      setKeySaveError(null);
      setEnrichmentError(null);
    } catch {
      setKeySaveError('Não foi possível guardar a chave neste navegador.');
    }
  };

  const handleCancelGeminiKeyEdit = () => {
    try { setGeminiKey(localStorage.getItem('revisa_ai_gemini_key') || ''); } catch { setGeminiKey(''); }
    setIsEditingKey(false);
    setKeySaveError(null);
    setEnrichmentError(null);
  };

  const getGeminiErrorMessage = (error: unknown) => {
    const raw = error instanceof Error ? error.message : String(error || '');
    let providerMessage = raw;
    try {
      const parsed = JSON.parse(raw);
      providerMessage = parsed?.error?.message || parsed?.message || raw;
    } catch {
      // The SDK may return a plain-text network or provider error.
    }
    if (/quota|429|rate.?limit|resource.?exhausted/i.test(`${raw} ${providerMessage}`)) {
      return 'A cota de geração ou de Pesquisa Google foi atingida. Confira uso e limites deste projeto no Google AI Studio; a cota pode ser diária.';
    }
    if (/api.?key|401|403|unauthorized/i.test(`${raw} ${providerMessage}`)) {
      return 'A chave Gemini foi recusada. Confira a configuração e tente novamente.';
    }
    if (/Failed to fetch|network|ECONN|ENOTFOUND|fetch failed/i.test(raw)) {
      return 'Não foi possível acessar o Gemini. Confira a conexão com a internet e tente novamente.';
    }
    return providerMessage ? `O Gemini retornou um erro: ${providerMessage.slice(0, 220)}` : 'Não foi possível enriquecer esta aula.';
  };

  const handleEnrichLesson = async () => {
    if (!navigator.onLine) {
      setEnrichmentError('Sem conexão com a internet. Conecte-se para pesquisar fontes e enriquecer a aula.');
      return;
    }
    setIsGeneratingEnrichment(true);
    setEnrichmentError(null);
    try {
      const apiKey = geminiKey.trim();
      if (!apiKey) throw new Error('Configure sua chave da API Gemini antes de continuar.');
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Você é professor experiente de cursinho preparatório para concursos públicos e está enriquecendo uma aula do edital TCE-GO, cargo B02 (Tecnologia da Informação).
Pesquise na web com prioridade para fontes primárias e oficiais (legislação oficial, órgão emissor, documentação oficial de padrões e tecnologias). Use o material atual como base, corrija-o se houver erro verificável e aprofunde sem fugir do tópico do edital. Não copie longos trechos; explique com suas próprias palavras. Não invente normas, artigos, decisões, dados, links ou citações. Se a busca não confirmar um detalhe, omita-o ou registre a limitação. Não diga que a resposta é oficial nem que substitui a leitura da fonte.

Disciplina: ${topic.subjectName.trim()}
Assunto do edital: ${topic.title.trim()}
Resumo existente: ${String(topic.summary || '').slice(0, 8000)}
Seções existentes: ${JSON.stringify(Array.isArray(topic.lessonSections) ? topic.lessonSections.slice(0, 10) : []).slice(0, 10000)}
Exemplo existente: ${String(topic.example || '').slice(0, 3000)}
Referências já cadastradas: ${JSON.stringify(Array.isArray(topic.references) ? topic.references.slice(0, 10) : []).slice(0, 3000)}

Retorne somente JSON com este formato: {"summary":"resumo objetivo, mas didático, em 2 a 4 parágrafos","sections":[{"heading":"título curto","body":"explicação aprofundada"}],"example":"exemplo resolvido ou aplicação prática","pitfalls":["pegadinha comum e como evitá-la"],"sources":[{"title":"título da fonte consultada","url":"URL pública e verificável"}]}. Inclua 3 a 5 seções, 2 a 4 pegadinhas e somente fontes realmente usadas na pesquisa.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json', tools: [{ googleSearch: {} }] },
      });
      const parsed = JSON.parse(response.text || '{}');
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk) => ({ title: chunk.web?.title || '', url: chunk.web?.uri || '' })) || [];
      const verifiedSources = sources
        .filter((source) => source.title && /^https?:\/\//i.test(source.url))
        .filter((source, index, all) => all.findIndex((other) => other.url === source.url) === index)
        .slice(0, 10);
      if (typeof parsed.summary !== 'string' || !Array.isArray(parsed.sections) || typeof parsed.example !== 'string') {
        throw new Error('A resposta do Gemini veio incompleta. Tente novamente.');
      }
      const lesson: EnrichedLesson = {
        summary: parsed.summary,
        sections: parsed.sections.filter((item: { heading?: unknown; body?: unknown }) => typeof item.heading === 'string' && typeof item.body === 'string').slice(0, 6),
        example: parsed.example,
        pitfalls: Array.isArray(parsed.pitfalls) ? parsed.pitfalls.filter((item: unknown) => typeof item === 'string').slice(0, 5) : [],
        sources: verifiedSources,
        generatedAt: new Date().toISOString(),
      };
      setEnrichmentDraft(lesson);
    } catch (error) {
      setEnrichmentError(getGeminiErrorMessage(error));
    } finally {
      setIsGeneratingEnrichment(false);
    }
  };

  const handleToggleAudio = () => {
    if (!audioControllerRef.current) return;
    setAudioError(null);
    const textToSpeak = `${topic.title}. ${topic.summary}. ${topic.stfJurisprudence || ''}`;
    void audioControllerRef.current.togglePlay(textToSpeak);
  };

  const handleQuizAnswer = (answer: 'certo' | 'errado') => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
  };

  const activeQuestion = topic.quickQuestions[0];

  const isCorrect = selectedAnswer === activeQuestion?.correctAnswer;

  const handleCompleteLesson = () => {
    setIsFinishing(true);
    if (audioControllerRef.current) {
      audioControllerRef.current.stop();
    }

    setTimeout(() => {
      setIsFinishing(false);
      setShowCelebrationToast(true);
      onFinishStudy(selectedSRS);
      setTimeout(() => {
        setShowCelebrationToast(false);
        onBackToToday();
      }, 2500);
    }, 800);
  };

  // Format audio seconds into mm:ss
  const formatAudioTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-col w-full space-y-4 pb-6">
      {/* Toast de Celebração */}
      {showCelebrationToast && (
        <div className="fixed top-24 left-4 right-4 bg-surface-container-lowest rounded-2xl p-4 shadow-2xl border border-secondary/20 flex items-center gap-3 z-50 animate-bounce">
          <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[16px] font-bold text-on-surface">Excelente progresso!</span>
            <span className="text-[12px] text-on-surface-variant">
              Sessão de {topic.estimatedMinutes} min registrada. Próxima revisão programada.
            </span>
          </div>
        </div>
      )}

      {/* Contextual Breadcrumb & Subject Badge */}
      <div className="flex items-center justify-between gap-1 flex-wrap">
        <div className="flex items-center gap-1.5 text-on-surface-variant text-[11px] font-label-code">
          <span className="material-symbols-outlined text-[15px] text-primary">gavel</span>
          <span>{topic.subjectName}</span>
          <span className="text-outline-variant">•</span>
          <span className="text-on-surface font-bold">{topic.moduleCode}</span>
        </div>
        <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full shadow-xs">
          <span
            className="material-symbols-outlined text-[13px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            neurology
          </span>
          <span className="font-label-code text-[10px] text-primary uppercase font-bold">
            {topic.banca}
          </span>
        </div>
      </div>

      {/* Lesson Title & Study Meta */}
      <div className="space-y-1">
        <h1 className="text-[20px] font-bold text-on-surface tracking-tight leading-snug">
          {topic.title}
        </h1>
        <div className="flex items-center gap-3 text-on-surface-variant font-label-code text-[11px] pt-0.5 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span>
              <span>{topic.estimatedMinutes} min planejados</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px] text-primary">checklist</span>
            <span>Programa oficial</span>
          </span>
        </div>
      </div>

      {/* Audio Player Pill / Quick Voice Synth */}
      <div className="flex items-center justify-between p-2.5 bg-surface-container rounded-2xl shadow-xs border border-slate-100">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={handleToggleAudio}
            aria-label={isPlayingAudio ? 'Parar leitura em voz alta' : 'Ouvir áudio-resumo'}
            className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm active:scale-95 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">
              {isPlayingAudio ? 'stop' : 'play_arrow'}
            </span>
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-on-surface truncate">
              Ouvir tópico
            </span>
            <span className="text-[11px] text-on-surface-variant truncate">
              {isPlayingAudio
                ? 'Leitura em voz alta em andamento · toque para parar'
                : 'Leitura em voz alta do material disponível'}
            </span>
            {audioError && <span role="status" className="mt-1 text-[10px] text-error">{audioError}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-primary font-label-code text-[12px] shrink-0 pl-2">
          {isPlayingAudio && <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>}
          <span>{isPlayingAudio ? formatAudioTime(audioElapsedSeconds) : topic.audioDuration}</span>
        </div>
      </div>

      {/* Aula e resumo do assunto */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-primary text-[12px] font-bold">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span className="uppercase tracking-wider">Material do tópico</span>
          </div>
          <span className="bg-surface-container-high text-primary px-2 py-0.5 rounded-full font-label-code text-[10px]">
            TCE-GO B02
          </span>
        </div>

        {topic.markdownContent ? (
          <MarkdownContent source={topic.markdownContent} />
        ) : (
          <>
            <p className="text-[15px] text-on-surface leading-7">{topic.summary}</p>
            {topic.lessonSections?.map((section) => (
              <div key={section.heading} className="space-y-2">
                <h2 className="text-[15px] font-bold text-on-surface">{section.heading}</h2>
                <p className="whitespace-pre-line text-[14px] leading-6 text-on-surface-variant">{section.body}</p>
                {section.code && <pre className="overflow-x-auto rounded-xl bg-slate-950 p-3 text-[12px] leading-5 text-slate-100"><code>{section.code}</code></pre>}
              </div>
            ))}
            {topic.example && <div className="rounded-xl bg-primary-fixed/40 p-3 text-[14px] leading-6 text-on-surface"><strong>Exemplo prático:</strong> {topic.example}</div>}
          </>
        )}

        {topic.references && topic.references.length > 0 && <div className="space-y-1 border-t border-slate-100 pt-2">
          <h2 className="text-[11px] font-bold text-primary">Referências para consulta</h2>
          {topic.references.map((reference) => <a key={reference.url} href={reference.url} target="_blank" rel="noreferrer" className="block text-[11px] text-primary underline">{reference.label}</a>)}
        </div>}

        <div className="border-t border-slate-100 pt-3">
          <button type="button" onClick={() => setShowEnrichment((visible) => !visible)} aria-expanded={showEnrichment} className="flex w-full items-center justify-between text-left text-[12px] font-bold text-primary">
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[17px]">travel_explore</span>{enrichedLesson ? 'Aula aprofundada salva' : 'Aprofundar com pesquisa na web'}</span>
            <span className="material-symbols-outlined text-[18px]">{showEnrichment ? 'expand_less' : 'expand_more'}</span>
          </button>
          {showEnrichment && <div className="mt-3 space-y-3">
            <p className="text-[11px] leading-relaxed text-on-surface-variant">O Gemini vai pesquisar fontes atuais, priorizar documentos oficiais e preparar uma versão para você revisar. Ela só entra na aula depois que você salvar. A pesquisa pode consumir sua cota ou gerar cobrança, conforme o projeto configurado.</p>

            <div className="rounded-xl border border-slate-200 bg-surface-container-low p-3">
              {keySaved && !isEditingKey ? (
                <div className="flex items-center gap-2" role="status" aria-live="polite">
                  <span className="flex-1 text-[11px] font-bold text-on-surface">Chave da API Gemini</span>
                  <span className="material-symbols-outlined text-[19px] text-green-600" aria-label="Chave salva">check_circle</span>
                  <button type="button" onClick={() => { setGeminiKey(''); setIsEditingKey(true); setKeySaveError(null); setEnrichmentError(null); }} className="inline-flex items-center gap-1 rounded-lg bg-surface-container-high px-2.5 py-1.5 text-[11px] font-bold text-primary" aria-label="Editar chave da API Gemini">
                    <span className="material-symbols-outlined text-[15px]">edit</span>Editar
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <label htmlFor="gemini-api-key" className="block text-[11px] font-bold text-on-surface">Chave da API Gemini</label>
                  <div className="flex gap-2">
                    <input id="gemini-api-key" type="password" autoComplete="off" value={geminiKey} onChange={(event) => setGeminiKey(event.target.value)} placeholder="Cole sua chave do AI Studio" className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-[11px] outline-none focus:border-primary" />
                    <button type="button" onClick={handleSaveGeminiKey} className="inline-flex min-w-[105px] items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[11px] font-bold text-on-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary/30">
                      <span className="material-symbols-outlined text-[15px]">save</span>Salvar chave
                    </button>
                    {keySaved && <button type="button" onClick={handleCancelGeminiKeyEdit} className="rounded-lg px-2 text-[11px] font-semibold text-on-surface-variant hover:bg-slate-100">Cancelar</button>}
                  </div>
                  <p className="text-[10px] leading-relaxed text-on-surface-variant">A chave fica neste dispositivo e é enviada diretamente ao Gemini. Não compartilhe a chave. <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="font-semibold text-primary underline">Obter chave no Google AI Studio</a>.</p>
                  {keySaveError && <p role="alert" className="text-[10px] leading-relaxed text-error">{keySaveError}</p>}
                </div>
              )}
            </div>

            <button type="button" onClick={handleEnrichLesson} disabled={isGeneratingEnrichment} className="w-full rounded-xl bg-primary px-3 py-2.5 text-[12px] font-bold text-on-primary disabled:opacity-50">
              {isGeneratingEnrichment ? 'Pesquisando fontes e preparando aula…' : 'Buscar e preparar aprofundamento'}
            </button>

            {enrichmentError && <p role="alert" className="rounded-lg bg-error/10 p-2.5 text-[11px] leading-relaxed text-error">{enrichmentError}</p>}

            {enrichmentDraft && <div className="space-y-3 rounded-xl border border-primary/20 bg-primary-fixed/20 p-3">
              <p className="text-[11px] font-bold text-primary">Revise e edite o rascunho antes de salvar</p>
              <label className="block space-y-1"><span className="text-[10px] font-semibold text-on-surface-variant">Resumo ampliado</span><textarea rows={4} value={enrichmentDraft.summary} onChange={(event) => setEnrichmentDraft({ ...enrichmentDraft, summary: event.target.value })} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[11px] leading-relaxed outline-none focus:border-primary" /></label>
              {enrichmentDraft.sections.map((section, index) => <label key={index} className="block space-y-1"><span className="text-[10px] font-semibold text-on-surface-variant">{section.heading}</span><textarea rows={3} value={section.body} onChange={(event) => setEnrichmentDraft({ ...enrichmentDraft, sections: enrichmentDraft.sections.map((item, itemIndex) => itemIndex === index ? { ...item, body: event.target.value } : item) })} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[11px] leading-relaxed outline-none focus:border-primary" /></label>)}
              <label className="block space-y-1"><span className="text-[10px] font-semibold text-on-surface-variant">Exemplo</span><textarea rows={3} value={enrichmentDraft.example} onChange={(event) => setEnrichmentDraft({ ...enrichmentDraft, example: event.target.value })} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[11px] leading-relaxed outline-none focus:border-primary" /></label>
              {enrichmentDraft.pitfalls.map((pitfall, index) => <label key={index} className="block space-y-1"><span className="text-[10px] font-semibold text-on-surface-variant">Pegadinha {index + 1}</span><textarea rows={2} value={pitfall} onChange={(event) => setEnrichmentDraft({ ...enrichmentDraft, pitfalls: enrichmentDraft.pitfalls.map((item, itemIndex) => itemIndex === index ? event.target.value : item) })} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-[11px] leading-relaxed outline-none focus:border-primary" /></label>)}
              {enrichmentDraft.sources.length > 0 && <div className="space-y-1 border-t border-primary/15 pt-2"><span className="text-[10px] font-bold text-primary">Fontes encontradas na pesquisa</span>{enrichmentDraft.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="block break-all text-[10px] text-primary underline">{source.title}</a>)}</div>}
              {enrichmentDraft.sources.length === 0 && <p className="text-[10px] leading-relaxed text-error">A pesquisa não retornou fontes verificáveis. Confira o conteúdo antes de salvar.</p>}
              <button type="button" disabled={enrichmentDraft.sources.length === 0} onClick={() => onSaveEnrichedLesson(topic.id, enrichmentDraft)} className="w-full rounded-full bg-secondary px-3 py-2.5 text-[12px] font-bold text-on-secondary disabled:cursor-not-allowed disabled:opacity-40">{enrichmentDraft.sources.length > 0 ? 'Salvar na aula' : 'Aguardando fonte verificável'}</button>
              {enrichedLesson && <p className="text-center text-[10px] text-secondary">Há uma versão salva desta aula. Este rascunho só a substitui ao salvar.</p>}
            </div>}
          </div>}
        </div>

        <label className="block space-y-1.5">
          <span className="text-[11px] font-bold text-primary">Minhas anotações deste assunto</span>
          <textarea
            value={draftNotes}
            onChange={(event) => setDraftNotes(event.target.value)}
            onBlur={() => onSaveNotes(topic.id, draftNotes)}
            placeholder="Cole ou escreva aqui suas notas, explicações e exemplos. São salvas neste dispositivo."
            rows={5}
            className="w-full resize-y rounded-xl border border-slate-200 bg-white p-3 text-[12px] leading-relaxed text-on-surface outline-none focus:border-primary"
          />
        </label>

        {/* Jurisprudence Callout */}
        {topic.stfJurisprudence && (
          <div className="bg-surface-container-low p-3 rounded-xl space-y-1">
            <div className="flex items-center gap-1 text-on-surface font-bold text-[12px]">
              <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              <span>Referência complementar:</span>
            </div>
            <p className="text-[14px] text-on-surface-variant leading-6">
              {topic.stfJurisprudence}
            </p>
          </div>
        )}
      </div>

      {/* Comparative Breakdown: Permissões Diurnas vs. Noturnas */}
      {topic.comparativeMatrix && (
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-slate-100 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[18px]">table_chart</span>
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-on-surface">Matriz Comparativa de Ingressão</h2>
              <p className="text-[11px] text-on-surface-variant">Critérios temporais e hipóteses autorizativas</p>
            </div>
          </div>

          {/* Micro Table / Card Grids */}
          <div className="grid grid-cols-2 gap-2">
            {/* Diurno */}
            <div className="bg-surface-container-low rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-on-surface font-semibold text-[12px]">
                <span className="material-symbols-outlined text-[16px] text-tertiary">wb_sunny</span>
                <span>Durante o DIA</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {topic.comparativeMatrix.dayRules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-1 text-secondary">
                    <span className="material-symbols-outlined text-[15px] shrink-0">check_circle</span>
                    <span className="text-on-surface">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Noturno */}
            <div className="bg-surface-container-low rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-1.5 text-on-surface font-semibold text-[12px]">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">bedtime</span>
                <span>Durante a NOITE</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                {topic.comparativeMatrix.nightRules.map((rule, idx) => {
                  const isBlocked = rule.toLowerCase().includes('vedado') || rule.toLowerCase().includes('apenas') || rule.toLowerCase().includes('passiva');
                  return (
                    <div
                      key={idx}
                      className={`flex items-start gap-1 ${isBlocked ? 'text-error' : 'text-secondary'}`}
                    >
                      <span className="material-symbols-outlined text-[15px] shrink-0">
                        {isBlocked ? 'cancel' : 'check_circle'}
                      </span>
                      <span className={isBlocked ? 'text-error font-semibold' : 'text-on-surface'}>
                        {rule}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Attention Trap Card: Pegadinha Clássica Cebraspe */}
      {topic.warningTrap && (
        <div className="bg-[#ffeedd] rounded-2xl p-4 shadow-sm border border-amber-200/50 space-y-2 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[19px]">warning</span>
            </div>
            <div>
              <span className="font-label-code uppercase tracking-wider text-tertiary text-[10px] block">
                Pegadinha Clássica de Banca
              </span>
              <h3 className="text-[14px] font-bold text-on-surface leading-tight">
                {topic.warningTrap.title}
              </h3>
            </div>
          </div>
          <p className="text-[12px] text-on-surface leading-relaxed">
            {topic.warningTrap.description}
          </p>
          <div className="flex items-center gap-1.5 bg-surface-container-lowest/80 p-2 rounded-xl text-[11px] text-on-surface-variant">
            <span className="material-symbols-outlined text-[15px] text-tertiary">lightbulb</span>
            <span>{topic.warningTrap.goldenTip}</span>
          </div>
        </div>
      )}

      {/* Schematized Mnemonic Box */}
      {topic.mnemonics && topic.mnemonics.length > 0 && (
        <div className="bg-surface-container-high rounded-2xl p-4 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-primary">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span>Mnemônico Esquematizado</span>
            </div>
            <span className="bg-primary text-on-primary font-label-code text-[10px] px-2 py-0.5 rounded-full font-bold">
              Fixação Rápida
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {topic.mnemonics.map((m, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-2.5 rounded-xl flex items-center gap-3 shadow-xs"
              >
                <span
                  className={`font-label-code text-[15px] font-bold px-2.5 py-1 rounded ${
                    m.color === 'secondary'
                      ? 'bg-secondary-container text-secondary'
                      : 'bg-primary-fixed text-primary'
                  }`}
                >
                  {m.acronym}
                </span>
                <div className="flex flex-col text-on-surface text-[12px] leading-tight">
                  <span className="font-semibold text-primary">{m.title}</span>
                  <span className="text-on-surface-variant text-[11px] mt-0.5">{m.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Mini Quiz / Rapid Test */}
      {activeQuestion && <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-md border border-slate-100 space-y-3">
        <div className="flex items-center">
          <div className="flex items-center gap-1.5 text-secondary font-bold text-[12px]">
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            <span>Minissimulado de Fixação</span>
          </div>
        </div>

        <p className="text-[13px] text-on-surface leading-snug font-medium">
          {activeQuestion?.prompt}
        </p>

        {/* Choice Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            onClick={() => handleQuizAnswer('certo')}
            className={`flex items-center justify-center gap-2 h-13 rounded-xl font-bold text-[15px] active:scale-95 transition-all shadow-xs cursor-pointer ${
              selectedAnswer === 'certo'
                ? isCorrect
                  ? 'bg-secondary text-on-secondary ring-2 ring-secondary'
                  : 'bg-error text-on-error ring-2 ring-error'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">
              check_circle
            </span>
            <span>Certo</span>
          </button>

          <button
            onClick={() => handleQuizAnswer('errado')}
            className={`flex items-center justify-center gap-2 h-13 rounded-xl font-bold text-[15px] active:scale-95 transition-all shadow-xs cursor-pointer ${
              selectedAnswer === 'errado'
                ? isCorrect
                  ? 'bg-secondary text-on-secondary ring-2 ring-secondary'
                  : 'bg-error text-on-error ring-2 ring-error'
                : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] text-error">cancel</span>
            <span>Errado</span>
          </button>
        </div>

        {/* Feedback Pane */}
        {isAnswered && (
          <div
            className={`rounded-xl p-3 space-y-1 text-[12px] leading-relaxed transition-all ${
              isCorrect
                ? 'bg-secondary-container/50 text-on-secondary-container'
                : 'bg-error-container text-on-error-container'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              <span className="material-symbols-outlined text-[18px]">
                {isCorrect ? 'task_alt' : 'info'}
              </span>
              <span>
                {isCorrect
                  ? 'Resposta correta.'
                  : 'Resposta incorreta.'}
              </span>
            </div>
            <p className="text-[11px]">{activeQuestion?.explanation}</p>
          </div>
        )}
      </div>}
      {!activeQuestion && <div className="rounded-2xl border border-dashed border-slate-300 bg-surface-container-low p-4 text-[12px] text-on-surface-variant">
        Ainda não há questão cadastrada para este assunto. Estude pelo seu material e use a busca de questões por tópico quando quiser treinar.
      </div>}

      {/* Spaced Repetition Completion Module (SRS Calibration) */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-lg border border-slate-100 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Revisão do assunto
            </span>
            <span className="font-label-code text-on-surface-variant text-[10px]">
              Revisão espaçada
            </span>
          </div>
          <p className="text-[15px] font-bold text-on-surface leading-tight">
            Como foi assimilar esse conceito?
          </p>
          <p className="text-[11px] text-on-surface-variant">
            Sua avaliação define automaticamente a data da sua próxima revisão inteligente.
          </p>
        </div>

        {/* 3 Tier Spaced Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedSRS('dificil')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all shadow-xs cursor-pointer ${
              selectedSRS === 'dificil'
                ? 'bg-error-container text-on-error-container ring-2 ring-error scale-102 font-bold'
                : 'bg-error-container/30 text-on-surface opacity-75 hover:opacity-100'
            }`}
          >
            <span className="text-base leading-none">🔴</span>
            <span className="text-[12px] font-semibold mt-1">Difícil</span>
            <span className="font-label-code text-[10px] text-on-surface-variant mt-0.5">
              Rever em 1d
            </span>
          </button>

          <button
            onClick={() => setSelectedSRS('medio')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all shadow-xs cursor-pointer ${
              selectedSRS === 'medio'
                ? 'bg-tertiary-fixed text-on-tertiary-fixed ring-2 ring-tertiary scale-102 font-bold'
                : 'bg-surface-container-high text-on-surface opacity-75 hover:opacity-100'
            }`}
          >
            <span className="text-base leading-none">🟡</span>
            <span className="text-[12px] font-semibold mt-1">Médio</span>
            <span className="font-label-code text-[10px] text-on-surface-variant mt-0.5">
              Rever em 3d
            </span>
          </button>

          <button
            onClick={() => setSelectedSRS('facil')}
            className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-xl transition-all shadow-xs cursor-pointer ${
              selectedSRS === 'facil'
                ? 'bg-secondary-container text-on-secondary-container ring-2 ring-secondary scale-102 font-bold'
                : 'bg-secondary-container/40 text-on-surface opacity-75 hover:opacity-100'
            }`}
          >
            <span className="text-base leading-none">🟢</span>
            <span className="text-[12px] font-semibold mt-1">Fácil</span>
            <span className="font-label-code text-[10px] text-on-surface-variant mt-0.5">
              Rever em 7d
            </span>
          </button>
        </div>

        {/* Master Action CTA Button */}
        <button
          onClick={handleCompleteLesson}
          disabled={isFinishing}
          className="w-full h-13 bg-secondary hover:bg-secondary/90 text-on-secondary rounded-full font-bold text-[15px] flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          {isFinishing ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>Registrando sessão e próxima revisão...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[22px]">check</span>
              <span>Concluir Estudo de Hoje</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
