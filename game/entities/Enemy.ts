import { Entity } from "./Entity"

export interface Enemy extends Entity {
  enemyId: string
  hp: number
  attack: number
}