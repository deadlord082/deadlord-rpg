import { GameState } from "./GameState"
import { GameMap } from "../data/maps/mapTypes"
import { loadMap } from "../data/maps/mapLoader"
import { Items } from "../data/items/items"

export function serializeGameState(state: GameState) {
  const out = {
    mapId: state.currentMap.id,
    player: {
      x: state.player.x,
      y: state.player.y,
      hp: state.player.hp,
      maxHp: state.player.maxHp,
      level: state.player.level,
      xp: state.player.xp,
      xpToNextLevel: state.player.xpToNextLevel,
      gold: state.player.gold,
      inventory: state.player.inventory.map(i => ({ id: i.id, quantity: i.quantity })),
      equipment: state.player.equipment,
    }
  }

  return JSON.stringify(out)
}

export function loadGameStateFromString(json: string): Partial<GameState> {
  const obj = JSON.parse(json)
  const map: GameMap = loadMap(obj.mapId)

  const playerData = obj.player

  // reconstruct minimal GameState parts; caller must merge into full GameState
  const partial: Partial<GameState> = {
    currentMap: map,
    player: undefined as any,
  }

  // Build a simple player stub matching runtime factories in the app instead of full rehydration
  // The caller should use createPlayer and then apply these fields.
  return partial
}
