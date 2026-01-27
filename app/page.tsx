"use client"

import { useEffect, useState } from "react"
import { Game, bindKeyboard, createPlayer, loadMap } from "@/game"
import { Tiles } from "@/game/data/tiles/tileSet"
import { Entity } from "@/game/entities/Entity"
import Image from "next/image"

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

  const renderEntities = (entities: Entity[]) => {
    return entities.map((e) => (
      <img
        key={e.id}
        src={e.image || "/assets/entities/player.png"}
        style={{
          position: "absolute",
          width: 32,
          height: 32,
          left: e.x * 32,
          top: e.y * 32,
        }}
      />
    ))
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

  return (
    <div
      style={{
        position: "relative",
        width: currentMap.width * 32,
        height: currentMap.height * 32,
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
        {currentMap.tiles.map((row, y) =>
          row.map((tileId, x) => {
            const tile = Tiles[tileId]
            return (
              <Image
                key={`${x}-${y}`}
                src={tile.image || "/assets/tiles/placeholder.png"}
                alt={tile.name}
                width={32}
                height={32}
                style={{ position: "absolute", left: x * 32, top: y * 32 }}
              />
            )
          })
        )}
        {renderEntities([...currentMap.entities, player])}
      </div>

      {/* UI LAYER */}
      {dialogState && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 96,
            background: "rgba(0,0,0,0.85)",
            color: "white",
            padding: 12,
            zIndex: 1000,
          }}
        >
          <div>{dialogState.lines[dialogState.index]}</div>
          <div
            style={{
              position: "absolute",
              bottom: 8,
              right: 12,
              opacity: 0.6,
              fontSize: 12,
            }}
          >
            ⏎
          </div>
        </div>
      )}
    </div>
  )
}
