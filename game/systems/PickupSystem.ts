import { GameState } from "../core/GameState"
import { ItemEntity } from "../entities/ItemEntity"
import { Direction, directionToDelta } from "../utils/direction"

export const PickupSystem = {
  checkPickup(state: GameState) {
    const player = state.player
    const map = state.currentMap

    const item = map.entities.find(
      (e): e is ItemEntity =>
        e.x === player.x &&
        e.y === player.y &&
        "itemId" in e &&
        e.pickupOnTouch
    )

    if (!item) return

    player.inventory.push(item.itemId)

    map.entities = map.entities.filter(e => e.id !== item.id)
  },

  pickupFacing(state: GameState) {
    const player = state.player
    const { dx, dy } = directionToDelta(player.direction)

    const item = state.currentMap.entities.find(
      (e): e is ItemEntity =>
        e.x === player.x + dx &&
        e.y === player.y + dy &&
        "itemId" in e
    )

    if (!item) return

    player.inventory.push(item.itemId)
    state.currentMap.entities =
      state.currentMap.entities.filter(e => e.id !== item.id)
  }
}
