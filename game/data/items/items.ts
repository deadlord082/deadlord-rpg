import { Item } from "./Item"
import { EquipmentItem } from "./EquipmentItem"

// Items record supports either regular Item or EquipmentItem
export const Items: Record<string, Omit<Item, "quantity"> | Omit<EquipmentItem, "quantity">> = {
  // -----------
  // Healing Items
  // -----------
  potion: {
    id: "potion",
    name: "Potion",
    description: "Restores a little HP.",
    image: "/assets/entities/items/potion_rouge.png",
    rarity: "common",
    effects: [
      { type: "heal", amount: 25, target: "self" }
    ],
  },
  great_potion: {
    id: "great_potion",
    name: "Great Potion",
    description: "Restores a lot of HP.",
    rarity: "uncommon",
    effects: [
      { type: "heal", amount: 75, target: "self" }
    ],
  },
  ultima_potion: {
    id: "ultima_potion",
    name: "Ultima Potion",
    description: "Restores all HP.",
    rarity: "rare",
    effects: [
      { type: "heal", percent: true, amount: 100, target: "self" }
    ],
  },

  // -----------
  // Offensive/Utility items
  // -----------
  bomb: {
    id: "bomb",
    name: "Bomb",
    description: "Deals damage to a single enemy.",
    rarity: "common",
    effects: [ { type: "damage", amount: 30, target: "enemy" } ],
  },
  smoke_bomb: {
    id: "smoke_bomb",
    name: "Smoke Bomb",
    description: "Lowers enemy defense for a few turns.",
    rarity: "common",
    effects: [ { type: "debuff", duration: 3, stats: [ { stat: "defense", value: -5, type: "flat" } ], target: "enemy" } ],
  },
  tonic: {
    id: "tonic",
    name: "Tonic",
    description: "Increases player's strength for a few turns.",
    rarity: "common",
    effects: [ { type: "buff", duration: 3, stats: [ { stat: "strength", value: 5, type: "flat" } ], target: "self" } ],
  },
  
  // -----------
  // Normal items
  // -----------
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

  // -----------------
  // Equipment items
  // -----------------

  // Head items
  crown_of_deadlord: {
    id: "crown_of_deadlord",
    name: "Crown of Deadlord",
    description: "Whispers forgotten names.",
    image: "/assets/entities/items/crown_of_deadlord.png",
    rarity: "deadlordary",
    slot: "head",
    stats: { strength: 5, defense: 15, charisma: 20 },
  },
  steel_helmet: {
    id: "steel_helmet",
    name: "Steel Helmet",
    description: "A sturdy steel helmet.",
    image: "/assets/entities/items/steel_helmet.png",
    rarity: "common",
    slot: "head",
    stats: { defense: 4 },
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
  leather_helmet: {
    id: "leather_helmet",
    name: "Leather Helmet",
    description: "A sturdy leather helmet.",
    image: "/assets/entities/items/leather_helmet.png",
    rarity: "common",
    slot: "head",
    stats: { defense: 1 },
  },

  // Chest plate items
  steel_chest_plate: {
    id: "steel_chest_plate",
    name: "Steel Chest Plate",
    description: "A sturdy steel chest plate.",
    image: "/assets/entities/items/steel_chest_plate.png",
    rarity: "common",
    slot: "chest",
    stats: { defense: 6 },
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
  leather_chest_plate: {
    id: "leather_chest_plate",
    name: "Leather Chest Plate",
    description: "A sturdy leather chest plate.",
    image: "/assets/entities/items/leather_chest_plate.png",
    rarity: "common",
    slot: "chest",
    stats: { defense: 2 },
  },

  // Right hand items
  death_sword: {
    id: "death_sword",
    name: "Death Sword",
    description: "A cursed sword that has been sealed away for centuries.",
    image: "/assets/entities/items/death_sword.png",
    rarity: "deadlordary",
    slot: "rightHand",
    stats: { strength: 25, charisma: 20 },
  },
  steel_sword: {
    id: "steel_sword",
    name: "Steel Sword",
    description: "A sturdy steel sword.",
    image: "/assets/entities/items/steel_sword.png",
    rarity: "common",
    slot: "rightHand",
    stats: { strength: 10 },
  },
  iron_sword: {
    id: "iron_sword",
    name: "Iron Sword",
    description: "A sturdy iron sword.",
    image: "/assets/entities/items/iron_sword.png",
    rarity: "common",
    slot: "rightHand",
    stats: { strength: 6 },
  },
  stone_sword: {
    id: "stone_sword",
    name: "Stone Sword",
    description: "A sturdy stone sword.",
    image: "/assets/entities/items/stone_sword.png",
    rarity: "common",
    slot: "rightHand",
    stats: { strength: 4 },
  },
  wooden_sword: {
    id: "wooden_sword",
    name: "Wooden Sword",
    description: "you're trustwhorthy wooden sword.",
    image: "/assets/entities/items/wooden_sword.png",
    rarity: "common",
    slot: "rightHand",
    stats: { strength: 2 },
  },

  // Left hand items
  steel_shield: {
    id: "steel_shield",
    name: "Steel Shield",
    description: "A sturdy steel shield.",
    image: "/assets/entities/items/steel_shield.png",
    rarity: "common",
    slot: "leftHand",
    stats: { defense: 6 },
  },
  iron_shield: {
    id: "iron_shield",
    name: "Iron Shield",
    description: "A sturdy iron shield.",
    image: "/assets/entities/items/iron_shield.png",
    rarity: "common",
    slot: "leftHand",
    stats: { defense: 4 },
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

  // Both hand items
  stone_mace: {
    id: "stone_mace",
    name: "Stone Mace",
    description: "A sturdy stone mace.",
    image: "/assets/entities/items/stone_mace.png",
    rarity: "common",
    multiSlot: "bothHands",
    stats: { strength: 7 },
  },
  iron_mace: {
    id: "iron_mace",
    name: "Iron Mace",
    description: "A sturdy iron mace.",
    image: "/assets/entities/items/iron_mace.png",
    rarity: "common",
    multiSlot: "bothHands",
    stats: { strength: 11 },
  },
  steel_mace: {
    id: "steel_mace",
    name: "Steel Mace",
    description: "A sturdy steel mace.",
    image: "/assets/entities/items/steel_mace.png",
    rarity: "common",
    multiSlot: "bothHands",
    stats: { strength: 16 },
  },

  // Accessory items
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
    stats: { strength: 8, charisma: 5 , defense: 2},
  },
  gold_ring: {
    id: "gold_ring",
    name: "Gold Ring",
    description: "A sturdy gold ring.",
    image: "/assets/entities/items/gold_ring.png",
    rarity: "common",
    slot: ["accessory1", "accessory2"],
    stats: { charisma: 2 , defense: 1 },
  },
  ornate_ring: {
    id: "ornate_ring",
    name: "Ornate Ring",
    description: "A sturdy ornate ring.",
    image: "/assets/entities/items/ornate_ring.png",
    rarity: "common",
    slot: ["accessory1", "accessory2"],
    stats: { charisma: 4 , defense: 2 },
  },
}