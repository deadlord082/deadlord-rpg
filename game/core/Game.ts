
import { GameMap } from "../data/maps/mapTypes"
import { Player } from "../entities/Player"
import { GameState } from "./GameState"
import { createInitialGameState } from "./GameState"
import { EventBus, globalEventBus } from "./EventBus"
import { serializeGameState } from "./saveLoad"

export class Game {
  state: GameState
  onUIChange?: () => void
  eventBus: EventBus

  constructor({
    currentMap,
    player,
    running,
  }: {
    currentMap: GameMap
    player: Player
    running: boolean
  }) {
    this.eventBus = globalEventBus

    this.state = createInitialGameState(currentMap, player)
    this.state.running = running
    // inject the event bus onto the runtime state so systems/entities can emit
    this.state._eventBus = this.eventBus
  }

  notifyUI() {
    // Emit a UI update event and keep backwards-compatible callback
    this.eventBus.emit("uiUpdate")
    this.onUIChange?.()
  }

  start() {
    // game loop stuff
  }

  save() {
    return serializeGameState(this.state)
  }
}