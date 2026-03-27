import { CombatState } from "../core/CombatState"
import { basicAttack } from "./DamageSystem"
import { rng } from "../utils/rng"

import { ENEMIES } from "../data/enemies/enemies"
import { LevelSystem } from "./LevelSystem"
import { ToastSystem } from "./ToastSystem"
import { GameState } from "../core/GameState"
import { runEvent } from "../events/EventRunner"

export class CombatSystem {

  static update(state: CombatState, gameState: GameState, delta: number) {
    if (state.resolved) return
  
    // ⏳ Handle action animation delay
    if (state.pendingAction) {
      state.actionTimer -= delta
      if (state.actionTimer <= 0) {
          if (state.pendingAction === "enemyAttack") {
            this.executeEnemyAttack(state, gameState, state.pendingEnemyIndex ?? 0)
          }
          if (state.pendingAction === "playerAttack") {
            this.executePlayerAttack(state, gameState, state.pendingTargetIndex ?? 0)
          }
        state.pendingAction = undefined
        state.pendingEnemyIndex = undefined
          state.pendingTargetIndex = undefined
      }
      return
    }
  
    if (state.awaitingPlayerInput) return
  
    const playerSpeed = state.player.getTotalStats().speed
    // advance player gauge
    state.playerGauge += playerSpeed * delta * 20

    // advance each enemy gauge individually
    for (let i = 0; i < state.enemies.length; i++) {
      const e = state.enemies[i]
      if (e.hp <= 0) continue
      const enemySpeed = e.getTotalStats().speed
      state.enemyGauges[i] = (state.enemyGauges[i] || 0) + enemySpeed * delta * 20
    }
  
    if (state.playerGauge >= state.threshold) {
      state.playerGauge -= state.threshold
      state.awaitingPlayerInput = true
      return
    }
  
    // check enemies for threshold
    for (let i = 0; i < state.enemies.length; i++) {
      if (state.enemies[i].hp <= 0) continue
      if ((state.enemyGauges[i] || 0) >= state.threshold) {
        state.enemyGauges[i] -= state.threshold
        state.pendingAction = "enemyAttack"
        state.pendingEnemyIndex = i
        state.actionTimer = 0.4
        break
      }
    }
  }

  static executeEnemyAttack(state: CombatState, gameState: GameState, enemyIndex: number) {
    // pick a valid alive enemy for this index
    let enemy = state.enemies[enemyIndex]
    if (!enemy || enemy.hp <= 0) {
      enemy = state.enemies.find(e => e.hp > 0)
    }
    if (!enemy) return

    const damage = basicAttack(enemy, state.player)
    state.log.push(`Enemy hits for ${damage}`)

    // guard and other one-turn buffs should tick down after being used
    state.player.tickBuffs()

    if (state.player.hp <= 0) {
      this.handlePlayerDefeat(gameState)
    }
  }

  static executePlayerAttack(state: CombatState, gameState: GameState, targetIndex = 0) {
    let target = state.enemies[targetIndex]
    if (!target || target.hp <= 0) {
      target = state.enemies.find(e => e.hp > 0)
    }
    if (!target) return

    const damage = basicAttack(state.player, target)
    state.log.push(`You hit for ${damage}`)

    if (target.hp <= 0) {
      // check if all enemies are defeated
      const allDead = state.enemies.every(e => e.hp <= 0)
      if (allDead) this.handleVictory(gameState)
    }
  }

  static enemyTurn(state: CombatState, gameState: GameState) {
    const enemy = state.enemies.find(e => e.hp > 0) ?? state.enemies[0]
    if (!enemy) return

    const damage = basicAttack(enemy, state.player)
    state.log.push(`Enemy hits for ${damage}`)

    if (state.player.hp <= 0) {
      this.handlePlayerDefeat(gameState)
    }
  }

  static playerAttack(state: CombatState, targetIndex = 0) {
    state.awaitingPlayerInput = false
    state.pendingAction = "playerAttack"
    state.pendingTargetIndex = targetIndex
    state.actionTimer = 0.4
  }

  static playerGuard(state: CombatState) {
    state.player.addBuff({
      id: "guard",
      name: "guard",
      type: "buff",
      duration: 1,
      modifiers: [
        { stat: "defense", value: 1.6, type: "percent" }
      ]
    })

    state.log.push("You brace for impact.")

    state.awaitingPlayerInput = false
  }

  static handleVictory(gameState: GameState) {
    const combat = gameState.combat
    if (!combat || combat.resolved) return
  
    combat.resolved = true
  
    const player = gameState.player

    // Aggregate rewards from all defeated enemies
    let totalGold = 0
    let totalXp = 0
    for (const e of combat.enemies) {
      const def = ENEMIES[e.enemyId]
      if (!def) continue
      totalGold += def.goldReward || 0
      totalXp += def.xpReward || 0
    }

    // Rewards
    player.gold += totalGold
    if (totalGold > 0) ToastSystem.addGoldToast(gameState, totalGold)

    const levelUps = LevelSystem.gainXP(player, totalXp)
    if (totalXp > 0) ToastSystem.addXpToast(gameState, totalXp)
  
    if (levelUps.length > 0) {
      const first = levelUps[0]
  
      gameState.ui.levelUp = {
        newLevel: first.level,
        previousStats: first.previousStats,
        statGains: first.statGains,
      }
    }
  
    combat.log.push("Victory!")

    // End combat
    const fightEvent = gameState.ui.fight as any
    gameState.combat = undefined
    // clear fight UI
    gameState.ui.fight = undefined
    gameState.running = true

    // If the fight had a success callback, run it
    if (fightEvent && fightEvent.success) {
      runEvent(fightEvent.success, gameState)
    }

    // Continue queued sequence
    if (gameState.eventQueue.length > 0) {
      const next = gameState.eventQueue.shift()
      if (next) {
        runEvent(next, gameState)
      }
    }
  
    gameState._eventBus?.emit("uiUpdate")
  }

  static handlePlayerDefeat(gameState: GameState) {
    const combat = gameState.combat
    if (!combat || combat.resolved) return

    combat.resolved = true

    combat.log.push("You were defeated...")
    // Show death UI instead of immediately resetting the player
    gameState.combat = undefined
    gameState.ui.fight = undefined
    gameState.running = false
    gameState.ui.death = {}

    // If the fight had a fail callback, run it (keep behavior)
    const fightEvent = gameState.ui.fight as any
    if (fightEvent && fightEvent.fail) {
      runEvent(fightEvent.fail, gameState)
    }

    gameState._eventBus?.emit("uiUpdate")
  }

  static attemptFlee(state: CombatState, gameState: GameState) {
    state.awaitingPlayerInput = false
  
    const enemy = state.enemies.find(e => e.hp > 0) ?? state.enemies[0]
    const chance = enemy?.fleeChance ?? 0.5

    if (rng.random() < chance) {
      state.log.push("You successfully fled!")

      gameState.combat = undefined
      gameState.ui.fight = undefined
      gameState.running = true

      gameState._eventBus?.emit("uiUpdate")
    } else {
      state.log.push("Failed to flee!")
    }
  }
}