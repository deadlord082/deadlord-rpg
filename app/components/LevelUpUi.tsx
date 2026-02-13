import { GameState } from "@/game/core/GameState"

interface LevelUpUIProps {
  state: GameState
}

export function LevelUpUI({ state }: LevelUpUIProps) {
  const levelUp = state.ui.levelUp
  if (!levelUp) return null

  const { newLevel, statGains } = levelUp

  function close() {
    state.ui.levelUp = undefined
    state.running = true
    ;(state as any)._game?.notifyUI()
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "black",
        color: "white",
        zIndex: 5000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <h1 style={{ fontSize: 48 }}>LEVEL UP!</h1>
      <h2>Now Level {newLevel}</h2>

      <div style={{ marginTop: 20 }}>
        {Object.entries(statGains).map(([stat, value]) => (
          <div key={stat}>
            +{value} {stat}
          </div>
        ))}
      </div>

      <small style={{ opacity: 0.6, marginTop: 40 }}>
        Press Enter to continue
      </small>
    </div>
  )
}