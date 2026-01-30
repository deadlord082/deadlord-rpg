import { GameState } from "../core/GameState"
import { directionToDelta } from "../utils/direction"
import { Chest } from "../entities/ChestEntity"
import { runEvent } from "../events/EventRunner"

export const ChestSystem = {
  interact(state: GameState): boolean {
    const player = state.player
    const { dx, dy } = directionToDelta(player.direction)

    const chest = state.currentMap.entities.find(
      (e): e is Chest =>
        e.type === "chest" &&
        e.x === player.x + dx &&
        e.y === player.y + dy
    )

    if (!chest || chest.opened) return false

    chest.opened = true
    chest.blocking = false

    runEvent(chest.reward, state)

    ;(state as any)._game?.notifyUI()
    return true
  }
}
