import { GameEvent } from "./Event"

export interface GiveItemEvent {
  type: "giveItem"
  itemId: string
  consume?: boolean
  success?: GameEvent
  fail?: GameEvent
}

export type _GiveItemEvent = GiveItemEvent
