import { GameEvent } from "./Event"

export interface RequireItemEvent {
  type: "requireItem"
  itemId: string
  prompt?: string
  // optional translation key for prompt
  promptKey?: string
  consume?: boolean
  success?: GameEvent
  fail?: GameEvent
}

export type _RequireItemEvent = RequireItemEvent
