import { Player } from "@/game/entities/Player"

export function StatusTab({ player }: { player: Player }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3>Status</h3>
      <p><strong>Name:</strong> {player.id}</p>
      <p><strong>Level:</strong> {player.level}</p>

      <div>
        <strong>Health</strong>
        <div style={{ marginTop: 4, height: 14, width: 220, background: "#400", borderRadius: 6 }}>
          <div
            style={{
              height: "100%",
              width: `${(player.hp / player.maxHp) * 100}%`,
              background: "#0f0",
              borderRadius: 6,
            }}
          />
        </div>
        <small>{player.hp} / {player.maxHp}</small>
      </div>

      <div>
        <strong>XP</strong>
        <div style={{ marginTop: 4, height: 10, width: 220, background: "#222", borderRadius: 6 }}>
          <div
            style={{
              height: "100%",
              width: `${(player.xp / player.xpToNextLevel) * 100}%`,
              background: "#44f",
              borderRadius: 6,
            }}
          />
        </div>
        <small>{player.xp} / {player.xpToNextLevel}</small>
      </div>

      <p><strong>Gold:</strong> {player.gold}</p>

      <h4>Stats</h4>
      <p>💪 Strength: {player.stats.strength}</p>
      <p>🛡️ Defense: {player.stats.defense}</p>
      <p>⚡ Speed: {player.stats.speed}</p>
      <p>🍀 Luck: {player.stats.luck}</p>
      <p>🗣️ Charisma: {player.stats.charisma}</p>
      <hr />
      <p>🎯 Crit Chance: {player.stats.critChance}%</p>
      <p>💥 Crit Damage: x{player.stats.critDamage}</p>
    </div>
  )
}
