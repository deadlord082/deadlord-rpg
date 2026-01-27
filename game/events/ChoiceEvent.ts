import { GameEvent } from "./Event"

export interface ChoiceEvent {
    type: "choice"
    text: string
    choices: {
      label: string
      event: GameEvent
    }[]
  }
  