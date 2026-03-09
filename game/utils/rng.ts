// Seedable RNG utility (mulberry32)
export class RNG {
  private seed: number

  constructor(seed = Date.now() & 0xffffffff) {
    this.seed = seed >>> 0
  }

  setSeed(seed: number) {
    this.seed = seed >>> 0
  }

  // Returns float in [0,1)
  random() {
    let t = this.seed += 0x6D2B79F5
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    const r = ((t ^ (t >>> 14)) >>> 0) / 4294967296
    return r
  }
}

export const rng = new RNG()

export function createRng(seed?: number) {
  return new RNG(seed)
}
