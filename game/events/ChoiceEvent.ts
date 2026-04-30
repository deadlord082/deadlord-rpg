import { GameEvent } from "./Event"

export interface ChoiceEvent {
    type: "choice"
    text?: string
    // optional translation key for the prompt
    textKey?: string
    choices: {
      label: string
      // optional label key for localization
      labelKey?: string
      event: GameEvent
    }[]
  }
  