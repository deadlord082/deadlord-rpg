import { GameEvent } from "./Event"

export interface SequenceEvent {
    type: "sequence"
    events: GameEvent[]
  }
  