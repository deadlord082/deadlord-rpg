import { GameEvent } from "./Event"
import { GameState } from "../core/GameState"
import { loadMap } from "../data/maps/mapLoader"
import { loadDialog } from "../data/dialogs/dialogLoader"
import { DialogLine } from "../data/dialogs/DialogLine"
import { InventorySystem } from "../systems/InventorySystem"
import { ToastSystem } from "../systems/ToastSystem"
import { LevelSystem } from "../systems/LevelSystem"
import { createEnemyFromId } from "../entities/createEnemyFromId"

export function runEvent(event: GameEvent, state: GameState) {
  switch (event.type) {
    case "dialog":
      state.running = false

      let lines: DialogLine[] = []

      if ("dialogId" in event) {
        lines = loadDialog(event.dialogId)
      } else if ("lines" in event) {
        lines = event.lines
      } else if ("text" in event) {
        // fallback for old single-line dialogs
        lines = [{ name: "", message: Array.isArray(event.text) ? event.text.join("\n") : event.text }]
      }

      state.ui.dialog = { lines, index: 0 }
      state._eventBus?.emit("uiUpdate")
      break

    case "choice":
      state.ui.choice = event
      break

    case "merchant":
      state.running = false
      state.ui.merchant = event
      state._eventBus?.emit("uiUpdate")
      break

    case "reward":
      handleRewardEvent(event, state)
      break

    case "fight": {
      const ids = event.enemyIds ?? (event.enemyId ? [event.enemyId] : [])

      state.running = false
      // expose the fight event in the UI state so global input is blocked
      state.ui.fight = event

      const enemies = ids.map(id => createEnemyFromId(id))

      state.combat = {
        player: state.player,
        enemies,
        enemyGauges: enemies.map(() => 0),

        playerGauge: 0,
        threshold: 100,

        actionTimer: 0,
        pendingAction: undefined,
        pendingEnemyIndex: undefined,

        awaitingPlayerInput: false,
        log: [],
        resolved: false,
      }

      state._eventBus?.emit("uiUpdate")
      break
    }

    case "cutscene":
      console.log("Trigger cutscene:", event.id)
      break
    
    case "warp":
      handleWarp(event, state)
      break

    case "sequence":
      runSequence(event.events, state)
      break
  }
}

function runSequence(events: GameEvent[], state: GameState) {
  if (events.length === 0) return
  const [first, ...rest] = events

  runEvent(first, state)

  // queue remaining events
  state.eventQueue = rest
  // notify UI that event queue changed (so follow-up dialogs show)
  state._eventBus?.emit("uiUpdate")
}

function handleWarp(
  event: { targetMap: string; x: number; y: number },
  state: GameState
) {
  const newMap = loadMap(event.targetMap)

  state.currentMap = newMap
  state.player.x = event.x
  state.player.y = event.y

  // clear UI just in case
  state.ui = {}
}

function handleRewardEvent(event: { items?: string[]; gold?: number; xp?: number }, state: GameState) {
  const player = state.player

  if (event.gold) {
    player.gold += event.gold
    ToastSystem.addGoldToast(state, event.gold)
  }

  if (event.xp) {
    const levelUps = LevelSystem.gainXP(player, event.xp)
  
    ToastSystem.addXpToast(state, event.xp)
  
    if (levelUps.length > 0) {
      const first = levelUps[0]
  
      state.running = false
      state.ui.levelUp = {
        newLevel: first.level,
        previousStats: first.previousStats,
        statGains: first.statGains,
      }
    }
  }

  if (event.items) {
    for (const itemId of event.items) {
      InventorySystem.addItem(player, itemId)
      ToastSystem.addItemToast(state, itemId)
    }
  }

  state._eventBus?.emit("uiUpdate")
}

