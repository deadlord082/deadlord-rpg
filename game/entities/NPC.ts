import { Entity } from "./Entity"
import { GameEvent } from "../events/Event"
import { Direction } from "../utils/direction"

export interface NPC extends Entity {
  name: string
  onInteract: GameEvent
}

export function createNPC(
  id: string,
  name: string,
  x: number,
  y: number,
  sprites: Partial<Record<Direction, string>>,
  event: GameEvent,
  direction: Direction = Direction.Down
) {
  return {
    id,
    name,
    x,
    y,
    direction,
    sprites,
    blocking: true,
    onInteract: event,
  }
}  
  