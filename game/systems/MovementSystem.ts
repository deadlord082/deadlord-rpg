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

    const tile = getTileAt(state.currentMap, nx, ny)
    tile?.onEnter && runEvent(tile.onEnter, state)
  },

  // optional placeholder for future NPC updates
  update(state: GameState, delta: number) {
    // currently nothing
  }
}
