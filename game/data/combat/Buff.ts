import { Stats } from "../../entities/Stats"

export type BuffType = "buff" | "debuff"

export type ModifierType = "flat" | "percent"

export interface StatModifier {
  stat: keyof Stats
  value: number
  type: ModifierType
}

export interface Buff {
  id: string
  name: string
  type: BuffType

  duration: number // in turns (0 = permanent)

  modifiers: StatModifier[]

  source?: string // "equipment", "skill", etc
}