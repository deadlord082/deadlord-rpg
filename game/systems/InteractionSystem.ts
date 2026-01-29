import { GameState } from "../core/GameState"
import { directionToDelta, oppositeDirection } from "../utils/direction"
import { runEvent } from "../events/EventRunner"
import { getTileAt } from "../utils/grid"

export const InteractionSystem = {
  interact(state: GameState) {
    const player = state.player
    const { dx, dy } = directionToDelta(player.direction)

    const tx = player.x + dx
    const ty = player.y + dy

    // entity in front
    const entity = state.currentMap.entities.find(
      e => e.x === tx && e.y === ty && "onInteract" in e
    )

    if (entity && "onInteract" in entity) {
      if ("direction" in entity) {
        entity.direction = oppositeDirection(player.direction)
      }
      runEvent((entity as any).onInteract, state)
      return
    }

    // tile interaction
    const tile = getTileAt(state.currentMap, tx, ty)
    if (tile?.onInteract) {
      runEvent(tile.onInteract, state)
    }
  }
}
