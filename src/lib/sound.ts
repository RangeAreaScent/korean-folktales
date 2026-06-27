/**
 * Sound engine.
 *
 * All sounds are real samples from /public/sounds (loaded once, played via
 * cloneNode so overlapping plays don't cut each other off).
 */

const PAINT_SRC = ["/sounds/paint1.mp3", "/sounds/paint2.mp3", "/sounds/paint3.mp3"]
const PAGE_TURN_SRC = "/sounds/page-turn.mp3"
const CHIME_SRC = "/sounds/chime.m4a"
const BGM_SRC = "/sounds/bgm.m4a"

class SoundEngine {
  private muted = false

  private paintBank: HTMLAudioElement[] | null = null
  private paintIndex = 0
  private pageTurnEl: HTMLAudioElement | null = null
  private chimeEl: HTMLAudioElement | null = null
  private bgmEl: HTMLAudioElement | null = null

  setMuted(m: boolean) {
    this.muted = m
  }

  isMuted() {
    return this.muted
  }

  private load(src: string, volume: number): HTMLAudioElement | null {
    if (typeof window === "undefined") return null
    const a = new Audio(src)
    a.preload = "auto"
    a.volume = volume
    return a
  }

  private play(base: HTMLAudioElement) {
    const node = base.cloneNode(true) as HTMLAudioElement
    node.volume = base.volume
    node.play().catch(() => {})
  }

  private ensurePaintBank(): HTMLAudioElement[] | null {
    if (typeof window === "undefined") return null
    if (!this.paintBank) {
      this.paintBank = PAINT_SRC.map((src) => this.load(src, 0.55)!).filter(Boolean)
    }
    return this.paintBank
  }

  /** Brush/marker stroke — cycles paint1 → paint2 → paint3 per fill. */
  plop() {
    if (this.muted) return
    const bank = this.ensurePaintBank()
    if (!bank || !bank.length) return
    const base = bank[this.paintIndex % bank.length]
    this.paintIndex++
    this.play(base)
  }

  /** Page-turn whoosh — played on scene change / continue. */
  pageTurn() {
    if (this.muted) return
    if (!this.pageTurnEl) this.pageTurnEl = this.load(PAGE_TURN_SRC, 0.7)
    if (!this.pageTurnEl) return
    this.play(this.pageTurnEl)
  }

  /** Soft chime — played when storybook is complete. */
  chime() {
    if (this.muted) return
    if (!this.chimeEl) this.chimeEl = this.load(CHIME_SRC, 0.65)
    if (!this.chimeEl) return
    this.play(this.chimeEl)
  }

  /** Background music — looped piano. Independent of SFX mute. */
  startBgm() {
    if (typeof window === "undefined") return
    if (!this.bgmEl) {
      this.bgmEl = this.load(BGM_SRC, 0.25)
      if (this.bgmEl) this.bgmEl.loop = true
    }
    if (!this.bgmEl) return
    this.bgmEl.play().catch(() => {})
  }

  stopBgm() {
    if (!this.bgmEl) return
    this.bgmEl.pause()
  }
}

export const sound = new SoundEngine()
