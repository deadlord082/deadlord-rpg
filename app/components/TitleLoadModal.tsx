"use client"

import { useEffect, useState } from "react"
import { ConfirmModal } from "./ConfirmModal"

const STORAGE_KEY = "deadlord_saves_v1"

export function TitleLoadModal({ onClose, onLoad }: { onClose: () => void; onLoad: (data: string) => void }) {
  const [slots, setSlots] = useState<any[]>([{ timestamp: null, data: null }, { timestamp: null, data: null }, { timestamp: null, data: null }])
  const [selected, setSelected] = useState(0)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const empty = [{ timestamp: null, data: null }, { timestamp: null, data: null }, { timestamp: null, data: null }]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(empty))
      setSlots(empty)
      return
    }
    try {
      const parsed = JSON.parse(raw)
      while (parsed.length < 3) parsed.push({ timestamp: null, data: null })
      setSlots(parsed.slice(0, 3))
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setSelected(s => Math.max(0, s - 1))
      if (e.key === "ArrowRight") setSelected(s => Math.min(2, s + 1))
      if (e.key === "Enter") {
        const slot = slots[selected]
        if (!slot?.data) return
        setConfirming(true)
      }
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [slots, selected])

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1500 }}>
      <div style={{ background: "rgba(0,0,0,0.95)", color: "white", padding: 20, borderRadius: 8, minWidth: 520 }}>
        <h3>Load Game</h3>
        <div style={{ display: "flex", gap: 12 }}>
          {slots.map((s, i) => (
            <div key={i} style={{ padding: 8, border: i === selected ? "2px solid #fff" : "1px solid #666", borderRadius: 6, minWidth: 160 }}>
              <div style={{ fontWeight: 600 }}>Slot {i + 1}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{s.timestamp ? new Date(s.timestamp).toLocaleString() : "Empty"}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose}>Cancel</button>
          <button onClick={() => { const slot = slots[selected]; if (slot?.data) setConfirming(true) }} disabled={!slots[selected]?.data}>Load</button>
        </div>
      </div>
      {confirming && (
        <ConfirmModal message={`Load slot ${selected + 1}? Unsaved progress will be lost.`} onCancel={() => setConfirming(false)} onConfirm={() => { setConfirming(false); onLoad(slots[selected].data) }} />
      )}
    </div>
  )
}
