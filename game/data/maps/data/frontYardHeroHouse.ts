import { GameMap } from "../mapTypes"
import { createItemEntity } from "../../../entities/ItemEntity"
import { NPCS } from "../../npcs/npcs"

export const frontYardHeroHouseMap: GameMap = {
  id: "frontYardHeroHouse",
  width: 11,
  height: 10,
  tiles: [
    [511,512,508,1001,501,509,512,511],
    [513,1,5,6,3,5,1,514],
    [513,4,3,4,1,2,5,514],
    [513,2,1,2,4,1,3,514],
    [500,500,500,500,31,500,500,500],
    [500,500,500,500,32,500,500,500,500,500,500],
    [500,513,1,2,1,3,5,1,3,2,514],
    [500,513,4,3,4,1,2,5,4,1,514],
    [500,513,2,1,2,4,1,3,1,3,514],
    [500,515,515,515,515,515,515,515,515,515,515],
  ],
  entities: [
      NPCS.john,
      NPCS.jacob,
      NPCS.tristan,
      NPCS.pero,
      createItemEntity("item2", "crown_of_deadlord", 3, 3, true),
    ],
}