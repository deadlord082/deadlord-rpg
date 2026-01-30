import { Entity } from "./Entity"
import { Direction } from "../utils/direction"
import { GameEvent } from "../events/Event"

export interface Chest extends Entity {
  opened: boolean
  reward: GameEvent
}

export function createChest(
    id: string,
    x: number,
    y: number,
    sprites: {
      closed: string
      opened: string
    },
    reward: GameEvent
): Chest {
  return {
    id,
    type: "chest",
    x,
    y,
    blocking: true,
    opened: false,
    sprites: {
      closed: sprites.closed,
      opened: sprites.opened,
    },
    reward,
  }
}
  