import { GameMap } from "../data/maps/mapTypes"
import { Player } from "../entities/Player"
import { ChoiceEvent } from "../events/ChoiceEvent"
import { FightEvent } from "../events/FightEvent"
import { MerchantEvent } from "../events/MerchantEvent"
import { GameEvent } from "../events/Event"

export interface GameState {
  currentMap: GameMap
  player: Player

  ui: {
    dialog?: {
      lines: string[]
      index: number
    }
    choice?: ChoiceEvent
    merchant?: MerchantEvent
    fight?: FightEvent
  }

  eventQueue: GameEvent[]
  running: boolean
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
  }
}

