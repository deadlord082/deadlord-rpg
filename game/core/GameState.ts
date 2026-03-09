import { GameMap } from "../data/maps/mapTypes"
import { Player } from "../entities/Player"
import { ChoiceEvent } from "../events/ChoiceEvent"
import { FightEvent } from "../events/FightEvent"
import { MerchantEvent } from "../events/MerchantEvent"
import { GameEvent } from "../events/Event"
import { DialogLine } from "../data/dialogs/DialogLine"
import { Toast } from "../data/toasts/toast"
import { CombatState } from "./CombatState"
import { EventBus } from "./EventBus"

export interface GameState {
  currentMap: GameMap
  player: Player

  ui: {
    dialog?: {
      lines: DialogLine[]
      index: number
    }
    choice?: ChoiceEvent
    merchant?: MerchantEvent
    fight?: FightEvent
    menuOpen?: boolean
    menuTab?: "status" | "inventory" | "close" | null
    levelUp?: {
      newLevel: number
      previousStats: Record<string, number>
      statGains: Record<string, number>
    }
  }

  combat?: CombatState
  toasts: Toast[]
  eventQueue: GameEvent[]
  running: boolean
  // Optional event bus injected by the Game instance for engine->UI events
  _eventBus?: EventBus
}

export function createInitialGameState(
  map: GameMap,
  player: Player
): GameState {
  return {
    currentMap: map,
    player,
    ui: {},
    eventQueue: [],
    running: true,
    toasts: [],
  }
}

