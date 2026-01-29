import { GameState } from "../core/GameState"
import { ItemEntity } from "../entities/ItemEntity"
import { directionToDelta } from "../utils/direction"
import { InventorySystem } from "./InventorySystem"

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

    InventorySystem.addItem(player, item.itemId)

    map.entities = map.entities.filter(e => e.id !== item.id)
    ;(state as any)._game?.notifyUI()
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

    InventorySystem.addItem(player, item.itemId)

    state.currentMap.entities =
      state.currentMap.entities.filter(e => e.id !== item.id)

    ;(state as any)._game?.notifyUI()
  },
}
