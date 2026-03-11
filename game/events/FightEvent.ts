import { GameEvent } from "./Event"

export interface FightEvent {
  type: "fight"
  // single enemy id or multiple enemy ids
  enemyId?: string
  enemyIds?: string[]

  // optional callbacks
  success?: GameEvent
  fail?: GameEvent
}
  