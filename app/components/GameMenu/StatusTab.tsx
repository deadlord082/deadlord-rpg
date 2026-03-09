import { Player } from "@/game/entities/Player"

const renderStat = (
  name: string,
  baseValue: string | number,
  totalValue: string | number,
  isPercent?: boolean
) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <img
        src={`/assets/ui/${name}.png`}
        alt={name}
        style={{
          width: 80,
          height: 80,
        }}
      />

      <span>
        <strong style={{ textTransform: "capitalize" }}>
          {name}:
        </strong>{" "}
        {baseValue}
        {isPercent ? "%" : ""}{" "}
        <span
          style={{
            color:
              totalValue > baseValue
                ? "#4caf50"
                : totalValue < baseValue
                ? "#f44336"
                : "#aaa"
          }}
        >
          ({totalValue}
          {isPercent ? "%" : ""})
        </span>
      </span>
    </div>
  )
}

export function StatusTab({ player }: { player: Player }) {
  const totalStats = player.getTotalStats()
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        columnGap: 40,
        rowGap: 16,
      }}
    >
      {/* Row 1 — Name / Gold */}
      <div>
        <strong>Name:</strong> {player.id}
        <br />
        <small>Level {player.level}</small>
      </div>
  
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span>
          <strong>{player.gold}</strong>
        </span>
        <img
          src="/assets/ui/gold.png"
          alt="Gold"
          style={{
            width: 28,
            height: 28,
          }}
        />
      </div>
  
      {/* Row 2 — Health / XP */}
      <div>
        <strong>Health</strong>
        <div
          style={{
            marginTop: 4,
            height: 14,
            width: 220,
            background: "#400",
            borderRadius: 6,
          }}
        >
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
        <div
          style={{
            marginTop: 4,
            height: 14,
            width: 220,
            background: "#222",
            borderRadius: 6,
          }}
        >
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
  
      {/* Stats Section */}
  
      {/* Left Column — 4 Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {renderStat("strength", player.stats.strength, totalStats.strength)}
        {renderStat("defense", player.stats.defense, totalStats.defense)}
        {renderStat("speed", player.stats.speed, totalStats.speed)}
        {renderStat("luck", player.stats.luck, totalStats.luck)}
      </div>
  
      {/* Right Column — 3 Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {renderStat("charisma", player.stats.charisma, totalStats.charisma)}
        {renderStat(
          "crit chance",
          player.stats.critChance,
          totalStats.critChance,
          true
        )}
        {renderStat(
          "crit damage",
          `x${player.stats.critDamage}`,
          `x${totalStats.critDamage}`
        )}
      </div>
    </div>
  )
}
