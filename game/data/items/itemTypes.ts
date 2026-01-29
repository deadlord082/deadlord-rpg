import { ItemRarity } from "./itemRarity"

export interface Item {
  id: string
  name: string
  description: string
  quantity: number
  image?: string
  rarity: ItemRarity
}
