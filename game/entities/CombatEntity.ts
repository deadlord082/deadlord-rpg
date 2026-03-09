import { Entity } from "./Entity"
import { Stats } from "./Stats"
import { Buff } from "../data/combat/Buff"

export interface CombatEntity extends Entity {
  hp: number
  maxHp: number

  stats: Stats
  buffs: Buff[]

  addBuff: (buff: Buff) => void
  removeBuff: (buffId: string) => void
  tickBuffs: () => void
  getTotalStats: () => Stats
}

export function createCombatEntity<T extends Entity>(base: T, stats: Stats, maxHp: number): CombatEntity & T {
  const entity: CombatEntity & T = {
    ...base,

    hp: maxHp,
    maxHp,

    stats,
    buffs: [],

    addBuff(buff) {
      const existing = this.buffs.find(b => b.id === buff.id)
      if (existing) {
        existing.duration = buff.duration
      } else {
        this.buffs.push({ ...buff })
      }
      this._eventBus?.emit("uiUpdate")
    },

    removeBuff(buffId) {
      this.buffs = this.buffs.filter(b => b.id !== buffId)
      this._eventBus?.emit("uiUpdate")
    },

    tickBuffs() {
      this.buffs.forEach(b => {
        if (b.duration > 0) b.duration--
      })

      this.buffs = this.buffs.filter(b => b.duration !== 0)
    },

    getTotalStats() {
      const total: Stats = { ...this.stats }

      // flat first
      this.buffs.forEach(buff => {
        buff.modifiers.forEach(mod => {
          if (mod.type === "flat") {
            total[mod.stat] += mod.value
          }
        })
      })

      // percent second
      this.buffs.forEach(buff => {
        buff.modifiers.forEach(mod => {
          if (mod.type === "percent") {
            total[mod.stat] += total[mod.stat] * mod.value
          }
        })
      })

      return total
    }
  }

  return entity
}