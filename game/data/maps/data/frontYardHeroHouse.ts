import { createNPC } from "@/game/entities/NPC"
import { GameMap } from "../mapTypes"
import { createItemEntity } from "../../../entities/ItemEntity"

export const frontYardHeroHouseMap: GameMap = {
  id: "frontYardHeroHouse",
  width: 11,
  height: 10,
  tiles: [
    [511,512,508,1001,501,509,512,511],
    [513,1,5,6,3,5,1,514],
    [513,4,3,4,1,2,5,514],
    [513,2,1,2,4,1,3,514],
    [500,500,500,500,31,500,500,500],
    [500,500,500,500,32,500,500,500,500,500,500],
    [500,513,1,2,1,3,5,1,3,2,514],
    [500,513,4,3,4,1,2,5,4,1,514],
    [500,513,2,1,2,4,1,3,1,3,514],
    [500,515,515,515,515,515,515,515,515,515,515],
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
      createItemEntity("item2", "crown_of_deadlord", 3, 3,"/assets/entities/items/item.png", true),
    ],
}