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

    // record visual movement start for interpolation, keep logical position updated
    player.moveFrom = { x: player.x, y: player.y }
    player.moveElapsed = 0
    player.moveDuration = player.moveDuration ?? 200
    player.moving = true

    // update logical position immediately so other systems (events, collisions)
    // operate on the moved position as before
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

  // advance any in-progress movement animations
  update(state: GameState, delta: number) {
    const player = state.player
    if (player.moving) {
      player.moveElapsed = (player.moveElapsed ?? 0) + Math.round(delta * 1000)
      const dur = player.moveDuration ?? 200
      if ((player.moveElapsed ?? 0) >= dur) {
        // finish movement
        player.moving = false
        player.moveElapsed = dur
        // ensure moveFrom cleared (optional)
        player.moveFrom = { x: player.x, y: player.y }
      }
    }
  }
}
