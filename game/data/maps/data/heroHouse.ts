import { GameMap } from "../mapTypes"
import { createItemEntity } from "../../../entities/ItemEntity"
import { NPCS } from "../../npcs/npcs"
import { createChest } from "@/game/entities/ChestEntity"

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
    [506,14,15,15,15,15,16,503],
    [505,501,501,1000,501,501,501,504],
  ],

  entities: [
    NPCS.bob,
    createChest(
      "chest1",
      1,
      1,
      {
        closed: "/assets/entities/chests/chest_close.png",
        opened: "/assets/entities/chests/chest_open.png",
      },
      {
        type: "reward",
        items: ["potion", "gold_coin"],
        gold: 25,
      }
    ),    
    createItemEntity("item1", "potion", 3, 2, true),
    createItemEntity("item2", "crown_of_deadlord", 3, 3, true),
    createItemEntity("item3", "old_key", 4, 3, true),
    createItemEntity("item4", "great_potion", 4, 3, true),
    createItemEntity("item5", "ultima_potion", 4, 3, true),
    createItemEntity("item6", "test", 4, 3, true),
  ],
}