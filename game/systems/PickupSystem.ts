import { GameState } from "../core/GameState"
import { ItemEntity } from "../entities/ItemEntity"
import { directionToDelta, Direction } from "../utils/direction"
import { InventorySystem } from "./InventorySystem"
import { ToastSystem } from "./ToastSystem"

export const PickupSystem = {
  checkPickup(state: GameState) {
    const player = state.player
    const map = state.currentMap

    const item = map.entities.find(
      (e): e is ItemEntity =>
        e.x === player.x &&
        e.y === player.y &&
        "itemId" in e &&
        e.pickupOnTouch === true
    )

    if (!item) return

    InventorySystem.addItem(player, item.itemId)
    ToastSystem.addItemToast(state, item.itemId)
    map.entities = map.entities.filter(e => e.id !== item.id)

    // persist removal so item won't respawn on map reload
    if (!state.removedEntityIdsByMap) state.removedEntityIdsByMap = {}
    const arr = state.removedEntityIdsByMap[map.id] ?? []
    if (!arr.includes(item.id)) {
      arr.push(item.id)
      state.removedEntityIdsByMap[map.id] = arr
    }
    state._eventBus?.emit("uiUpdate")
  },

  pickupFacing(state: GameState) {
    const player = state.player
    const { dx, dy } = directionToDelta(player.direction ?? Direction.Down)

    const item = state.currentMap.entities.find(
      (e): e is ItemEntity =>
        e.x === player.x + dx &&
        e.y === player.y + dy &&
        "itemId" in e
    )

    if (!item) return

    InventorySystem.addItem(player, item.itemId)
    ToastSystem.addItemToast(state, item.itemId)

    state.currentMap.entities =
      state.currentMap.entities.filter(e => e.id !== item.id)

    // persist removal so item won't respawn
    if (!state.removedEntityIdsByMap) state.removedEntityIdsByMap = {}
    const arr2 = state.removedEntityIdsByMap[state.currentMap.id] ?? []
    if (!arr2.includes(item.id)) {
      arr2.push(item.id)
      state.removedEntityIdsByMap[state.currentMap.id] = arr2
    }

    state._eventBus?.emit("uiUpdate")
  },
}
