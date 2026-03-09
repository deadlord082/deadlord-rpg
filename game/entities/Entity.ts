import { Direction } from "../utils/direction"
import { EventBus } from "../core/EventBus"

export interface Entity {
  id: string
  x: number
  y: number

  direction: Direction

  sprites?: Partial<Record<Direction, string>>

  blocking: boolean
  interact?: () => void

  // Optional link to the engine's EventBus for emitting domain/UI events
  _eventBus?: EventBus
}
