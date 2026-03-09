import { Player } from "../entities/Player"

export const LevelSystem = {
  gainXP(player: Player, amount: number) {
    player.xp += amount
  
    const levelUps: any[] = []
  
    while (player.xp >= player.xpToNextLevel) {
      player.xp -= player.xpToNextLevel
  
      const result = this.levelUp(player)
  
      levelUps.push({
        level: player.level,
        ...result,
      })
    }
  
    return levelUps
  },

  levelUp(player: Player) {
    const previousStats = {
      maxHp: player.maxHp,
      strength: player.stats.strength,
      defense: player.stats.defense,
      speed: player.stats.speed,
      luck: player.stats.luck,
      charisma: player.stats.charisma,
    }
  
    const statGains = {
      maxHp: 5,
      strength: 1,
      defense: 0,
      speed: 1,
      luck: 0.5,
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
  
    return {
      previousStats,
      statGains,
    }
  }
}
