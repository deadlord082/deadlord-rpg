import { CombatEntity } from "../entities/CombatEntity"
import { rng } from "../utils/rng"

export function basicAttack(attacker: CombatEntity, defender: CombatEntity) {
  const atk = attacker.getTotalStats().strength
  const def = defender.getTotalStats().defense

  const critChance = attacker.getTotalStats().critChance
  const critDamage = attacker.getTotalStats().critDamage

  let damage = Math.max(1, atk - def)

  // Crit (use seedable RNG)
  if (rng.random() * 100 < critChance) {
    damage *= critDamage
  }

  damage = Math.floor(damage)

  defender.hp -= damage

  // clamp HP to zero
  defender.hp = Math.max(0, defender.hp)

  return damage
}