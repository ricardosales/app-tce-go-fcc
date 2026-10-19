import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export class AudioSummaryController {
  private utterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking = false;
  private timer: ReturnType<typeof setInterval> | null = null;
  private secondsElapsed = 0;
  private playbackId = 0;
  private onStateChange: ((playing: boolean, secondsElapsed: number) => void) | null = null;
  private onError: ((message: string) => void) | null = null;

  constructor(
    callback?: (playing: boolean, secondsElapsed: number) => void,
    onError?: (message: string) => void,
  ) {
    this.onStateChange = callback || null;
    this.onError = onError || null;
  }

  public async togglePlay(textToRead: string): Promise<void> {
    if (this.isSpeaking) {
      await this.stop();
      return;
    }

    await this.play(textToRead);
  }

  public async play(textToRead: string): Promise<void> {
    const text = textToRead.trim();
    if (!text) {
      this.onError?.('Não há conteúdo disponível para leitura.');
      return;
    }

    this.clearTimer();
    this.secondsElapsed = 0;
    const playbackId = ++this.playbackId;

    if (Capacitor.isNativePlatform()) {
      this.setPlaying(true);
      this.startTimer();
      try {
        await TextToSpeech.speak({
          text,
          lang: 'pt-BR',
          rate: 1,
          pitch: 1,
          volume: 1,
          category: 'playback',
        });
        if (playbackId === this.playbackId) this.finish();
      } catch {
        if (playbackId === this.playbackId) {
          this.finish();
          this.onError?.('Não foi possível iniciar a voz. Confira se há um mecanismo de leitura de texto instalado e o volume de mídia do aparelho.');
        }
      }
      return;
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      this.onError?.('A leitura em voz alta não está disponível neste navegador.');
      return;
    }

    const speech = window.speechSynthesis;
    speech.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1;

    const voices = speech.getVoices();
    const portugueseVoice = voices.find((voice) => voice.lang.toLocaleLowerCase().startsWith('pt'));
    if (portugueseVoice) utterance.voice = portugueseVoice;

    utterance.onstart = () => {
      if (playbackId !== this.playbackId) return;
      this.setPlaying(true);
      this.startTimer();
    };
    utterance.onend = () => {
      if (playbackId === this.playbackId) this.finish();
    };
    utterance.onerror = (event) => {
      if (playbackId !== this.playbackId || event.error === 'canceled' || event.error === 'interrupted') return;
      this.finish();
      this.onError?.('O navegador não conseguiu reproduzir a leitura em voz alta.');
    };

    this.utterance = utterance;
    speech.speak(utterance);
  }

  public async stop(): Promise<void> {
    this.playbackId += 1;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (Capacitor.isNativePlatform()) {
      try {
        await TextToSpeech.stop();
      } catch {
        // Stop is best-effort; playback state still needs to reset.
      }
    }
    this.finish();
  }

  private startTimer(): void {
    this.clearTimer();
    this.timer = setInterval(() => {
      this.secondsElapsed += 1;
      this.onStateChange?.(true, this.secondsElapsed);
    }, 1000);
  }

  private clearTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  private setPlaying(playing: boolean): void {
    this.isSpeaking = playing;
    this.onStateChange?.(playing, this.secondsElapsed);
  }

  private finish(): void {
    this.clearTimer();
    this.utterance = null;
    this.isSpeaking = false;
    this.secondsElapsed = 0;
    this.onStateChange?.(false, 0);
  }
}
