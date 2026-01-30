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
    bob: createNPC(
        "npc1",
        "Bob",
        2, 1,
        NPC_SPRITES,
        { type: "dialog", dialogId: "npcGreeting" }
      ),
  john: createNPC(
    "npc2",
    "John",
    1, 1,
    NPC_SPRITES,
    {
      type: "choice",
      text: "Do you want to help me?",
      choices: [
        {
          label: "Yes",
          event: { type: "dialog", text: "Thank you!" }
        },
        {
          label: "No",
          event: { type: "dialog", text: "Oh… okay." }
        }
      ]
    }
  ),

  jacob: createNPC(
    "npc3",
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
            { itemId: "potion", price: 10 }
          ]
        },
        { type: "dialog", text: "Come again!" }
      ]
    },
    Direction.Left
  ),

  tristan: createNPC(
    "npc4",
    "Tristan",
    6, 1,
    NPC_SPRITES,
    {
      type: "sequence",
      events: [
        { type: "dialog", text: "You killed the goblin" },
        // { type: "fight", enemyId: "goblin_leader" },
        { type: "reward", items: ["gold_coin"], gold: 50 }
      ]
    },
    Direction.Right
  ),

  pero: createNPC(
    "npc5",
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
}
