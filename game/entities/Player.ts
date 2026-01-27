
import { Entity } from "./Entity"
import { Direction } from "../utils/direction"
import { Item } from "../data/items/itemTypes"

export interface Player extends Entity {
  direction: Direction
  inventory: Item[]
}

export function createPlayer(
  x: number,
   y: number,
   image: string
  ): Player {
    return {
      id: "player",
      x,
      y,
      image,
      blocking: true,
      direction: Direction.Down,
      inventory: [],
    }
  }