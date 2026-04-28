import { GameMap } from "../mapTypes"
import { createItemEntity } from "../../../entities/ItemEntity"
import { NPCS } from "../../npcs/npcs"

export const frontYardHeroHouseMap: GameMap = {
  id: "frontYardHeroHouse",
  width: 11,
  height: 10,
  tiles: [
    ["wall_forest_1","wall_forest_2","wall_stone_8","door_hero_house_in","wall_stone_1","wall_stone_9","wall_forest_2","wall_forest_1"],
    ["wall_forest_3","grass","grass","tile_grass_1","grass","grass","grass","wall_forest_4"],
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    ["wall_rocky_1","wall_rocky_1","wall_rocky_1","wall_rocky_1","stone_stairs_1","wall_rocky_1","wall_rocky_1","wall_rocky_1"],
    ["wall_rocky_1","wall_rocky_1","wall_rocky_1","wall_rocky_1","stone_stairs_2","wall_rocky_1","wall_rocky_1","wall_rocky_1","wall_forest_2","wall_forest_2","wall_forest_2"],
    ["wall_void","wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    ["wall_void","nier_town_in_right","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    ["wall_void","nier_town_in_right","grass","grass","grass","grass","grass","grass","grass","death_sword_shrine_in","wall_forest_4"],
    ["wall_void","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5"],
  ],
  entities: [
      NPCS.john,
      NPCS.john2,
      NPCS.john3,
      NPCS.merchant,
      NPCS.blacksmith_t1,
      NPCS.goblin_leader,
      NPCS.slime,
      NPCS.double_monster,
      NPCS.pero,
    ],
}