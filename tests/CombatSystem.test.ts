import { describe, it, expect } from 'vitest'
import { CombatSystem } from '../game/systems/CombatSystem'

describe('CombatSystem', () => {
  it('advances player gauge by speed * delta * 20', () => {
    const player = {
      getTotalStats: () => ({ speed: 3 }),
    } as any

    const enemy = {
      getTotalStats: () => ({ speed: 1 }),
    } as any

    const state: any = {
      player,
      enemies: [enemy],
      enemyGauges: [0],
      playerGauge: 0,
      threshold: 9999,
      actionTimer: 0,
      awaitingPlayerInput: false,
      log: [],
    }

    const gameState: any = {
      player,
      running: true,
      combat: state,
      eventQueue: [],
      toasts: [],
    }

    const delta = 0.1
    CombatSystem.update(state, gameState, delta)

    expect(state.playerGauge).toBeCloseTo(3 * delta * 20)
  })
})
