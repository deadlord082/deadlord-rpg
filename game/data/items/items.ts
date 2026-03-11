import { Item } from "./Item"
import { EquipmentItem } from "./EquipmentItem"

// Items record supports either regular Item or EquipmentItem
export const Items: Record<string, Omit<Item, "quantity"> | Omit<EquipmentItem, "quantity">> = {
  potion: {
    id: "potion",
    name: "Potion",
    description: "Restores a little HP.",
    image: "/assets/entities/items/potion_rouge.png",
    rarity: "uncommon",
    effects: [
      { type: "heal", amount: 25, target: "self" }
    ],
  },

  great_potion: {
    id: "great_potion",
    name: "Great Potion",
    description: "Restores a lot of HP.",
    rarity: "rare",
    effects: [
      { type: "heal", amount: 75, target: "self" }
    ],
  },

  ultima_potion: {
    id: "ultima_potion",
    name: "Ultima Potion",
    description: "Restores all HP.",
    rarity: "epic",
    effects: [
      { type: "heal", percent: true, amount: 100, target: "self" }
    ],
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
    rarity: "legendary",
  },

  bomb: {
    id: "bomb",
    name: "Bomb",
    description: "Deals damage to a single enemy.",
    rarity: "uncommon",
    effects: [ { type: "damage", amount: 40, target: "enemy" } ],
  },

  smoke_bomb: {
    id: "smoke_bomb",
    name: "Smoke Bomb",
    description: "Lowers enemy defense for a few turns.",
    rarity: "rare",
    effects: [ { type: "debuff", duration: 3, stats: [ { stat: "defense", value: -2, type: "flat" } ], target: "enemy" } ],
  },

  tonic: {
    id: "tonic",
    name: "Tonic",
    description: "Increases player's strength for a few turns.",
    rarity: "uncommon",
    effects: [ { type: "buff", duration: 3, stats: [ { stat: "strength", value: 3, type: "flat" } ], target: "self" } ],
  },

  crown_of_deadlord: {
    id: "crown_of_deadlord",
    name: "Crown of Deadlord",
    description: "Whispers forgotten names.",
    image: "/assets/entities/items/crown_of_deadlord.png",
    rarity: "deadlordary",
    slot: "head",
    stats: { strength: 5, defense: 10, charisma: 20 },
  },

  // 
  // Equipment items
  // 

  iron_sword: {
    id: "iron_sword",
    name: "Iron Sword",
    description: "A sturdy iron sword.",
    image: "/assets/entities/items/iron_sword.png",
    rarity: "common",
    slot: "rightHand",
    stats: { strength: 5 },
  },

  iron_shield: {
    id: "iron_shield",
    name: "Iron Shield",
    description: "A sturdy iron shield.",
    image: "/assets/entities/items/iron_shield.png",
    rarity: "common",
    slot: "leftHand",
    stats: { defense: 2 },
  },

  iron_mace: {
    id: "iron_mace",
    name: "Iron Mace",
    description: "A sturdy iron mace.",
    image: "/assets/entities/items/iron_mace.png",
    rarity: "common",
    multiSlot: "bothHands",
    stats: { strength: 7 },
  },

  iron_chest_plate: {
    id: "iron_chest_plate",
    name: "Iron Chest Plate",
    description: "A sturdy iron chest plate.",
    image: "/assets/entities/items/iron_chest_plate.png",
    rarity: "common",
    slot: "chest",
    stats: { defense: 3 },
  },

  iron_helmet: {
    id: "iron_helmet",
    name: "Iron Helmet",
    description: "A sturdy iron helmet.",
    image: "/assets/entities/items/iron_helmet.png",
    rarity: "common",
    slot: "head",
    stats: { defense: 2 },
  },

  iron_ring: {
    id: "iron_ring",
    name: "Iron Ring",
    description: "A sturdy iron ring.",
    image: "/assets/entities/items/iron_ring.png",
    rarity: "common",
    slot: ["accessory1", "accessory2"],
    stats: { charisma: 1 },
  },

  ring_of_power: {
    id: "ring_of_power",
    name: "Ring of Power",
    description: "Boosts strength",
    rarity: "epic",
    slot: ["accessory1", "accessory2"],
    stats: { strength: 5 },
  },

  stone_sword: {
    id: "stone_sword",
    name: "Stone Sword",
    description: "A sturdy stone sword.",
    image: "/assets/entities/items/stone_sword.png",
    rarity: "common",
    slot: "rightHand",
    stats: { strength: 5 },
  },

  wooden_shield: {
    id: "wooden_shield",
    name: "Wooden Shield",
    description: "A sturdy wooden shield.",
    image: "/assets/entities/items/wooden_shield.png",
    rarity: "common",
    slot: "leftHand",
    stats: { defense: 2 },
  },

  stone_mace: {
    id: "stone_mace",
    name: "Stone Mace",
    description: "A sturdy stone mace.",
    image: "/assets/entities/items/stone_mace.png",
    rarity: "common",
    multiSlot: "bothHands",
    stats: { strength: 7 },
  },

  leather_chest_plate: {
    id: "leather_chest_plate",
    name: "Leather Chest Plate",
    description: "A sturdy leather chest plate.",
    image: "/assets/entities/items/leather_chest_plate.png",
    rarity: "common",
    slot: "chest",
    stats: { defense: 2 },
  },

  leather_helmet: {
    id: "leather_helmet",
    name: "Leather Helmet",
    description: "A sturdy leather helmet.",
    image: "/assets/entities/items/leather_helmet.png",
    rarity: "common",
    slot: "head",
    stats: { defense: 1 },
  },

  gold_ring: {
    id: "gold_ring",
    name: "Gold Ring",
    description: "A sturdy gold ring.",
    image: "/assets/entities/items/gold_ring.png",
    rarity: "common",
    slot: ["accessory1", "accessory2"],
    stats: { charisma: 2 },
  },
}