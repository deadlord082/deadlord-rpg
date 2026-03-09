import { Enemy } from "./Enemy"

export const ENEMIES: Record<string, Enemy> = {
  slime: {
    id: "slime",
    name: "Slime",
    image: "/assets/entities/enemies/slime.png",
    maxHp: 50,
    fleeChance: 0.9, // 90% success

    stats: {
      strength: 5,
      defense: 1,
      speed: 2,
      luck: 1,
      charisma: 0,
      critChance: 5,
      critDamage: 1.5,
    },

    goldReward: 4,
    xpReward: 5,
  },
  goblin_leader: {
    id: "goblin_leader",
    name: "Goblin Leader",
    image: "/assets/entities/enemies/goblin_leader.png",
    maxHp: 80,
    fleeChance: 0.25, // 25% success

    stats: {
      strength: 14,
      defense: 6,
      speed: 6,
      luck: 2,
      charisma: 0,
      critChance: 5,
      critDamage: 1.5,
    },

    goldReward: 22,
    xpReward: 17,
  },
}

// Basic runtime validation of enemy definitions
function validateEnemies() {
  for (const id in ENEMIES) {
    const e = ENEMIES[id] as any
    if (typeof e.id !== "string") console.warn(`Enemy ${id} missing id`)
    if (typeof e.maxHp !== "number") console.warn(`Enemy ${id} missing maxHp`)
    if (!e.stats) console.warn(`Enemy ${id} missing stats`)
  }
}

validateEnemies()