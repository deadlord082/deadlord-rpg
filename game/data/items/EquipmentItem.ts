import { Item } from "./Item"

export type EquipmentSlot =
  | "head"
  | "chest"
  | "rightHand"
  | "leftHand"
  | "accessory1"
  | "accessory2"

export type MultiSlot =
  | "bothHands"
  | "bothAccessories"
  | "bothArmor"

export interface EquipmentStats {
  hp?: number
  strength?: number
  defense?: number
  speed?: number
  luck?: number
  charisma?: number
  critChance?: number
  critDamage?: number
}

export interface EquipmentItem extends Item {
  slot?: EquipmentSlot | EquipmentSlot[]
  multiSlot?: MultiSlot
  stats: EquipmentStats
}