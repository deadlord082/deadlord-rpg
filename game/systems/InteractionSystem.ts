import { GameState } from "../core/GameState"
import { directionToDelta } from "../utils/direction"
import { runEvent } from "../events/EventRunner"
import { getTileAt } from "../utils/grid"
import { NPC } from "../entities/NPC"

export const InteractionSystem = {
  interact(state: GameState) {
    const player = state.player
    const { dx, dy } = directionToDelta(player.direction)

    const tx = player.x + dx
    const ty = player.y + dy

    // NPC / entity in front
    const entity = state.currentMap.entities.find(
      (e) => e.x === tx && e.y === ty
    )
    console.log("player direction:", player.direction)
console.log("target:", tx, ty)
console.log("entities:", state.currentMap.entities)


    if (entity && "onInteract" in entity) {
      const npc = entity as NPC
      runEvent(npc.onInteract, state)
      return
    }

    // Tile interaction
    const tile = getTileAt(state.currentMap, tx, ty)
    if (tile?.onInteract) {
      runEvent(tile.onInteract, state)
    }
  },
}
