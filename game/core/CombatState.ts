import { Enemy } from "../entities/Enemy"
import { Player } from "../entities/Player"

export interface CombatState {
  player: Player
  // Support multiple enemies
  enemies: Enemy[]
  // Gauges per enemy (aligned by index)
  enemyGauges: number[]

  playerGauge: number
  threshold: number

  actionTimer: number
  // pendingAction may be an enemy attack; pendingEnemyIndex identifies which one
  pendingAction?: "playerAttack" | "enemyAttack"
  pendingEnemyIndex?: number
  pendingTargetIndex?: number

  awaitingPlayerInput: boolean
  log: string[]

  resolved?: boolean
}