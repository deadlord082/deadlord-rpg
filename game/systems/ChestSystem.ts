import { GameState } from "../core/GameState"
import { directionToDelta, Direction } from "../utils/direction"
import { Chest } from "../entities/ChestEntity"
import { runEvent } from "../events/EventRunner"

export const ChestSystem = {
  interact(state: GameState): boolean {
    const player = state.player
    const { dx, dy } = directionToDelta(player.direction ?? Direction.Down)

    const chest = state.currentMap.entities.find(
      (e): e is Chest =>
        e.type === "chest" &&
        e.x === player.x + dx &&
        e.y === player.y + dy
    )

    if (!chest || chest.opened) return false

    chest.opened = true

    // persist chest opened state so it remains opened when returning to map
    if (!state.modifiedEntitiesByMap) state.modifiedEntitiesByMap = {}
    const mods = state.modifiedEntitiesByMap[state.currentMap.id] ?? {}
    mods[chest.id] = { opened: true }
    state.modifiedEntitiesByMap[state.currentMap.id] = mods

    runEvent(chest.reward, state)

    state._eventBus?.emit("uiUpdate")
    return true
  }
}
