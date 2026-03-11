export interface RemoveEntityEvent {
  type: "removeEntity"
  entityId?: string
  x?: number
  y?: number
}

export type _RemoveEntityEvent = RemoveEntityEvent
