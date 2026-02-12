import { Player } from "@/game/entities/Player"

const renderStat = (
  name: string,
  value: string | number,
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
          imageRendering: "pixelated",
        }}
      />
      <span>
        <strong style={{ textTransform: "capitalize" }}>{name}:</strong>{" "}
        {value}
        {isPercent ? "%" : ""}
      </span>
    </div>
  )
}

export function StatusTab({ player }: { player: Player }) {
  const statConfig = [
    { key: "strength", value: player.stats.strength },
    { key: "defense", value: player.stats.defense },
    { key: "speed", value: player.stats.speed },
    { key: "luck", value: player.stats.luck },
    { key: "charisma", value: player.stats.charisma },
  ]

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
            imageRendering: "pixelated",
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
        {renderStat("strength", player.stats.strength)}
        {renderStat("defense", player.stats.defense)}
        {renderStat("speed", player.stats.speed)}
        {renderStat("luck", player.stats.luck)}
      </div>
  
      {/* Right Column — 3 Stats */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {renderStat("charisma", player.stats.charisma)}
        {renderStat("crit chance", player.stats.critChance, true)}
        {renderStat("crit damage", `x${player.stats.critDamage}`)}
      </div>
    </div>
  )
}
