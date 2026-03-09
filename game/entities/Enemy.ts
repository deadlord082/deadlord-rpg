import { createCombatEntity, CombatEntity } from "./CombatEntity"
import { Stats } from "./Stats"

export interface Enemy extends CombatEntity {
  enemyId: string
  fleeChance?: number
}

export function createEnemy(enemyId: string, x: number, y: number, fleeChance?: number): Enemy {

  const baseStats: Stats = {
    strength: 8,
    defense: 3,
    speed: 4,
    luck: 1,
    charisma: 0,
    critChance: 2,
    critDamage: 1.3,
  }

  const baseEntity = {
    id: `enemy-${enemyId}`,
    x,
    y,
    blocking: true,
  }

  const enemy = createCombatEntity(baseEntity, baseStats, 50) as Enemy
  enemy.enemyId = enemyId

  return enemy
}