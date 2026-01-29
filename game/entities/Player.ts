import { Entity } from "./Entity"
import { Item } from "../data/items/itemTypes"
import { Stats } from "./Stats"
import { Direction } from "../utils/direction"

export interface Player extends Entity {
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
): Player {
  return {
    id: "player",
    x,
    y,
    blocking: true,
    direction: Direction.Down,
    
    sprites: {
      [Direction.Up]: "/assets/entities/players/up.png",
      [Direction.Down]: "/assets/entities/players/down.png",
      [Direction.Left]: "/assets/entities/players/left.png",
      [Direction.Right]: "/assets/entities/players/right.png",
    },

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
