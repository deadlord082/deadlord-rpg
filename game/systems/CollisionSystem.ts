import { GameState } from "../core/GameState"
import { getTileAt } from "../utils/grid"
import { Entity } from "../entities/Entity"

export const CollisionSystem = {
  canMoveTo(
    state: GameState,
    x: number,
    y: number
  ): boolean {
    const map = state.currentMap

    // out of bounds
    if (x < 0 || y < 0 || x >= map.width || y >= map.height) {
      return false
    }

    const tile = getTileAt(map, x, y)
    if (!tile || !tile.walkable) return false

    const blockedByEntity = map.entities.some(
      (e: Entity) => e.x === x && e.y === y && e.blocking
    )

    return !blockedByEntity
  }
}