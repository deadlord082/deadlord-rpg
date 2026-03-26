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
  // If true, this enemy will respawn when leaving/returning to the map
  // and will not be recorded as a persistent removal in saves.
  respawn?: boolean
}