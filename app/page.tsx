"use client"

import { useEffect, useState } from "react"
import { Game, bindKeyboard, createPlayer, loadMap } from "@/game"
import { GameViewport } from "./components/GameViewport"
import { DialogUI } from "./components/Dialog"
import { useRef } from "react"
import { GameMenu } from "./components/GameMenu/GameMenu"
import { ToastUI } from "./components/ToastUI"
import { ToastSystem } from "@/game/systems/ToastSystem"
import { ShopUI } from "./components/ShopUi"

const TILE_SIZE = 64
const VIEW_TILES_X = 17
const VIEW_TILES_Y = 17

export default function Page() {
  const [game, setGame] = useState<Game | null>(null)
  const [, forceUpdate] = useState(0)
  const dialogLockRef = useRef(false)

  useEffect(() => {
    const map = loadMap("heroHouse")
    const player = createPlayer(2, 2)

    const g = new Game({ currentMap: map, player, running: true })
    ;(g.state as any)._game = g

    bindKeyboard(g)

    g.onUIChange = () => {
      if (g.state.ui.dialog) {
        dialogLockRef.current = true
      }
    }

    const loop = () => {
      ToastSystem.update(g.state)
      forceUpdate((v) => v + 1)
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    g.start()
    setGame(g)
  }, [])

  useEffect(() => {
    function onKeyUp() {
      dialogLockRef.current = false
    }
  
    window.addEventListener("keyup", onKeyUp)
    return () => window.removeEventListener("keyup", onKeyUp)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!game) return
      const dialog = game.state.ui.dialog
      if (!dialog) return
  
      if (dialogLockRef.current) return
  
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
  
        dialog.index++
  
        if (dialog.index >= dialog.lines.length) {
          game.state.ui.dialog = undefined
          game.state.running = true
  
          const next = game.state.eventQueue.shift()
          if (next) {
            import("@/game/events/EventRunner").then(({ runEvent }) => {
              runEvent(next, game.state)
            })
          }
        }
      }
    }
  
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [game])
  

  if (!game) return <div>Loading…</div>

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
      <GameViewport
        map={game.state.currentMap}
        player={game.state.player}
        tileSize={TILE_SIZE}
        viewWidth={VIEW_TILES_X}
        viewHeight={VIEW_TILES_Y}
      />

      {game.state.ui.menuOpen && (
        <GameMenu
          player={game.state.player}
          initialTab={game.state.ui.menuTab ?? null}
          onClose={() => {
            game.state.ui.menuOpen = false
            game.state.running = true
            ;(game.state as any)._game?.notifyUI()
          }}
        />
      )}

      {game.state.ui.merchant && (
        <ShopUI
          state={game.state}
          event={game.state.ui.merchant}
          onClose={() => {
            game.state.ui.merchant = undefined
            game.state.running = true
            ;(game.state as any)._game?.notifyUI()
          }}
        />
      )}

      <DialogUI dialog={game.state.ui.dialog} />
      <ToastUI toasts={game.state.toasts} />
    </div>
  )
}
