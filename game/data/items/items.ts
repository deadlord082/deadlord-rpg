import { Item } from "./itemTypes"

export const Items: Record<string, Omit<Item, "quantity">> = {
  potion: {
    id: "potion",
    name: "Potion",
    description: "Restores a little HP.",
  },

  key: {
    id: "key",
    name: "Old Key",
    description: "Opens a locked door.",
  },
}