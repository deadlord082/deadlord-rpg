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
    [506,14,15,16,500,501,501,502],
    [506,14,15,22,15,15,16,503],
    [506,14,15,15,15,15,16,503],
    [506,14,15,15,15,15,16,503],
    [506,17,18,18,18,18,19,503],
    [505,501,501,1000,501,501,501,504],
  ],

  entities: [
    createNPC("npc1","Bob",2,1,"/assets/entities/npcs/npc.png",
      { type: "dialog",  dialogId: "npcGreeting" }
    ),
    createItemEntity("item1", "potion", 3, 2,"/assets/entities/items/item.png", true),
  ],
}