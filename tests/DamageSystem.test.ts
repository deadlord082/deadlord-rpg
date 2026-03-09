import { describe, it, expect, beforeEach } from 'vitest'
import { basicAttack } from '../game/systems/DamageSystem'
import { rng } from '../game/utils/rng'

describe('DamageSystem', () => {
  beforeEach(() => {
    rng.setSeed(12345)
  })

  it('computes non-crit damage correctly', () => {
    const attacker: any = {
      getTotalStats: () => ({ strength: 10, critChance: 0, critDamage: 1 }),
    }

    const defender: any = {
      getTotalStats: () => ({ defense: 5 }),
      hp: 50,
    }

    const dmg = basicAttack(attacker, defender)
    expect(dmg).toBe(Math.floor(Math.max(1, 10 - 5)))
    expect(defender.hp).toBe(50 - dmg)
  })
})
