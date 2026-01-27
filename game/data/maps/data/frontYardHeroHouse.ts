import { createNPC } from "@/game/entities/NPC"
import { GameMap } from "../mapTypes"

export const frontYardHeroHouseMap: GameMap = {
  id: "frontYardHeroHouse",
  width: 8,
  height: 5,
  tiles: [
    [500,500,1001,500,500,500,500,500],
    [500,1,6,1,3,5,1,500],
    [500,4,3,4,1,2,5,500],
    [500,2,1,2,4,1,3,500],
    [500,500,500,500,500,500,500,500],
  ],
  entities: [
      createNPC("npc2","john",1,1,"/assets/entities/npcs/npc.png",
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
      createNPC("npc3","jacob",4,1,"/assets/entities/npcs/npc.png",
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
        }
        
      ),
      createNPC("npc4","tristan",6,1,"/assets/entities/npcs/npc.png",
        {
          type: "sequence",
          events: [
            { type: "dialog", text: "You dare challenge me?" },
            { type: "fight", enemyId: "goblin_leader" },
            { type: "reward", items: ["gold_coin"], gold: 50 }
          ]
        }
      ),
      createNPC("npc5","pero",6,3,"/assets/entities/npcs/npc.png",
        {
          type: "sequence",
          events: [
            { type: "dialog", text: "Go inside?" },
            { type: "warp", targetMap: "heroHouse", x: 2, y: 3 }
          ]
        }
        
      ),
    ],
}