import { Entity } from "../../entities/Entity"

export interface GameMap {
  id: string
  width: number
  height: number

  tiles: number[][]

  entities: Entity[]
}