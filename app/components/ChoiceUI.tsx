"use client"

import { useEffect, useState } from "react"
import { ChoiceEvent } from "@/game/events/ChoiceEvent"
import { runEvent } from "@/game/events/EventRunner"
import { GameState } from "@/game/core/GameState"

export function ChoiceUI({ choice, state }: { choice: ChoiceEvent | undefined, state: GameState }) {
  const [index, setIndex] = useState(0)
  // Reset selection when a new choice appears
  useEffect(() => {
    setIndex(0)
  }, [choice])

  useEffect(() => {
    if (!choice) return

    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") setIndex(i => (i + 1) % choice.choices.length)
      if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q") setIndex(i => (i - 1 + choice.choices.length) % choice.choices.length)
      if (e.key === "Enter") {
        // close choice UI
        state.ui.choice = undefined
        state.running = true
        state._eventBus?.emit("uiUpdate")
        const selected = choice.choices[index]
        if (selected) runEvent(selected.event, state)
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [choice, index, state])
  if (!choice) return null

  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 180, display: "flex", justifyContent: "center", zIndex: 20 }}>
      <div style={{ background: "rgba(0,0,0,0.9)", color: "white", padding: 12, borderRadius: 8, minWidth: 400 }}>
        <div style={{ marginBottom: 8 }}>{choice.text}</div>
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {choice.choices.map((c, i) => (
            <div key={i} style={{ padding: 8, border: i === index ? "2px solid #fff" : "1px solid #666", borderRadius: 6 }}>{c.label}</div>
          ))}
        </div>
        <div style={{ marginTop: 8, opacity: 0.7, textAlign: "center" }}>Left/Right to change, Enter to select</div>
      </div>
    </div>
  )
}
