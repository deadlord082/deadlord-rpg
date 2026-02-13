import { Player } from "../entities/Player"

export const LevelSystem = {
  gainXP(player: Player, amount: number) {
    player.xp += amount
  
    const levelUps: { level: number; gains: Record<string, number> }[] = []
  
    while (player.xp >= player.xpToNextLevel) {
      player.xp -= player.xpToNextLevel
      const gains = this.levelUp(player)
  
      levelUps.push({
        level: player.level,
        gains,
      })
    }
  
    return levelUps
  },

  levelUp(player: Player) {
    const statGains = {
      maxHp: 5,
      strength: 1,
      defense: 1,
      speed: 1,
      luck: 1,
      charisma: 1,
    }
  
    player.level += 1
    player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.25)
  
    player.maxHp += statGains.maxHp
    player.hp = player.maxHp
  
    player.stats = {
      ...player.stats,
      strength: player.stats.strength + statGains.strength,
      defense: player.stats.defense + statGains.defense,
      speed: player.stats.speed + statGains.speed,
      luck: player.stats.luck + statGains.luck,
      charisma: player.stats.charisma + statGains.charisma,
      critChance: player.stats.critChance,
      critDamage: player.stats.critDamage,
    }
  
    return statGains
  }
}
