export type EventHandler = (payload?: any) => void

export class EventBus {
  private handlers: Record<string, EventHandler[]> = {}

  on(event: string, handler: EventHandler) {
    if (!this.handlers[event]) this.handlers[event] = []
    this.handlers[event].push(handler)
    return () => this.off(event, handler)
  }

  off(event: string, handler: EventHandler) {
    const list = this.handlers[event]
    if (!list) return
    this.handlers[event] = list.filter(h => h !== handler)
  }

  emit(event: string, payload?: any) {
    const list = this.handlers[event]
    if (!list) return
    for (const h of list.slice()) {
      try {
        h(payload)
      } catch (e) {
        // swallow handler errors to avoid breaking the loop
        // UI can log if desired
        // console.error(e)
      }
    }
  }
}

export const globalEventBus = new EventBus()
