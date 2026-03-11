// components/CombatUI.tsx
"use client"

import { useEffect, useState } from "react"
import { GameState } from "@/game/core/GameState"
import { CombatState } from "@/game/core/CombatState"
import { Player } from "@/game/entities/Player"
import { Enemy } from "@/game/entities/Enemy"
import { InventorySystem } from "@/game/systems/InventorySystem"
import { Items } from "@/game/data/items/items"
import { CombatSystem } from "@/game/systems/CombatSystem"

interface CombatUIProps {
  state: GameState
  onAction: (action: "attack" | "guard" | "item" | "flee", targetIndex?: number) => void
}

export function CombatUI({ state, onAction }: CombatUIProps) {
  const combat = state.combat as CombatState
  if (!combat) return null

  const player: Player = combat.player
  const enemies: Enemy[] = (combat as any).enemies ?? []

  const [selectedAction, setSelectedAction] = useState<0 | 1 | 2 | 3>(0)
  const [itemOpen, setItemOpen] = useState(false)
  const [targetOpen, setTargetOpen] = useState(false)
  const [selectedTarget, setSelectedTarget] = useState(0)
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [itemTargeting, setItemTargeting] = useState(false)
  const [itemTargetIndex, setItemTargetIndex] = useState(0)

  const playerStats = player.getTotalStats()
  const enemyStats = enemies[0]?.getTotalStats()

  const recentLog = [...combat.log].slice(-5)

  // keyboard navigation
  useEffect(() => {
      const handleKey = (e: KeyboardEvent) => {
      if (!combat.awaitingPlayerInput) return

      if (!itemOpen) {
        // navigate main actions
        if (!targetOpen) {
          if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") setSelectedAction((v) => ((v + 1) % 4) as 0 | 1 | 2 | 3)
          if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q") setSelectedAction((v) => ((v - 1 + 4) % 4) as 0 | 1 | 2 | 3)
          if (e.key === "z" || e.key === "Z") setSelectedAction(0)
          if (e.key === "s" || e.key === "S") setSelectedAction(1)
        } else {
          // target selection mode: left/right to change target
          if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") setSelectedTarget((v) => (v + 1) % enemies.length)
          if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q") setSelectedTarget((v) => (v - 1 + enemies.length) % enemies.length)
        }

        if (e.key === "Enter") {
          const action = ["attack", "guard", "item", "flee"][selectedAction] as "attack" | "guard" | "item" | "flee"
          if (action === "item") {
            setItemOpen(true)
            // set selected to first consumable
            const consumables = player.inventory.filter(i => Items[i.id]?.effects && i.quantity > 0)
            setSelectedItemIndex(consumables.length ? 0 : -1)
            return
          }

          if (action === "attack") {
            // open target selection when not already open
            if (!targetOpen) {
              const firstAlive = enemies.findIndex(e => e.hp > 0)
              setSelectedTarget(firstAlive >= 0 ? firstAlive : 0)
              setTargetOpen(true)
              return
            }

            // confirm attack on selected target
            setTargetOpen(false)
            onAction("attack", selectedTarget)
            return
          }

          // other actions
          onAction(action)
        }
      } else {
        // item selection
        if (e.key === "Escape") {
          setItemOpen(false)
          setItemTargeting(false)
        }

        // navigate items with up/down
        const consumables = player.inventory.filter(i => Items[i.id]?.effects && i.quantity > 0)
        if (!itemTargeting) {
          if (e.key === "ArrowDown") setSelectedItemIndex((v) => Math.min(consumables.length - 1, v + 1))
          if (e.key === "ArrowUp") setSelectedItemIndex((v) => Math.max(0, v - 1))
        } else {
          // selecting a target for the item
          if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") setItemTargetIndex((v) => (v + 1) % enemies.length)
          if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q") setItemTargetIndex((v) => (v - 1 + enemies.length) % enemies.length)
        }

        if (e.key === "Enter") {
          const item = consumables[selectedItemIndex]
          if (!item) return

          // inspect effects to determine whether we need a target
          const base = Items[item.id]
          const needsTarget = base.effects?.some(e => e.target === "enemy")

          if (needsTarget && !itemTargeting) {
            // start targeting mode
            const firstAlive = enemies.findIndex(e => e.hp > 0)
            setItemTargetIndex(firstAlive >= 0 ? firstAlive : 0)
            setItemTargeting(true)
            return
          }

          if (needsTarget && itemTargeting) {
            const res = InventorySystem.useItem(player, item.id, { combat: combat as any, targetIndex: itemTargetIndex })
            if (Array.isArray(res)) {
              res.forEach(r => {
                if (r.type === "damage") combat.log.push(`You used ${item.name} and dealt ${r.amount} damage.`)
                if (r.type === "debuff") combat.log.push(`You used ${item.name} on ${enemies[r.targetIndex].name}.`)
              })
            }
            // after applying damage/debuffs, check victory
            const allDead = (combat as any).enemies.every((e: any) => e.hp <= 0)
            if (allDead) {
              CombatSystem.handleVictory(state)
            }
            combat.awaitingPlayerInput = false
            setItemOpen(false)
            setItemTargeting(false)
            return
          }

          // non-targeted use (self or all)
          const res = InventorySystem.useItem(player, item.id, { combat: combat as any })
          if (Array.isArray(res)) {
            res.forEach(r => {
              if (r.type === "heal") combat.log.push(`You used ${item.name} and recovered ${r.amount} HP.`)
              if (r.type === "buff") combat.log.push(`You used ${item.name}.`)
              if (r.type === "damage") combat.log.push(`You used ${item.name} and dealt ${r.amount} damage.`)
            })
          }
          // check victory for AoE or other damage
          const allDead2 = (combat as any).enemies.every((e: any) => e.hp <= 0)
          if (allDead2) {
            CombatSystem.handleVictory(state)
          }
          combat.awaitingPlayerInput = false
          setItemOpen(false)
        }
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [combat.awaitingPlayerInput, selectedAction, itemOpen, targetOpen, selectedTarget, enemies.length, onAction])

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
              {/* target highlight */}
              {targetOpen && (
                <div style={{ marginLeft: 8 }}>
                  {selectedTarget === idx ? <div style={{ color: "#ff0" }}>◀ Target</div> : null}
                </div>
              )}

              {/* item targeting highlight */}
              {itemTargeting && (
                <div style={{ marginLeft: 8 }}>
                  {itemTargetIndex === idx ? <div style={{ color: "#0ff" }}>◀ Target</div> : null}
                </div>
              )}
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
          {combat.awaitingPlayerInput && !itemOpen && (
            <div style={{ display: "flex", gap: 16 }}>
              {["ATTACK", "GUARD", "ITEM", "FLEE"].map((a, i) => (
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

      {/* Item picker */}
      {itemOpen && (
        <div style={{ marginTop: 8, padding: 8, backgroundColor: "#111", border: "1px solid white", borderRadius: 4 }}>
          <strong>Item:</strong>
          <div style={{ marginTop: 8 }}>
            {player.inventory.filter(i => Items[i.id]?.effects && i.quantity > 0).length === 0 && <div>No consumables.</div>}
            {player.inventory.filter(i => Items[i.id]?.effects && i.quantity > 0).map((it, idx) => (
              <div key={it.id} style={{ padding: 4, backgroundColor: idx === selectedItemIndex ? "#333" : "transparent" }}>
                {it.name} x{it.quantity}
              </div>
            ))}
            <div style={{ marginTop: 6 }}>Enter to use, Escape to cancel, Up/Down to navigate{itemTargeting ? ", Left/Right to pick target" : ""}</div>
          </div>
        </div>
      )}
    </div>
  )
}