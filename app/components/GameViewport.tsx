import { Tiles } from "@/game/data/tiles/tileSet"
import { Entity } from "@/game/entities/Entity"
import Image from "next/image"
import { Direction } from "@/game/utils/direction"

interface GameViewportProps {
  map: any
  player: Entity
  tileSize: number
  viewWidth: number
  viewHeight: number
}

function getEntitySprite(entity: any): string | undefined {
  // Chest (state-based sprite)
  if (entity.type === "chest" && entity.sprites) {
    return entity.opened
      ? entity.sprites.opened
      : entity.sprites.closed
  }

  // Directional entity (player, NPCs)
  if (entity.sprites && entity.direction) {
    return entity.sprites[entity.direction]
  }

  // Static entities (items, etc.)
  return entity.image
}

export function GameViewport({
  map,
  player,
  tileSize,
  viewWidth,
  viewHeight,
}: GameViewportProps) {
  const radiusX = Math.floor(viewWidth / 2)
  const radiusY = Math.floor(viewHeight / 2)

  const cameraX = Math.max(
    0,
    Math.min(player.x - radiusX, map.width - viewWidth)
  )

  const cameraY = Math.max(
    0,
    Math.min(player.y - radiusY, map.height - viewHeight)
  )

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Tiles */}
      {Array.from({ length: viewHeight }).map((_, sy) =>
        Array.from({ length: viewWidth }).map((_, sx) => {
          const mx = cameraX + sx
          const my = cameraY + sy
          const tileId = map.tiles[my]?.[mx]
          if (tileId == null) return null

          const tile = Tiles[tileId]

          return (
            <Image
              key={`${mx}-${my}`}
              src={tile.image}
              alt={tile.name}
              width={tileSize}
              height={tileSize}
              style={{
                position: "absolute",
                left: sx * tileSize,
                top: sy * tileSize,
              }}
            />
          )
        })
      )}

      {/* Entities */}
      {[...map.entities, player].map((e) => {
        const sx = e.x - cameraX
        const sy = e.y - cameraY

        if (sx < 0 || sy < 0 || sx >= viewWidth || sy >= viewHeight)
          return null

        const sprite = getEntitySprite(e)
        if (!sprite) return null

        return (
          <img
            key={e.id}
            src={sprite}
            style={{
              position: "absolute",
              width: tileSize,
              height: tileSize,
              left: sx * tileSize,
              top: sy * tileSize,
              imageRendering: "pixelated",
            }}
          />
        )
      })}
    </div>
  )
}
