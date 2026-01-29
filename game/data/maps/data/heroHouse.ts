import { GameMap } from "../mapTypes"
import { createNPC } from "../../../entities/NPC"
import { createItemEntity } from "../../../entities/ItemEntity"

export const testMap: GameMap = {
  id: "heroHouse",
  width: 8,
  height: 8,

  tiles: [
    [507,501,501,501,502],
    [506,11,12,13,503],
    [506,14,15,16,508,501,501,502],
    [506,14,15,22,12,12,13,503],
    [506,14,15,15,15,15,16,503],
    [506,14,15,15,15,15,16,503],
    [506,17,18,18,18,18,19,503],
    [505,501,501,1000,501,501,501,504],
  ],

  entities: [
    createNPC("npc1","Bob",2,1,"/assets/entities/npcs/npc.png",
      { type: "dialog",  dialogId: "npcGreeting" }
    ),
    createItemEntity("item1", "potion", 3, 2,"/assets/entities/items/potion_rouge.png", true),
    createItemEntity("item2", "crown_of_deadlord", 3, 3,"/assets/entities/items/item.png", true),
    createItemEntity("item3", "old_key", 4, 3,"/assets/entities/items/item.png", true),
    createItemEntity("item4", "great_potion", 4, 3,"/assets/entities/items/item.png", true),
    createItemEntity("item5", "ultima_potion", 4, 3,"/assets/entities/items/item.png", true),
    createItemEntity("item6", "test", 4, 3,"/assets/entities/items/item.png", true),
  ],
}