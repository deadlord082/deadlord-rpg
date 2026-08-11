import { GameMap } from "../../mapTypes"
import { createItemEntity } from "../../../../entities/ItemEntity"
import { NPCS } from "../../../npcs/npcs"
import { createChest } from "@/game/entities/ChestEntity"

export const merchantHouse: GameMap = {
  id: "merchantHouse",
  width: 8,
  height: 8,

  tiles: [
    ["wall_stone_7","wall_stone_1","wall_stone_1","wall_stone_1","wall_stone_1","wall_stone_1","wall_stone_2"],
    ["wall_stone_6","stone_ground_1","stone_ground_2","stone_ground_2","stone_ground_2","stone_ground_3","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_6","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_6","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_6","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_6","wall_stone_3"],
    ["wall_stone_6","stone_ground_4","stone_ground_5","stone_ground_5","stone_ground_5","stone_ground_6","wall_stone_3"],
    ["wall_stone_5","wall_stone_1","wall_stone_1","nier_town_door_out_2","wall_stone_1","wall_stone_1","wall_stone_4"],
  ],

  entities: [
    NPCS.merchant,
  ],
}