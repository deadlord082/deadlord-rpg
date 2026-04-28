import { GameMap } from "../mapTypes"
import { createItemEntity } from "../../../entities/ItemEntity"
import { NPCS } from "../../npcs/npcs"

export const nierTownMap: GameMap = {
  id: "nierTown",
  width: 40,
  height: 43,
  tiles: [
    ["wall_void","wall_void","wall_void","wall_forest_1","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_2","wall_forest_1","wall_void","wall_void","wall_void"],
    
    ["wall_void","wall_void","wall_forest_2","wall_forest_2","grass","tree","grass","grass","grass","tile_grass","grass","grass","tree","grass","wall_forest_2","wall_forest_2","wall_void","wall_void"],
    
    ["wall_void","wall_forest_1","wall_forest_3","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","grass","grass","grass","grass","wall_forest_4","wall_forest_1","wall_void"],

    ["wall_void","wall_forest_3","grass","house_roof","house_roof","house_roof","grass","grass","tile_grass","grass","tile_grass","grass","grass","house_roof","house_roof","grass","wall_forest_4","wall_void"],
    
    ["wall_forest_1","wall_forest_3","grass","house_wall","house_door","house_wall","grass","grass","tile_grass","grass","tile_grass","grass","grass","house_wall","house_door","grass","wall_forest_4","wall_forest_1"],
    
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","tree","grass","grass","grass","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","tree","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","grass","grass","grass","tile_grass","tile_grass","well","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","house_roof","house_roof","grass","grass","grass","grass","tile_grass","grass","tile_grass","grass","grass","grass","house_roof","house_roof","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","house_wall","house_door","grass","grass","grass","grass","tile_grass","grass","tile_grass","grass","grass","grass","house_wall","house_door","grass","wall_forest_4"],
    
    ["wall_forest_3","grass","grass","grass","grass","tree","grass","grass","tile_grass","grass","tile_grass","grass","tree","grass","grass","grass","grass","nier_town_out_right"],
    
    ["wall_forest_3","grass","grass","grass","grass","grass","grass","grass","tile_grass","tile_grass","tile_grass","grass","grass","grass","grass","grass","grass","nier_town_out_right"],
    
    ["wall_forest_3","wall_forest_1","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","grass","wall_forest_1","wall_forest_4"],
    
    ["wall_forest_1","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_5","wall_forest_1"]
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