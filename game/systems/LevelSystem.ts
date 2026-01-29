import { Player } from "../entities/Player"

export const LevelSystem = {
  gainXP(player: Player, amount: number) {
    player.xp += amount

    while (player.xp >= player.xpToNextLevel) {
      player.xp -= player.xpToNextLevel
      this.levelUp(player)
    }
  },

  levelUp(player: Player) {
    player.level += 1
    player.xpToNextLevel = Math.floor(player.xpToNextLevel * 1.25)

    // stat growth
    player.maxHp += 20
    player.hp = player.maxHp

    console.log(`Level up! Now level ${player.level}`)
  },
}
