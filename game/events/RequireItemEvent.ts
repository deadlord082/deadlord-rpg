import { GameEvent } from "./Event"

export interface RequireItemEvent {
  type: "requireItem"
  itemId: string
  prompt?: string
  consume?: boolean
  success?: GameEvent
  fail?: GameEvent
}

export type _RequireItemEvent = RequireItemEvent
