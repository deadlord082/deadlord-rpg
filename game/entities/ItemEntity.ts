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
      image,
      blocking: false,
      pickupOnTouch,
    }
  }
  