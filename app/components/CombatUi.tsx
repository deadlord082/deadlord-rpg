// components/CombatUI.tsx
"use client"

import { useEffect, useState } from "react"
import { GameState } from "@/game/core/GameState"
import { CombatState } from "@/game/core/CombatState"
import { Player } from "@/game/entities/Player"
import { Enemy } from "@/game/entities/Enemy"

interface CombatUIProps {
  state: GameState
  onAction: (action: "attack" | "guard" | "skill" | "flee") => void
}

export function CombatUI({ state, onAction }: CombatUIProps) {
  const combat = state.combat as CombatState
  if (!combat) return null

  const player: Player = combat.player
  const enemies: Enemy[] = (combat as any).enemies ?? []

  const [selectedAction, setSelectedAction] = useState<0 | 1 | 2 | 3>(0)
  const [skillOpen, setSkillOpen] = useState(false)

  const playerStats = player.getTotalStats()
  const enemyStats = enemies[0]?.getTotalStats()

  const recentLog = [...combat.log].slice(-5)

  // keyboard navigation
  useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
      if (!combat.awaitingPlayerInput) return

      if (!skillOpen) {
        // navigate main actions
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") setSelectedAction((v) => ((v + 1) % 4) as 0 | 1 | 2 | 3)
        if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q") setSelectedAction((v) => ((v - 1 + 4) % 4) as 0 | 1 | 2 | 3)
        if (e.key === "z" || e.key === "Z") setSelectedAction(0)
        if (e.key === "s" || e.key === "S") setSelectedAction(1)
        if (e.key === "Enter") {
          const action = ["attack", "guard", "skill", "flee"][selectedAction] as "attack" | "guard" | "skill" | "flee"
          if (action === "skill") setSkillOpen(true)
          else onAction(action)
        }
      } else {
        // skill selection placeholder
        if (e.key === "Escape") setSkillOpen(false)
        if (e.key === "Enter") {
          onAction("skill")
          setSkillOpen(false)
        }
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [combat.awaitingPlayerInput, selectedAction, skillOpen])

  // gauge bars animation
  const playerGaugePercent = Math.min((combat.playerGauge / 100) * 100, 100)
  const enemyGaugePercent = Math.min((((combat as any).enemyGauges?.[0] ?? 0) / 100) * 100, 100)

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        color: "white",
        fontFamily: "monospace",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 20,
      }}
    >
      {/* Top — Enemy */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {enemies.map((en, idx) => {
          const gauge = (combat as any).enemyGauges?.[idx] ?? 0
          const gaugePercent = Math.min((gauge / 100) * 100, 100)
          return (
            <div key={en.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src={en.image || "/assets/ui/enemy_placeholder.png"} alt={en.id} style={{ width: 72, height: 72 }} />
              <div>
                <strong>{en.name ?? en.enemyId ?? en.id}</strong>
                <div style={{ width: 180, height: 12, backgroundColor: "#400", borderRadius: 4, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${(en.hp / en.maxHp) * 100}%`,
                      height: "100%",
                      backgroundColor: "#f44",
                      transition: "width 0.2s",
                    }}
                  />
                </div>
                <small>{en.hp} / {en.maxHp}</small>
                <div style={{ marginTop: 4, height: 6, width: 180, backgroundColor: "#222", borderRadius: 4 }}>
                  <div
                    style={{
                      width: `${gaugePercent}%`,
                      height: "100%",
                      backgroundColor: "#f88",
                      transition: "width 0.1s",
                    }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Combat log */}
      <div style={{ marginBottom: 16, minHeight: 80 }}>
        {recentLog.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>

      {/* Player info */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <img src={player.image || "/assets/entities/players/playerIcon.png"} alt={player.id} style={{ width: 96, height: 96 }} />
        <div>
          <strong>{player.id}</strong>
          <div style={{ width: 300, height: 16, backgroundColor: "#222", borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                width: `${(player.hp / player.maxHp) * 100}%`,
                height: "100%",
                backgroundColor: "#4f4",
                transition: "width 0.2s",
              }}
            />
          </div>
          <small>{player.hp} / {player.maxHp}</small>
          <div style={{ marginTop: 4, height: 8, width: 300, backgroundColor: "#222", borderRadius: 4 }}>
            <div
              style={{
                width: `${playerGaugePercent}%`,
                height: "100%",
                backgroundColor: "#8f8",
                transition: "width 0.1s",
              }}
            />
          </div>
        </div>
      </div>

      {/* Action selection */}
      {combat.awaitingPlayerInput && !skillOpen && (
        <div style={{ display: "flex", gap: 16 }}>
          {["ATTACK", "GUARD", "SKILL", "FLEE"].map((a, i) => (
            <div
              key={a}
              style={{
                padding: "8px 16px",
                backgroundColor: selectedAction === i ? "#444" : "#222",
                border: "1px solid white",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              {a}
            </div>
          ))}
        </div>
      )}

      {/* Skill description */}
      {skillOpen && (
        <div style={{ marginTop: 8, padding: 8, backgroundColor: "#111", border: "1px solid white", borderRadius: 4 }}>
          <strong>Skill:</strong> Not implemented yet
          <div>Press Enter to use, Escape to cancel</div>
        </div>
      )}
    </div>
  )
}