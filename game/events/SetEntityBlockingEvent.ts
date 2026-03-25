export interface SetEntityBlockingEvent {
  type: "setEntityBlocking"
  entityId?: string
  x?: number
  y?: number
  blocking: boolean
}

export type _SetEntityBlockingEvent = SetEntityBlockingEvent
