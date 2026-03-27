"use client"

import React, { useEffect, useState } from "react"
import { isActionKey } from "@/game/input/keybindings"

export function TitleScreen({
  onNew,
  onLoad,
  onSettings,
}: {
  onNew: () => void
  onLoad: () => void
  onSettings: () => void
}) {
  const options = [
    { label: "NEW GAME", action: onNew },
    { label: "LOAD GAME", action: onLoad },
    { label: "SETTINGS", action: onSettings },
  ]
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // if any modal is open, don't handle title menu navigation
      if (document.querySelector('[data-modal]')) return
      // previous: left or up
      if (isActionKey(e, "left") || isActionKey(e, "up")) setSelected(s => Math.max(0, s - 1))
      // next: right or down
      if (isActionKey(e, "right") || isActionKey(e, "down")) setSelected(s => Math.min(options.length - 1, s + 1))
      if (isActionKey(e, "confirm")) options[selected].action()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: "url(/assets/ui/menu_bg.png) center/cover no-repeat" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <img src="/assets/ui/menu_title.png" alt="Title" style={{ width: 600, maxWidth: "90%" }} />
        <div style={{ display: "flex", gap: 12 }}>
          {options.map((o, i) => (
            <button key={o.label} onClick={o.action} style={{ padding: "12px 24px", fontSize: 18, background: i === selected ? '#777' : '#444' }}>{o.label}</button>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", right: 12, bottom: 12, color: "#ccc" }}>V0.7.4</div>
    </div>
  )
}
