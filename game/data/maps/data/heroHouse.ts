import { GameMap } from "../mapTypes"
import { createNPC } from "../../../entities/NPC"
import { createItemEntity } from "../../../entities/ItemEntity"

export const testMap: GameMap = {
  id: "heroHouse",
  width: 5,
  height: 5,

  tiles: [
    [501,503,503,503,505],
    [501,0,0,0,505],
    [501,0,0,0,505],
    [501,0,0,0,505],
    [500,500,1000,500,500],
  ],

  entities: [
    createNPC("npc1","Bob",2,1,"/assets/entities/npcs/npc.png",
      { type: "dialog", text: "Hello! Welcome to my house." }
    ),
    createItemEntity("item1", "potion", 3, 2,"/assets/entities/items/item.png", true),
  ],
}