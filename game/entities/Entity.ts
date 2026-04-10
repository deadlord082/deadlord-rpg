import { Direction } from "../utils/direction"
import { EventBus } from "../core/EventBus"

export interface Entity {
  id: string
  x: number
  y: number

  // direction may be optional for some static entities
  direction?: Direction

  // sprites can be direction-keyed or custom string keys (e.g. 'opened')
  sprites?: Record<string, string>

  // optional display name / portrait
  name?: string

  // optional image for static entities
  image?: string

  // optional generic type marker for specific entity kinds ("chest", "npc", etc.)
  type?: string

  // optional flags for pickup behavior
  pickupOnTouch?: boolean

  blocking: boolean
  interact?: () => void

  // Optional link to the engine's EventBus for emitting domain/UI events
  _eventBus?: EventBus
}
