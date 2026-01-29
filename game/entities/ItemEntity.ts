import { Direction } from "../utils/direction"
import { Entity } from "./Entity"
import { GROUND_ITEM_SPRITE } from "../core/constants"

export interface ItemEntity extends Entity {
  itemId: string
  pickupOnTouch: boolean
}

export function createItemEntity(
  id: string,
  itemId: string,
  x: number,
  y: number,
  pickupOnTouch = false
): ItemEntity {
  return {
    id,
    itemId,
    x,
    y,
    sprites: {
      [Direction.Down]: GROUND_ITEM_SPRITE,
    },
    direction: Direction.Down,
    blocking: false,
    pickupOnTouch,
  }
}
