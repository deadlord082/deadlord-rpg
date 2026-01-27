import { Entity } from "./Entity"
import { GameEvent } from "../events/Event"

export interface NPC extends Entity {
  name: string
  onInteract: GameEvent
}

export function createNPC(
    id: string,
    name: string,
    x: number,
    y: number,
    image: string,
    event: GameEvent
  ) {
    return {
      id,
      name,
      x,
      y,
      image,
      blocking: true,
      onInteract: event, // only the data
    }
  }
  
  