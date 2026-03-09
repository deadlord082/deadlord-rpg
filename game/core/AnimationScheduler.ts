type Animation = {
  id: string
  duration: number
  elapsed: number
  onComplete?: () => void
}

export class AnimationScheduler {
  private animations: Animation[] = []

  add(id: string, duration: number, onComplete?: () => void) {
    this.animations.push({ id, duration, elapsed: 0, onComplete })
  }

  update(delta: number) {
    for (const a of this.animations.slice()) {
      a.elapsed += delta
      if (a.elapsed >= a.duration) {
        try { a.onComplete?.() } catch (e) {}
        this.animations = this.animations.filter(x => x !== a)
      }
    }
  }

  clear() {
    this.animations = []
  }
}

export const animationScheduler = new AnimationScheduler()
