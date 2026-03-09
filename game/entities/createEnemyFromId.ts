import { createCombatEntity } from "./CombatEntity"
import { ENEMIES } from "../data/enemies/enemies"
import { Enemy } from "./Enemy"

let _enemyInstanceCounter = 0

export function createEnemyFromId(enemyId: string): Enemy {
  const definition = ENEMIES[enemyId]

  if (!definition) {
    throw new Error(`Enemy not found: ${enemyId}`)
  }

  const baseEntity = {
    id: `enemy-${enemyId}-${++_enemyInstanceCounter}`,
    name: definition.name,
    image: definition.image,
    x: 0,
    y: 0,
    blocking: true,
  }

  const enemy = createCombatEntity(
    baseEntity,
    definition.stats,
    definition.maxHp
  ) as Enemy

  enemy.enemyId = enemyId
  enemy.fleeChance = definition.fleeChance ?? 0.5

  return enemy
}