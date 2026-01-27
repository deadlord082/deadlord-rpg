import { GameEvent } from "./Event"
import { GameState } from "../core/GameState"
import { loadMap } from "../data/maps/mapLoader"

export function runEvent(event: GameEvent, state: GameState) {
  switch (event.type) {
    case "dialog":
      console.log("DIALOG EVENT FIRED")
      state.ui.dialog = {
        lines: Array.isArray(event.text) ? event.text : [event.text],
        index: 0,
      }
      break

    case "choice":
      state.ui.choice = event
      break

    case "merchant":
      state.ui.merchant = event
      break

    case "reward":
      // event.items?.forEach(i => state.player.inventory.push(i))
      // if (event.gold) state.player.gold += event.gold
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

