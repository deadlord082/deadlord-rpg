import { GameMap } from "../mapTypes"
import { createItemEntity } from "../../../entities/ItemEntity"
import { NPCS } from "../../npcs/npcs"

export const nierTownMap: GameMap = {
  id: "nierTown",
  width: 33,
  height: 33,
  tiles: [
    ["wall_void","wall_void","wall_void","wall_forest_1","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","grass","grass","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_1","wall_void","wall_void","wall_void"],
    
    ["wall_void","wall_void","wall_forest_2","wall_forest_2","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_2","wall_forest_2","wall_void","wall_void"],
    
    ["wall_void","wall_forest_1","wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","tree","grass","grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4","wall_forest_1","wall_void"],

    ["wall_void","wall_forest_1","wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","tree","grass","grass","grass","wall_forest_4","wall_forest_1","wall_void"],

    ["wall_void","wall_forest_3","grass","grass","grass","grass","grass","tree","grass","grass","house_roof","house_roof","house_roof","house_roof","grass","grass","grass","tile_grass","grass","house_roof","house_roof","house_roof","house_roof","house_roof","grass","grass","grass","grass","grass","grass","wall_forest_4","wall_void"],

    ["wall_void","wall_forest_3","grass","grass","grass","grass","grass","grass","grass","house_roof","house_roof","house_roof","house_roof","house_roof","house_roof","grass","tile_grass","tile_grass","house_roof","house_roof","house_roof","house_roof","house_roof","house_roof","house_roof","grass","grass","grass","grass","grass","wall_forest_4","wall_void"],
    
    ["wall_forest_1","wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","house_wall","house_wall","house_wall","house_wall","grass","grass","tile_grass","tile_grass","grass","house_wall","house_wall","house_wall","house_wall","house_wall","grass","grass","grass","tree","grass","grass","wall_forest_4","wall_forest_1"],

    ["wall_forest_1","wall_forest_3","grass","grass","tree","grass","grass","grass","grass","grass","house_wall","house_wall","house_door","house_wall","grass","grass","tile_grass","tile_grass","grass","house_wall","house_door","house_wall","house_wall","house_wall","grass","grass","grass","grass","grass","grass","wall_forest_4","wall_forest_1"],
    
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],

    ["wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","fence_v","fence_h","fence_h","fence_h","fence_h","fence_h","fence_h","fence_v","grass","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],

    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","grass","fence_v","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","grass","fence_v","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],

    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","grass","fence_v","grass","tile_grass","tile_grass","tile_grass","well","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","grass","fence_v","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4"],

    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","grass","fence_v","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","grass","fence_v","grass","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","tile_grass","grass","tile_grass","grass","grass","wall_forest_4"],

    ["wall_forest_3","grass","tree","fence_v","grass","grass","grass","grass","grass","grass","fence_v","grass","grass","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","tile_grass","grass","tile_grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","house_roof","house_roof","house_roof","house_roof","house_roof","grass","grass","tile_grass","tile_grass","grass","house_roof","house_roof","house_roof","house_roof","house_roof","grass","grass","grass","grass","tile_grass","grass","grass","wall_forest_4"],

    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","house_roof","house_roof","house_roof","house_roof","house_roof","house_roof","house_roof","grass","tile_grass","tile_grass","house_roof","house_roof","house_roof","house_roof","house_roof","house_roof","house_roof","grass","grass","grass","grass","tile_grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","house_roof","house_roof","house_wall","house_wall","house_wall","grass","grass","tile_grass","tile_grass","grass","house_wall","house_wall","house_wall","house_wall","house_wall","grass","grass","grass","grass","tile_grass","grass","grass","wall_forest_4"],

    ["wall_forest_3","grass","grass","fence_v","grass","grass","grass","grass","grass","house_roof","house_roof","house_wall","house_door","house_wall","grass","grass","tile_grass","tile_grass","grass","house_wall","house_wall","house_door","house_wall","house_wall","grass","grass","grass","grass","grass","tile_grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","fence_v","fence_h","fence_h","fence_h","fence_h","fence_h","house_wall","house_wall","grass","grass","grass","grass","grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","nier_town_out_right"],

    ["wall_forest_3","grass","grass","grass","grass","grass","grass","grass","grass","house_wall","house_wall","grass","grass","grass","grass","grass","tile_grass","grass","grass","tree","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","tile_grass","nier_town_out_right"],
    
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","tree","grass","grass","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","tree","grass","wall_forest_4"],

    ["wall_forest_3","wall_forest_1","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","tile_grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_4","wall_forest_1"],
   
    ["wall_forest_1","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","grass","grass","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_1","wall_forest_1"]
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