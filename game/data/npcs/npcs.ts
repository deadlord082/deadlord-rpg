import { createNPC } from "@/game/entities/NPC"
import { Direction } from "@/game/utils/direction"

// NPC tests sprites
const NPC_SPRITES = {
  down: "/assets/entities/npcs/down.png",
  left: "/assets/entities/npcs/left.png",
  right: "/assets/entities/npcs/right.png",
  up: "/assets/entities/npcs/up.png",
}

// NPC definitions
export const NPCS = {
  dev: createNPC(
    "dev",
    "DEV",
    6, 6,
    NPC_SPRITES,
    {
      type: "reward", gold: 500, xp: 200
    },
    Direction.Right
  ),

  // ------------
  // Villagers
  // ------------
  bob: createNPC(
    "bob",
    "Bob",
    2, 1,
    NPC_SPRITES,
    { type: "dialog", dialogId: "npcBob" }
  ),

  jason: createNPC(
    "jason",
    "Jason",
    1, 5,
    NPC_SPRITES,
    { type: "dialog", dialogId: "npcJason" }
  ),
    
  john: createNPC(
    "john",
    "John",
    1, 1,
    NPC_SPRITES,
    {
      type: "sequence",
      events: [
        { type: "dialog", text: "Do you want to help me ?" },
        {
          type: "choice",
          text: "help john ?",
          choices: [
            {
              label: "Yes",
              event: { 
                type: "sequence",
                events: [
                  { type: "dialog", text: "Thanks ! Here, take this potion as a reward." },
                  { type: "reward", items: ["potion"] },
                  { type: "removeEntity", entityId: "john"}
                ]
              }
            },
            {
              label: "No",
              event: { 
                type: "sequence",
                events: [
                  { type: "dialog", text: "Oh… okay."},
                  { type: "removeEntity", entityId: "john"}
                ]
              }
            }
          ]
        }
      ]
    }
  ),
  john2: createNPC(
    "john2",
    "John2",
    1, 2,
    NPC_SPRITES,
    {
      type: "requireItem",
      itemId: "potion",
      consume: true,
      prompt: "Give John a potion ?",
      success: { type: "dialog", text: "Thanks for the potion!" },
      fail: { type: "dialog", text: "You don't have a potion." }
    }
  ),
  john3: createNPC(
    "john3",
    "John3",
    1, 3,
    NPC_SPRITES,
    {
      type: "giveItem",
      itemId: "potion",
      consume: true,
      success: { type: "dialog", text: "Thanks for the potion!" },
      fail: { type: "dialog", text: "You don't have a potion." }
    }
  ),

  jacob: createNPC(
    "jacob",
    "Jacob",
    4, 1,
    NPC_SPRITES,
    {
      type: "sequence",
      events: [
        { type: "dialog", text: "Take a look at my wares!" },
        {
          type: "merchant",
          inventory: [
            { itemId: "potion", price: 10, stock: null },
            { itemId: "great_potion", price: 25, stock: 5 },
            { itemId: "ultima_potion", price: 100, stock: 1 },
            { itemId: "old_key", price: 50, stock: 1 },
            { itemId: "iron_sword", price: 50, stock: 1 },
            { itemId: "iron_shield", price: 50, stock: 1 },
            { itemId: "iron_mace", price: 50, stock: 1 },
            { itemId: "iron_chest_plate", price: 50, stock: 1 },
            { itemId: "iron_helmet", price: 50, stock: 1 },
            { itemId: "iron_ring", price: 50, stock: 1 },
            { itemId: "stone_sword", price: 20, stock: 1 },
            { itemId: "wooden_shield", price: 20, stock: 1 },
            { itemId: "stone_mace", price: 20, stock: 1 },
            { itemId: "leather_chest_plate", price: 20, stock: 1 },
            { itemId: "leather_helmet", price: 20, stock: 1 },
            { itemId: "gold_ring", price: 100, stock: 1 },
          ]
        },
        { type: "dialog", text: "Come again!" }
      ]
    },
    Direction.Left
  ),

  pero: createNPC(
    "pero",
    "Pero",
    6, 3,
    NPC_SPRITES,
    {
      type: "sequence",
      events: [
        { type: "dialog", text: "Go inside?" },
        { type: "warp", targetMap: "heroHouse", x: 2, y: 3 }
      ]
    },
    Direction.Up
  ),

  // ------------
  // Enemies
  // ------------
  
  slime: createNPC(
    "slime",
    "Slime",
    2, 6,
    NPC_SPRITES,
    {
      type: "sequence",
      events: [
        { type: "fight", enemyId: "slime" },
        { type: "dialog", text: "You defeated the slime!" },
        { type: "removeEntity", entityId: "slime"}
      ]
    },
    Direction.Up
  ),

  goblin_leader: createNPC(
    "goblin_leader",
    "Goblin Leader",
    6, 1,
    NPC_SPRITES,
    {
      type: "sequence",
      events: [
        { type: "fight", enemyId: "goblin_leader" },
        { type: "dialog", text: "You defeated the goblin Leader !" },
        { type: "removeEntity", entityId: "goblin_leader"}
      ]
    },
    Direction.Right
  ),

  double_monster: createNPC(
    "double_monster",
    "Double Monster",
    5, 1,
    NPC_SPRITES,
    {
      type: "sequence",
      events: [
        { type: "fight", enemyIds: ["goblin_leader", "slime"] },
        { type: "dialog", text: "You defeated all the monsters!" },
        { type: "removeEntity", entityId: "double_monster"}
      ]
    },
    Direction.Left
  ),
}
