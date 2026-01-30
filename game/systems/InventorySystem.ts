import { Player } from "../entities/Player"
import { Items } from "../data/items/items"

export const InventorySystem = {
  addItem(player: Player, itemId: string, quantity = 1) {
    const baseItem = Items[itemId]
    if (!baseItem) {
      console.warn(`Unknown item id: ${itemId}`)
      return
    }

    const existing = player.inventory.find(i => i.id === itemId)

    if (existing) {
      existing.quantity += quantity
    } else {
      player.inventory.push({
        ...baseItem,
        quantity,
      })
    }
  },
}
