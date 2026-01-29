import { Entity } from "./Entity"
import { Direction } from "../utils/direction"
import { Item } from "../data/items/itemTypes"
import { Stats } from "./Stats"

export interface Player extends Entity {
  direction: Direction
  inventory: Item[]

  // progression
  level: number
  xp: number
  xpToNextLevel: number

  // health
  hp: number
  maxHp: number

  // economy
  gold: number

  // stats
  stats: Stats
}

export function createPlayer(
  x: number,
  y: number,
  image: string
): Player {
  return {
    id: "player",
    x,
    y,
    image,
    blocking: true,
    direction: Direction.Down,

    inventory: [],

    level: 1,
    xp: 0,
    xpToNextLevel: 100,

    maxHp: 100,
    hp: 100,

    gold: 50,

    stats: {
      strength: 10,
      defense: 5,
      speed: 5,
      luck: 3,
      charisma: 2,

      critChance: 5,   // %
      critDamage: 1.5, // 150%
    },
  }
}
