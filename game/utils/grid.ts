import { GameMap } from "../data/maps/mapTypes"
import { Tiles } from "../data/tiles/tileSet"
import { Entity } from "../entities/Entity"

export function getTileAt(
    map: GameMap,
    x: number,
    y: number
) {
    const tileId = map.tiles[y]?.[x]
    if (tileId === undefined) return null

    return Tiles[tileId]
}

export function isInsideMap(
    map: GameMap,
    x: number,
    y: number
  ) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < map.width &&
      y < map.height
    )
  }

export function getEntityAt(
  entities: Entity[],
  x: number,
  y: number
) {
  return entities.find(e => e.x === x && e.y === y)
}
