"use client"

import { useEffect, useRef, useState } from "react"
import { Game, bindKeyboard, createPlayer, loadMap } from "@/game"
import { animationScheduler } from "@/game/core/AnimationScheduler"
import { GameViewport } from "./components/GameViewport"
import { DialogUI } from "./components/Dialog"
import { ChoiceUI } from "./components/ChoiceUI"
import { GameMenu } from "./components/GameMenu/GameMenu"
import { ToastUI } from "./components/ToastUI"
import { ToastSystem } from "@/game/systems/ToastSystem"
import { ShopUI } from "./components/ShopUi"
import { LevelUpUI } from "./components/LevelUpUi"
import { CombatUI } from "./components/CombatUi"
import { DeathScreen } from "./components/DeathScreen"
import { CombatSystem } from "@/game/systems/CombatSystem"
import { runEvent } from "@/game/events/EventRunner"
import { TitleScreen } from "./components/TitleScreen"
import { isActionKey } from "@/game/input/keybindings"
import { ConfirmModal } from "./components/ConfirmModal"
import { TitleLoadModal } from "./components/TitleLoadModal"
import { SettingsTab } from "./components/GameMenu/SettingsTab"
import { serializeGameState, applySavedState } from "@/game/core/saveLoad"

const TILE_SIZE = 64
const VIEW_TILES_X = 17
const VIEW_TILES_Y = 17

export default function Page() {
  const [showLoadModal, setShowLoadModal] = useState(false)
  const [showSettingsMsg, setShowSettingsMsg] = useState(false)
  const [game, setGame] = useState<Game | null>(null)
  const [, forceUpdate] = useState(0)
  const dialogLockRef = useRef(false)
  const gameRef = useRef<Game | null>(null)

  // single animation loop that reads from gameRef.current if present
  useEffect(() => {
    let last = performance.now()
    const timestep = 1000 / 60
    let accumulator = 0

    const loop = (now: number) => {
      const frameDelta = now - last
      last = now
      accumulator += frameDelta

      const g = gameRef.current

      if (g) {
        ToastSystem.update(g.state)
        animationScheduler.update(frameDelta / 1000)

        while (accumulator >= timestep) {
          const dt = timestep / 1000
          if (g.state.combat) CombatSystem.update(g.state.combat, g.state, dt)
          accumulator -= timestep
        }

        // re-render
        forceUpdate(v => v + 1)
      }

      requestAnimationFrame(loop)
    }

    requestAnimationFrame(loop)
    return () => {}
  }, [])

  useEffect(() => {
    function onKeyUp() { dialogLockRef.current = false }
    window.addEventListener("keyup", onKeyUp)
    return () => window.removeEventListener("keyup", onKeyUp)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const g = gameRef.current
      if (!g) return
      const dialog = g.state.ui.dialog
      if (!dialog) return
      if (dialogLockRef.current) return
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        // prevent other keydown listeners (like core game input) from
        // receiving the same Enter event and retriggering interactions
        e.stopImmediatePropagation()
        dialog.index++
        if (dialog.index >= dialog.lines.length) {
          g.state.ui.dialog = undefined
          g.state.running = true
          const next = g.state.eventQueue.shift()
          if (next) runEvent(next, g.state)
          g.state._eventBus?.emit("uiUpdate")
        }
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // handle quitToTitle emitted by menu
  useEffect(() => {
    function onQuit() {
      // teardown current game
      gameRef.current = null
      setGame(null)
    }
    window.addEventListener("quitToTitle", onQuit as any)
    // Also support quit + open load modal
    function onQuitAndLoad() {
      gameRef.current = null
      setGame(null)
      setShowLoadModal(true)
    }
    window.addEventListener("quitToTitleAndLoad", onQuitAndLoad as any)
    return () => {
      window.removeEventListener("quitToTitle", onQuit as any)
      window.removeEventListener("quitToTitleAndLoad", onQuitAndLoad as any)
    }
  }, [])

  // when settings overlay is open on title, allow ESC to close it
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!showSettingsMsg) return
      if (isActionKey(e, "cancel")) {
        setShowSettingsMsg(false)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [showSettingsMsg])


  function startNewGame() {
    const map = loadMap("heroHouse")
    const player = createPlayer(2, 2)
    const g = new Game({ currentMap: map, player, running: true })
    ;(g.state as any)._game = g
    bindKeyboard(g)
    g.state._eventBus?.on("uiUpdate", () => { if (g.state.ui.dialog) dialogLockRef.current = true })
    gameRef.current = g
    setGame(g)
  }

  function loadFromSlotData(json: string) {
    // create a fresh game and apply saved state
    const map = loadMap("heroHouse")
    const player = createPlayer(2,2)
    const g = new Game({ currentMap: map, player, running: true })
    ;(g.state as any)._game = g
    applySavedState(json, g.state)
    bindKeyboard(g)
    gameRef.current = g
    setGame(g)
  }

  if (!game) {
    return (
      <>
        <TitleScreen onNew={startNewGame} onLoad={() => setShowLoadModal(true)} onSettings={() => setShowSettingsMsg(true)} />
        {showLoadModal && (
          <TitleLoadModal onClose={() => setShowLoadModal(false)} onLoad={(data) => { setShowLoadModal(false); loadFromSlotData(data) }} />
        )}
        {showSettingsMsg && (
          <div data-modal="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
            <div style={{ width: "60%", background: "rgba(0,0,0,0.95)", color: "white", padding: 16, borderRadius: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h2 style={{ margin: 0 }}>Settings</h2>
                <button onClick={() => setShowSettingsMsg(false)} style={{ padding: 6 }}>Close</button>
              </div>
              <SettingsTab />
            </div>
          </div>
        )}
        {showSettingsMsg && (
          // close settings overlay with cancel (ESC)
          null
        )}
      </>
    )
  }

  // render game UI when a game exists
  const g = game
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "black" }}>
      <GameViewport map={g!.state.currentMap} player={g!.state.player} tileSize={TILE_SIZE} viewWidth={VIEW_TILES_X} viewHeight={VIEW_TILES_Y} />

      {g!.state.ui.menuOpen && (
        <GameMenu player={g!.state.player} state={g!.state} initialTab={g!.state.ui.menuTab ?? null} onClose={() => { g!.state.ui.menuOpen = false; g!.state.running = true; g!.state._eventBus?.emit('uiUpdate') }} />
      )}

      {g!.state.combat && (
        <CombatUI state={g!.state} onAction={(action, targetIndex) => {
          if (!g!.state.combat) return
          const combat = g!.state.combat
          switch (action) {
            case "attack": CombatSystem.playerAttack(combat, targetIndex ?? 0); break
            case "guard": CombatSystem.playerGuard(combat); break
            case "item": break
            case "skill": combat.log.push('Skill not implemented yet.'); combat.awaitingPlayerInput=false; break
            case "flee": CombatSystem.attemptFlee(combat, g!.state); break
          }
        }} />
      )}

      {g!.state.ui.death && (
        <DeathScreen />
      )}

      {g!.state.ui.merchant && (
        <ShopUI state={g!.state} event={g!.state.ui.merchant} onClose={() => { g!.state.ui.merchant = undefined; g!.state.running = true; g!.state._eventBus?.emit('uiUpdate') }} />
      )}

      <DialogUI dialog={g!.state.ui.dialog} />
      <ChoiceUI choice={g!.state.ui.choice} state={g!.state} />
      <ToastUI toasts={g!.state.toasts} />

      {g!.state.ui.levelUp && (<LevelUpUI state={g!.state} />)}
    </div>
  )
}
