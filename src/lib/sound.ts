/**
 * Procedural sound engine using Web Audio API.
 * No audio files — all sounds synthesized on the fly. Stable, instant, zero-bundle.
 */

type Ctor = typeof AudioContext

class SoundEngine {
  private ctx: AudioContext | null = null
  private muted = false

  setMuted(m: boolean) {
    this.muted = m
  }

  isMuted() {
    return this.muted
  }

  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null
    if (!this.ctx) {
      try {
        const Ctx: Ctor =
          window.AudioContext ||
          (
            window as unknown as {
              webkitAudioContext: Ctor
            }
          ).webkitAudioContext
        if (!Ctx) return null
        this.ctx = new Ctx()
      } catch {
        return null
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {})
    }
    return this.ctx
  }

  /** Water-droplet 'plop' — splash tick + rising bubble resonance (Minnaert). */
  plop() {
    if (this.muted) return
    const ctx = this.ensure()
    if (!ctx) return
    const now = ctx.currentTime

    // Pentatonic, mid-high range — bubble cavity pitches
    const notes = [523.25, 587.33, 659.25, 783.99, 880.0]
    const base = notes[Math.floor(Math.random() * notes.length)]

    // 1) Splash tick — very short filtered noise burst (the impact)
    const tickLen = Math.floor(ctx.sampleRate * 0.025)
    const tickBuf = ctx.createBuffer(1, tickLen, ctx.sampleRate)
    const tickCh = tickBuf.getChannelData(0)
    for (let i = 0; i < tickLen; i++) {
      const t = i / tickLen
      tickCh[i] = (Math.random() * 2 - 1) * (1 - t) * (1 - t)
    }
    const tick = ctx.createBufferSource()
    tick.buffer = tickBuf
    const tickFilter = ctx.createBiquadFilter()
    tickFilter.type = "bandpass"
    tickFilter.frequency.value = base * 4
    tickFilter.Q.value = 1.2
    const tickGain = ctx.createGain()
    tickGain.gain.value = 0.07
    tick.connect(tickFilter).connect(tickGain).connect(ctx.destination)
    tick.start(now)

    // 2) Bubble resonance — RISING pitch with tiny overshoot (real droplet physics)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const softener = ctx.createBiquadFilter()
    osc.type = "sine"
    osc.frequency.setValueAtTime(base * 0.6, now)
    osc.frequency.exponentialRampToValueAtTime(base, now + 0.06)
    osc.frequency.exponentialRampToValueAtTime(base * 1.04, now + 0.13)
    softener.type = "lowpass"
    softener.frequency.value = base * 5
    softener.Q.value = 0.7
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.18, now + 0.012)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24)
    osc.connect(softener).connect(gain).connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.28)
  }

  /** Soft 'page turn' — short low-pass filtered noise, played on scene change. */
  pageTurn() {
    if (this.muted) return
    const ctx = this.ensure()
    if (!ctx) return
    const now = ctx.currentTime
    const bufferSize = Math.floor(ctx.sampleRate * 0.22)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const channel = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      const t = i / bufferSize
      // Pink-ish noise with envelope (in then out)
      const env = Math.sin(Math.PI * t) ** 1.5
      channel[i] = (Math.random() * 2 - 1) * env
    }
    const source = ctx.createBufferSource()
    source.buffer = buffer
    const filter = ctx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(800, now)
    filter.frequency.exponentialRampToValueAtTime(2000, now + 0.18)
    const gain = ctx.createGain()
    gain.gain.value = 0.12
    source.connect(filter).connect(gain).connect(ctx.destination)
    source.start(now)
  }

  /** Ascending 3-note chime — played when storybook is complete. */
  chime() {
    if (this.muted) return
    const ctx = this.ensure()
    if (!ctx) return
    const now = ctx.currentTime
    const notes = [523.25, 659.25, 783.99] // C5, E5, G5
    notes.forEach((freq, i) => {
      const t = now + i * 0.14
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "triangle"
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, t)
      gain.gain.linearRampToValueAtTime(0.16, t + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.5)
      osc.connect(gain).connect(ctx.destination)
      osc.start(t)
      osc.stop(t + 0.55)
    })
  }
}

export const sound = new SoundEngine()
