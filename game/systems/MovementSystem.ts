import { GameState } from "../core/GameState"
import { Direction, directionToDelta } from "../utils/direction"
import { CollisionSystem } from "./CollisionSystem"
import { getTileAt } from "../utils/grid"
import { runEvent } from "../events/EventRunner"

export const MovementSystem = {
  move(state: GameState, direction: Direction) {
    const player = state.player
    player.direction = direction

    const { dx, dy } = directionToDelta(direction)
    const nx = player.x + dx
    const ny = player.y + dy

    if (!CollisionSystem.canMoveTo(state, nx, ny)) return

    player.x = nx
    player.y = ny

    // If there's a non-blocking entity at the destination that has an onEnter handler,
    // run that first (useful for lava-like entities that damage on step).
    const entity = state.currentMap.entities.find(e => e.x === nx && e.y === ny && (e as any).onEnter)
    if (entity && (entity as any).onEnter) {
      runEvent((entity as any).onEnter, state)
    }

    const tile = getTileAt(state.currentMap, nx, ny)
    if (tile?.onEnter) runEvent(tile.onEnter, state)
  },

  // optional placeholder for future NPC updates
  update(state: GameState, delta: number) {
    // currently nothing
  }
}
