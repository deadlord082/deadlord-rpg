"use client"

import { useEffect, useState } from "react"
import { Game, bindKeyboard, createPlayer, loadMap } from "@/game"
import { Tiles } from "@/game/data/tiles/tileSet"
import { Entity } from "@/game/entities/Entity"
import Image from "next/image"

export default function Page() {
  // Game state reference
  const [game, setGame] = useState<Game | null>(null)
  const [_, forceUpdate] = useState(0) // for simple re-render

  useEffect(() => {
    // Load map and player
    const map = loadMap("heroHouse")
    const player = createPlayer(2, 2,"/assets/entities/players/player.png")

    const newGame = new Game({
      currentMap: map,
      player,
      running: true,
    })

    bindKeyboard(newGame)

    // force React to re-render every frame
    function loop() {
      forceUpdate((v) => v + 1)
      requestAnimationFrame(loop)
    }
    loop()

    newGame.start()
    setGame(newGame)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (game?.state.ui.dialog && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault()
        advanceDialog()
      }
    }
  
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [game])

  if (!game) return <div>Loading...</div>

  const { currentMap, player } = game.state

  // helper to render entities
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

  // helper to render dialog
  function advanceDialog() {
    const ui = game.state.ui
    if (!ui.dialog) return
  
    ui.dialog.index++
  
    if (ui.dialog.index >= ui.dialog.lines.length) {
      ui.dialog = undefined
  
      // run queued events (sequence support)
      const next = game.state.eventQueue.shift()
      if (next) {
        import("@/game/events/EventRunner").then(({ runEvent }) => {
          runEvent(next, game.state)
        })
      }
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
      {/* ================= WORLD LAYER ================= */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "2px solid black",
        }}
      >
        {/* Tiles */}
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
                style={{
                  position: "absolute",
                  left: x * 32,
                  top: y * 32,
                }}
              />
            )
          })
        )}
  
        {/* Entities */}
        {renderEntities([...currentMap.entities, player])}
      </div>
  
      {/* ================= UI LAYER ================= */}
      {game.state.ui.dialog && (
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
            zIndex: 1000, // now GUARANTEED
          }}
        >
          <div>
            {game.state.ui.dialog.lines[game.state.ui.dialog.index]}
          </div>
  
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
