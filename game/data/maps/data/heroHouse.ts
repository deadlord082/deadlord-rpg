import { GameMap } from "../mapTypes"
import { createItemEntity } from "../../../entities/ItemEntity"
import { NPCS } from "../../npcs/npcs"
import { createChest } from "@/game/entities/ChestEntity"

export const testMap: GameMap = {
  id: "heroHouse",
  width: 8,
  height: 8,

  tiles: [
    ["wall_stone_7","wall_stone_1","wall_stone_1","wall_stone_1","wall_stone_2"],
    ["wall_stone_6","stone_ground_1","stone_ground_2","stone_ground_3","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_6","wall_stone_8","wall_stone_1","wall_stone_1","wall_stone_2"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_12","stone_ground_2","stone_ground_2","stone_ground_3","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_6","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_6","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_6","wall_stone_3"],
    ["wall_stone_5","wall_stone_1","wall_stone_1","door_wood_stone_in","wall_stone_1","wall_stone_1","wall_stone_1","wall_stone_4"],
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