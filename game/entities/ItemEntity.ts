import { Direction } from "../utils/direction"
import { Entity } from "./Entity"

export interface ItemEntity extends Entity {
  itemId: string
  pickupOnTouch: boolean
}

export function createItemEntity(
    id: string,
    itemId: string,
    x: number,
    y: number,
    image: string,
    pickupOnTouch = false
  ): ItemEntity {
    return {
      id,
      itemId,
      x,
      y,
      sprites: {
        [Direction.Down]: image,
      },
      direction: Direction.Down,
      blocking: false,
      pickupOnTouch,
    }
  }
  