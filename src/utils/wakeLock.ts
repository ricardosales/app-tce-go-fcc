export class ScreenWakeLockController {
  private wakeLock: WakeLockSentinel | null = null;
  private released = false;

  public async request(): Promise<void> {
    this.released = false;
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) return;

    try {
      this.wakeLock = await navigator.wakeLock.request('screen');
      this.wakeLock.addEventListener('release', () => {
        this.wakeLock = null;
      });
    } catch {
      // Wake Lock pode ser negado (bateria baixa, permissão, etc). Falha silenciosa.
    }
  }

  public async release(): Promise<void> {
    this.released = true;
    if (!this.wakeLock) return;
    try {
      await this.wakeLock.release();
    } catch {
      // Best-effort.
    }
    this.wakeLock = null;
  }

  /** Reaquire o wake lock quando a aba volta a ficar visível, pois o navegador o libera ao ocultá-la. */
  public async reacquireIfVisible(): Promise<void> {
    if (this.released) return;
    if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
    if (this.wakeLock) return;
    await this.request();
  }
}
