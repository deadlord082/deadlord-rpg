import { GameMap } from "./mapTypes"
import { AllMaps } from "./data"

const maps: Record<string, GameMap> = {}

AllMaps.forEach(map => {
  maps[map.id] = map
})

export function loadMap(id: string): GameMap {
  const map = maps[id]
  if (!map) throw new Error(`Map not found: ${id}`)
  return structuredClone(map)
}
