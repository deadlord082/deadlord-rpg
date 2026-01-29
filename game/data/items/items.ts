import { Item } from "./itemTypes"

export const Items: Record<string, Omit<Item, "quantity">> = {
  potion: {
    id: "potion",
    name: "Potion",
    description: "Restores a little HP.",
    image: "/assets/entities/items/potion_rouge.png",
    rarity: "uncommon",
  },

  great_potion: {
    id: "great_potion",
    name: "Great Potion",
    description: "Restores a lot of HP.",
    rarity: "rare",
  },

  ultima_potion: {
    id: "ultima_potion",
    name: "Ultima Potion",
    description: "Restores all HP.",
    rarity: "epic",
  },

  old_key: {
    id: "old_key",
    name: "Old Key",
    description: "Opens a locked door.",
    rarity: "common",
  },

  test: {
    id: "test",
    name: "test",
    description: "test",
    // image: "/assets/entities/items/item.png",
    rarity: "legendary",
  },

  crown_of_deadlord: {
    id: "crown_of_deadlord",
    name: "Crown of Deadlord",
    description: "Whispers forgotten names.",
    // image: "/assets/entities/items/item.png",
    rarity: "deadlordary",
  }
  
}