import { GameMap } from "../mapTypes"
import { createItemEntity } from "../../../entities/ItemEntity"
import { NPCS } from "../../npcs/npcs"

export const deathSwordShrine: GameMap = {
  id: "deathSwordShrine",
  width: 9,
  height: 22,
  tiles: [
    ["wall_void","wall_void","wall_void","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_void","wall_void","wall_void"],
    ["wall_void","wall_void","wall_forest_2","wall_forest_3","grass","grass","grass","wall_forest_4","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_forest_2","wall_forest_3","grass","grass","grass","grass","grass","wall_forest_4","wall_forest_4","wall_void"],
    ["wall_forest_2","wall_forest_3","grass","grass","grass","grass","grass","grass","grass","wall_forest_4","wall_forest_4"],
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    ["wall_forest_2","wall_forest_3","grass","grass","grass","grass","grass","grass","grass","wall_forest_4","wall_forest_4"],
    ["wall_void","wall_forest_3","wall_forest_2","grass","grass","grass","grass","grass","wall_forest_4","wall_forest_4","wall_void"],
    ["wall_void","wall_void","wall_forest_3","wall_forest_2","grass","grass","grass","wall_forest_2","wall_forest_4","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_2","grass","grass","grass","wall_forest_2","wall_void","wall_void"],
    ["wall_void","wall_void","wall_void","wall_forest_3","death_sword_shrine_out","death_sword_shrine_out","death_sword_shrine_out","wall_forest_4","wall_void","wall_void"],
  ],
  entities: [
      NPCS.death_sword
    ],
}