import { Tiles, resolveTileId } from "@/game/data/tiles/tileSet"
import { Entity } from "@/game/entities/Entity"
import Image from "next/image"
import { Direction } from "@/game/utils/direction"

function directionToAnimationDir(d: Direction) {
  switch (d) {
    case Direction.Up: return "north"
    case Direction.Down: return "south"
    case Direction.Left: return "west"
    case Direction.Right: return "east"
  }
}

interface GameViewportProps {
  map: any
  player: Entity
  tileSize: number
  viewWidth: number
  viewHeight: number
  cameraX?: number
  cameraY?: number
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
    // If entity is moving and has move state, prefer animation frames for player
    if (entity.moving && entity.id === "player") {
      const dir = directionToAnimationDir(entity.direction)
      const elapsed = entity.moveElapsed ?? 0
      const dur = entity.moveDuration ?? 200
      const frames = 4
      const t = Math.min(1, elapsed / dur)
      const idx = Math.min(frames - 1, Math.floor(t * frames))
      const pad = String(idx).padStart(3, "0")
      return `/assets/entities/npcs/hero/animations/walking/${dir}/frame_${pad}.png`
    }

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
  cameraX: propCameraX,
  cameraY: propCameraY,
}: GameViewportProps) {
  const radiusX = Math.floor(viewWidth / 2)
  const radiusY = Math.floor(viewHeight / 2)

  // allow caller to provide smoothed camera position (top-left in tiles)
  const cameraX = typeof propCameraX === "number"
    ? propCameraX
    : Math.max(0, Math.min(player.x - radiusX, map.width - viewWidth))

  const cameraY = typeof propCameraY === "number"
    ? propCameraY
    : Math.max(0, Math.min(player.y - radiusY, map.height - viewHeight))

  // Compute starting tile indices and fractional offsets so we can render with sub-tile precision
  const startTileX = Math.floor(cameraX)
  const startTileY = Math.floor(cameraY)
  const offsetX = (cameraX - startTileX) * tileSize
  const offsetY = (cameraY - startTileY) * tileSize

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Tiles */}
      {Array.from({ length: viewHeight }).map((_, sy) =>
        Array.from({ length: viewWidth }).map((_, sx) => {
          const mx = startTileX + sx
          const my = startTileY + sy
          const raw = map.tiles[my]?.[mx]
          if (raw == null) return null

          const tileId = resolveTileId(map.id ?? "", raw, mx, my)
          const tile = Tiles[tileId]

          return (
            <Image
              key={`${mx}-${my}`}
              src={tile.image as string}
              alt={tile.name}
              width={tileSize}
              height={tileSize}
              style={{
                position: "absolute",
                left: sx * tileSize - offsetX,
                top: sy * tileSize - offsetY,
              }}
            />
          )
        })
      )}

      {/* Entities */}
      {[...map.entities, player].map((e) => {
        // compute render position (interpolated if moving)
        const from = e.moveFrom ?? { x: e.x, y: e.y }
        const elapsed = e.moveElapsed ?? 0
        const dur = e.moveDuration ?? 200
        const t = dur > 0 ? Math.min(1, elapsed / dur) : 1

        const renderX = from.x + (e.x - from.x) * t
        const renderY = from.y + (e.y - from.y) * t

        // compute entity position relative to startTile so fractional camera offsets apply uniformly
        const sxEntity = renderX - startTileX
        const syEntity = renderY - startTileY

        if (sxEntity < -1 || syEntity < -1 || sxEntity >= viewWidth || syEntity >= viewHeight)
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
              left: sxEntity * tileSize - offsetX,
              top: syEntity * tileSize - offsetY,
              transform: "translateZ(0)",
            }}
          />
        )
      })}
    </div>
  )
}
