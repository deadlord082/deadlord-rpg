import { GameState } from "./GameState"
import { GameMap } from "../data/maps/mapTypes"
import { loadMap } from "../data/maps/mapLoader"
import { Items } from "../data/items/items"

export function serializeGameState(state: GameState) {
  // determine which entities were removed compared to the base map
  const baseMap = loadMap(state.currentMap.id)
  const baseIds = new Set(baseMap.entities.map(e => e.id))
  const currentIds = new Set(state.currentMap.entities.map(e => e.id))
  const removedEntities = [...baseIds].filter(id => !currentIds.has(id))

  const out = {
    version: 1,
    timestamp: Date.now(),
    mapId: state.currentMap.id,
    // include global persistent maps
    removedEntityIdsByMap: state.removedEntityIdsByMap ?? { [state.currentMap.id]: removedEntities },
    modifiedEntitiesByMap: state.modifiedEntitiesByMap ?? {},
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
      equipment: Object.fromEntries(Object.entries(state.player.equipment).map(([k,v]) => [k, v ? v.id : null]))
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

export function applySavedState(json: string, state: GameState) {
  const obj = JSON.parse(json)
  const map = loadMap(obj.mapId)

  // apply global persistent maps and set current map
  state.removedEntityIdsByMap = obj.removedEntityIdsByMap ?? {}
  state.modifiedEntitiesByMap = obj.modifiedEntitiesByMap ?? {}

  state.currentMap = map
  const removed = state.removedEntityIdsByMap?.[map.id] ?? []
  if (removed.length > 0) {
    state.currentMap.entities = state.currentMap.entities.filter(e => !removed.includes(e.id))
  }

  const mods = state.modifiedEntitiesByMap?.[map.id]
  if (mods) {
    for (const ent of state.currentMap.entities) {
      const m = mods[ent.id]
      if (m) Object.assign(ent as any, m)
    }
  }

  const p = obj.player
  if (p) {
    state.player.x = p.x
    state.player.y = p.y
    state.player.hp = p.hp
    state.player.maxHp = p.maxHp
    state.player.level = p.level
    state.player.xp = p.xp
    state.player.xpToNextLevel = p.xpToNextLevel
    state.player.gold = p.gold

    // rebuild inventory items using Items lookup
    state.player.inventory = (p.inventory || []).map((it: any) => {
      const base = Items[it.id]
      return { ...(base as any), quantity: it.quantity ?? 1 }
    })

    // rebuild equipment by id
    const equip: any = {}
    for (const k of Object.keys(p.equipment || {})) {
      const id = (p.equipment as any)[k]
      equip[k] = id ? (Items[id] as any) : undefined
    }
    state.player.equipment = equip
  }

  state._eventBus?.emit("uiUpdate")
}
