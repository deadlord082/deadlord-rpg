import { CombatEntity } from "../entities/CombatEntity"
import { rng } from "../utils/rng"

export function basicAttack(attacker: CombatEntity, defender: CombatEntity) {
  const atk = attacker.getTotalStats().strength
  const def = defender.getTotalStats().defense

  const critChance = attacker.getTotalStats().critChance
  const critDamage = attacker.getTotalStats().critDamage

  let damage = Math.max(1, atk - def)

  // Crit (use seedable RNG)
  const isCrit = rng.random() * 100 < critChance
  if (isCrit) {
    // small random scaling to crit multiplier
    const critScale = 0.9 + rng.random() * 0.2 // 0.9 - 1.1
    damage *= critDamage * critScale
  }

  // apply small variance to damage (+/-10%) to avoid identical hits
  const variance = 0.9 + rng.random() * 0.2 // 0.9 - 1.1
  damage = Math.floor(damage * variance)

  defender.hp -= damage
  // clamp HP to zero
  defender.hp = Math.max(0, defender.hp)

  return damage
}