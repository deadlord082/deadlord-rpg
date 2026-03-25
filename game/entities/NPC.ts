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
  direction: Direction = Direction.Down,
  options?: { blocking?: boolean; enterOnStep?: boolean }
) {
  return {
    id,
    name,
    x,
    y,
    direction,
    sprites,
    blocking: options?.blocking ?? true,
    onInteract: event,
    // optionally also trigger the provided event when the player steps onto this entity's tile
    ...(options?.enterOnStep ? { onEnter: event } : {}),
  }
}  
  