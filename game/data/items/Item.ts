import type { ItemRarity } from "./ItemRarity"

export type EffectTarget = "self" | "enemy" | "allEnemies"

export type ModifierType = "flat" | "percent"

export type StatKey = "hp" | "strength" | "defense" | "speed" | "luck" | "charisma" | "critChance" | "critDamage"

export interface StatChange {
  stat: StatKey
  value: number
  type?: ModifierType
}

export interface ItemEffect {
  type: "heal" | "damage" | "buff" | "debuff"
  amount?: number // absolute amount
  percent?: boolean // if true, amount is percent of maxHp for heal
  stats?: StatChange[] // for buff/debuff
  duration?: number // turns for buff/debuff
  target?: EffectTarget
}

export interface Item {
  id: string
  name: string
  description: string
  quantity: number
  image?: string
  rarity: ItemRarity
  effects?: ItemEffect[]
}
