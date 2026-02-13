import { GameState } from "@/game/core/GameState"
import { useMemo } from "react"

interface LevelUpUIProps {
  state: GameState
}

export function LevelUpUI({ state }: LevelUpUIProps) {
  const levelUp = state.ui.levelUp
  if (!levelUp) return null

  const { newLevel, previousStats, statGains } = levelUp

  function close() {
    state.ui.levelUp = undefined
    state.running = true
    ;(state as any)._game?.notifyUI()
  }

  const statOrder = [
    "maxHp",
    "strength",
    "defense",
    "speed",
    "luck",
    "charisma",
  ]

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at center, #111 0%, black 70%)",
        color: "white",
        zIndex: 5000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ✅ PARTICLES HERE */}
      <ParticleBackground />

      {/* ✅ Content Wrapper */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        <h1 style={{ fontSize: 48, color: "#ffd700" }}>LEVEL UP!</h1>
        <h2>Now Level {newLevel}</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
            marginTop: 20,
          }}
        >
          {statOrder.map((stat) => {
            const prev = previousStats[stat]
            const gain = statGains[stat]
            const next = prev + gain

            return (
              <div
                key={stat}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  fontSize: 20,
                }}
              >
                <img
                  src={`/assets/ui/${stat}.png`}
                  alt={stat}
                  style={{ width: 50, height: 50 }}
                />

                <span style={{ minWidth: 120, textTransform: "capitalize" }}>
                  {stat}
                </span>

                <span>
                  {prev} →{" "}
                  <span style={{ color: "#00ff88", fontWeight: "bold" }}>
                    {next}
                  </span>
                </span>
              </div>
            )
          })}
        </div>

        <small style={{ opacity: 0.6, marginTop: 40 }}>
          Press Enter to continue
        </small>
      </div>
    </div>
  )
}

function ParticleBackground() {
    const particles = useMemo(() => {
      return Array.from({ length: 40 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 4 + Math.random() * 4,
        size: 4 + Math.random() * 4,
      }))
    }, [])
  
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              background: "#ffd700",
              borderRadius: "50%",
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float ${p.duration}s linear infinite`,
              opacity: 0.7,
            }}
          />
        ))}
  
        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0px); opacity: 0; }
              30% { opacity: 1; }
              100% { transform: translateY(-300px); opacity: 0; }
            }
          `}
        </style>
      </div>
    )
  }