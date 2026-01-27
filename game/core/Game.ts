
import { GameMap } from "../data/maps/mapTypes"
import { Player } from "../entities/Player"
import { GameState } from "./GameState"
import { createInitialGameState } from "./GameState"

export class Game {
  state: GameState

  constructor({
    currentMap,
    player,
    running,
  }: {
    currentMap: GameMap
    player: Player
    running: boolean
  }) {
    this.state = createInitialGameState(currentMap, player)
    this.state.running = running
  }

  start() {
    // game loop stuff
  }
}