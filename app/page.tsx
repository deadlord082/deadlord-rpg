"use client"

import { useEffect, useState } from "react"
import { Game, bindKeyboard, createPlayer, loadMap } from "@/game"
import { animationScheduler } from "@/game/core/AnimationScheduler"
import { GameViewport } from "./components/GameViewport"
import { DialogUI } from "./components/Dialog"
import { useRef } from "react"
import { GameMenu } from "./components/GameMenu/GameMenu"
import { ToastUI } from "./components/ToastUI"
import { ToastSystem } from "@/game/systems/ToastSystem"
import { ShopUI } from "./components/ShopUi"
import { LevelUpUI } from "./components/LevelUpUi"
import { CombatUI } from "./components/CombatUi"
import { CombatSystem } from "@/game/systems/CombatSystem"
import { runEvent } from "@/game/events/EventRunner"

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

    // keep dialogLock in sync when UI updates via event bus
    const unsub = g.state._eventBus?.on("uiUpdate", () => {
      if (g.state.ui.dialog) dialogLockRef.current = true
    })

    // fixed timestep simulation + animation scheduler
    let last = performance.now()
    const timestep = 1000 / 60 // 60Hz
    let accumulator = 0

    const loop = (now: number) => {
      const frameDelta = now - last
      last = now
      accumulator += frameDelta

      // update toast and animations per frame
      ToastSystem.update(g.state)
      // update animation scheduler (delta in seconds)
      const frameDeltaSeconds = frameDelta / 1000
      animationScheduler.update(frameDeltaSeconds)

      // run fixed timesteps for game simulation
      while (accumulator >= timestep) {
        const dt = timestep / 1000
        if (g.state.combat) {
          CombatSystem.update(g.state.combat, g.state, dt)
        }
        accumulator -= timestep
      }

      forceUpdate((v) => v + 1)
      requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    g.start()
    setGame(g)
    return () => {
      if (unsub) unsub()
    }
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
            runEvent(next, game.state)
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
            game.state._eventBus?.emit("uiUpdate")
          }}
        />
      )}

      {game.state.combat && (
        <CombatUI
          state={game.state}
          onAction={(action, targetIndex) => {
            if (!game.state.combat) return
            const combat = game.state.combat
            switch (action) {
              case "attack":
                CombatSystem.playerAttack(combat, targetIndex ?? 0)
                break
              case "guard":
                CombatSystem.playerGuard(combat)
                break
              case "item":
                // handled in CombatUI (items open their own picker)
                break
              case "skill":
                combat.log.push("Skill not implemented yet.")
                combat.awaitingPlayerInput = false
                break
              case "flee":
                CombatSystem.attemptFlee(combat, game.state)
                break
            }
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
            game.state._eventBus?.emit("uiUpdate")
          }}
        />
      )}

      <DialogUI dialog={game.state.ui.dialog} />
      <ToastUI toasts={game.state.toasts} />

      {game.state.ui.levelUp && (
        <LevelUpUI state={game.state} />
      )}
    </div>
  )
}
