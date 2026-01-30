import { Entity } from "../../entities/Entity"
import { Tile } from "../tiles/tileTypes"

export interface GameMap {
  id: string
  width: number
  height: number

  tiles: Tile["id"][][]

  entities: Entity[]
}