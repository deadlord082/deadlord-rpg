import { Item } from "../data/items/Item"
import { Direction } from "../utils/direction"
import { EquipmentItem, EquipmentSlot } from "../data/items/EquipmentItem"
import { createCombatEntity, CombatEntity } from "./CombatEntity"
import { Stats } from "./Stats"

export interface Player extends CombatEntity {
  inventory: Item[]

  level: number
  xp: number
  xpToNextLevel: number

  gold: number

  equipment: Partial<Record<EquipmentSlot, EquipmentItem>>

  equip: (slot: EquipmentSlot, item: EquipmentItem) => void
  unequip: (slot: EquipmentSlot) => void
}

export function createPlayer(x: number, y: number): Player {

  const baseStats: Stats = {
    strength: 10,
    defense: 5,
    speed: 5,
    luck: 3,
    charisma: 2,
    critChance: 5,
    critDamage: 1.5,
  }

  const baseEntity = {
    id: "player",
    x,
    y,
    blocking: true,
    direction: Direction.Down,

    sprites: {
      [Direction.Up]: "/assets/entities/players/up.png",
      [Direction.Down]: "/assets/entities/players/down.png",
      [Direction.Left]: "/assets/entities/players/left.png",
      [Direction.Right]: "/assets/entities/players/right.png",
    },
  }

  const player = createCombatEntity(baseEntity, baseStats, 100) as Player

  player.inventory = []
  player.level = 1
  player.xp = 0
  player.xpToNextLevel = 100
  player.gold = 50

  player.equipment = {
    head: undefined,
    chest: undefined,
    rightHand: undefined,
    leftHand: undefined,
    accessory1: undefined,
    accessory2: undefined,
  }

  player.equip = function(slot, item) {
    const allowedSlots = Array.isArray(item.slot)
      ? item.slot
      : [item.slot]

    if (!allowedSlots.includes(slot)) return

    const current = this.equipment[slot]

    if (current?.id === item.id) {
      this.unequip(slot)
      return
    }

    if (current) this.inventory.push(current)

    this.equipment[slot] = item
    // Remove by id to avoid reference equality issues (deserialization, clones)
    this.inventory = this.inventory.filter(i => i.id !== item.id)

    this._eventBus?.emit("uiUpdate")
  }

  player.unequip = function(slot) {
    const equipped = this.equipment[slot]
    if (!equipped) return

    this.inventory.push(equipped)
    this.equipment[slot] = undefined
    this._eventBus?.emit("uiUpdate")
  }

  const originalGetTotalStats = player.getTotalStats.bind(player)

  player.getTotalStats = function () {
    const total = originalGetTotalStats()

    // Apply equipment flat stats
    for (const slot in this.equipment) {
      const item = this.equipment[slot as EquipmentSlot]
      if (!item) continue

      for (const key in item.stats) {
        const statKey = key as keyof Stats
        const value = item.stats[statKey]
        if (value) {
          total[statKey] += value
        }
      }
    }
    return total
  }

  return player
}