import { GameEvent } from "./Event"
import { GameState } from "../core/GameState"
import { loadMap } from "../data/maps/mapLoader"
import { loadDialog } from "../data/dialogs/dialogLoader"
import { DialogLine } from "../data/dialogs/DialogLine"
import { InventorySystem } from "../systems/InventorySystem"

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
        lines = [{ name: "???", message: Array.isArray(event.text) ? event.text.join("\n") : event.text }]
      }

      state.ui.dialog = { lines, index: 0 }
      ;(state as any)._game?.notifyUI()
      break

    case "choice":
      state.ui.choice = event
      break

    case "merchant":
      state.ui.merchant = event
      break

    case "reward":
      handleRewardEvent(event, state)
      break

    case "fight":
      state.ui.fight = event
      break

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

function handleRewardEvent(event: { items?: string[]; gold?: number }, state: GameState) {
  const player = state.player

  // Give gold
  if (event.gold) {
    player.gold = (player.gold ?? 0) + event.gold
  }

  // Give items
  if (event.items) {
    for (const itemId of event.items) {
      InventorySystem.addItem(player, itemId)
    }
  }

  // Notify UI of changes (inventory, gold, etc.)
  ;(state as any)._game?.notifyUI()
}

