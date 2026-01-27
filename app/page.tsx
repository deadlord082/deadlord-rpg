"use client"

import { useEffect, useState } from "react"
import { Game, bindKeyboard, createPlayer, loadMap } from "@/game"
import { Tiles } from "@/game/data/tiles/tileSet"
import { Entity } from "@/game/entities/Entity"
import Image from "next/image"

const TILE_SIZE = 64

const VIEW_TILES_X = 17
const VIEW_TILES_Y = 17

const CAMERA_RADIUS_X = Math.floor(VIEW_TILES_X / 2)
const CAMERA_RADIUS_Y = Math.floor(VIEW_TILES_Y / 2)


export default function Page() {
  const [game, setGame] = useState<Game | null>(null)
  const [, forceUpdate] = useState(0) // world re-render
  const [dialogState, setDialogState] = useState<{
    lines: string[]
    index: number
  } | null>(null)

  useEffect(() => {
    const map = loadMap("heroHouse")
    const player = createPlayer(2, 2, "/assets/entities/players/player.png")

    const newGame = new Game({
      currentMap: map,
      player,
      running: true,
    })

    ;(newGame.state as any)._game = newGame

    // callback from engine to React when dialog opens
    newGame.onUIChange = () => {
      const dialog = newGame.state.ui.dialog
      if (dialog) setDialogState({ ...dialog })
    }

    bindKeyboard(newGame)

    // world render loop
    const loop = () => {
      forceUpdate((v) => v + 1)
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    newGame.start()
    setGame(newGame)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!dialogState) return
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        advanceDialog()
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [dialogState])

  if (!game) return <div>Loading...</div>

  const { currentMap, player } = game.state

  const cameraX = Math.max(
    0,
    Math.min(
      player.x - CAMERA_RADIUS_X,
      currentMap.width - VIEW_TILES_X
    )
  )
  
  const cameraY = Math.max(
    0,
    Math.min(
      player.y - CAMERA_RADIUS_Y,
      currentMap.height - VIEW_TILES_Y
    )
  )
  

  const renderEntities = (entities: Entity[]) => {
    return entities.map((e) => {
      const screenX = e.x - cameraX
      const screenY = e.y - cameraY
  
      // skip entities outside camera
      if (
        screenX < 0 ||
        screenY < 0 ||
        screenX >= VIEW_TILES_X ||
        screenY >= VIEW_TILES_Y
      ) {
        return null
      }
  
      return (
        <img
          key={e.id}
          src={e.image || "/assets/entities/player.png"}
          style={{
            position: "absolute",
            width: TILE_SIZE,
            height: TILE_SIZE,
            left: screenX * TILE_SIZE,
            top: screenY * TILE_SIZE,
          }}
        />
      )
    })
  }
  

  function advanceDialog() {
    if (!dialogState || !game) return
  
    const nextIndex = dialogState.index + 1
    if (nextIndex < dialogState.lines.length) {
      setDialogState({ ...dialogState, index: nextIndex })
      game.state.ui.dialog!.index = nextIndex
      return
    }
  
    // dialog finished
    setDialogState(null)
    game.state.ui.dialog = undefined
    game.state.running = true
  
    const next = game.state.eventQueue.shift()
    if (next) {
      import("@/game/events/EventRunner").then(({ runEvent }) => {
        runEvent(next, game.state)
      })
    }
  }
  
  let dialogUI = null

  if (game.state.ui.dialog) {
    const currentLine =
      game.state.ui.dialog.lines[game.state.ui.dialog.index]

    const imageSize = 128
    const boxHeight = 96
    const side = currentLine.side ?? "left"

    dialogUI = (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        {/* Character portrait */}
        {currentLine.image && (
          <img
            src={currentLine.image}
            alt={currentLine.name}
            style={{
              position: "absolute",
              bottom: boxHeight - 16,
              [side]: 0,
              height: imageSize,
              width: "auto",
              zIndex: 0,
            }}
          />
        )}

        {/* Dialog box */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: boxHeight,
            background: "rgba(0,0,0,0.85)",
            color: "white",
            padding: 12,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {currentLine.name}
          </div>

          <div>{currentLine.message}</div>

          <div
            style={{
              alignSelf: "flex-end",
              opacity: 0.6,
              fontSize: 12,
            }}
          >
            ⏎
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
  style={{
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "black",
  }}
>
      {/* WORLD LAYER */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "2px solid black",
        }}
      >
        {Array.from({ length: VIEW_TILES_Y }).map((_, screenY) =>
          Array.from({ length: VIEW_TILES_X }).map((_, screenX) => {
            const mapX = cameraX + screenX
            const mapY = cameraY + screenY

            const tileId = currentMap.tiles[mapY]?.[mapX]
            if (tileId == null) return null

            const tile = Tiles[tileId]

            return (
              <Image
                key={`${mapX}-${mapY}`}
                src={tile.image || "/assets/tiles/placeholder.png"}
                alt={tile.name}
                width={TILE_SIZE}
                height={TILE_SIZE}
                style={{
                  position: "absolute",
                  left: screenX * TILE_SIZE,
                  top: screenY * TILE_SIZE,
                }}
              />
            )
          })
        )}

        {renderEntities([...currentMap.entities, player])}
      </div>

      {/* ================= UI LAYER ================= */}
      {dialogUI}

    </div>
  )
}
