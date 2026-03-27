"use client"

import { useEffect, useState } from "react"
import { isActionKey } from "@/game/input/keybindings"

export function DeathScreen() {
  const options = ["Main Menu", "Load Game"]
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (isActionKey(e, "left")) setSelected(s => Math.max(0, s - 1))
      if (isActionKey(e, "right")) setSelected(s => Math.min(options.length - 1, s + 1))
      if (isActionKey(e, "confirm")) {
        if (selected === 0) {
          // Main Menu
          window.dispatchEvent(new Event("quitToTitle"))
        } else {
          // Load Game: teardown and ask the app to open load modal
          window.dispatchEvent(new Event("quitToTitleAndLoad"))
        }
      }
      if (isActionKey(e, "cancel")) {
        // allow cancelling death screen? do nothing
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  return (
    <div data-modal="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4000 }}>
      <div style={{ width: 640, background: "rgba(0,0,0,0.95)", color: "white", padding: 20, borderRadius: 8, textAlign: "center" }}>
        <img src="/assets/ui/death_bg.png" alt="You died" style={{ maxWidth: "100%", marginBottom: 12 }} />
        <h2>You were defeated</h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 12 }}>
          {options.map((o, i) => (
            <button key={o} onClick={() => {
              if (i === 0) window.dispatchEvent(new Event("quitToTitle"))
              else window.dispatchEvent(new Event("quitToTitleAndLoad"))
            }} style={{ padding: "8px 14px", background: selected === i ? "#666" : "#333", color: "white" }}>{o}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DeathScreen
