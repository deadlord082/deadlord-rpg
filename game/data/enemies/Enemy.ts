import { Stats } from "@/game/entities/Stats"

export interface Enemy {
    id: string
    name: string
    image?: string
    maxHp: number
    fleeChance?: number
    stats: Stats
    goldReward: number
    xpReward: number
  }