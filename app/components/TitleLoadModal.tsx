"use client"

import { useEffect, useState } from "react"
import { ConfirmModal } from "./ConfirmModal"
import { isActionKey } from "@/game/input/keybindings"
import { t } from "@/game/utils/i18n"

const STORAGE_KEY = "deadlord_saves_v1"

export function TitleLoadModal({ onClose, onLoad }: { onClose: () => void; onLoad: (data: string) => void }) {
  const [slots, setSlots] = useState<any[]>([{ timestamp: null, data: null }, { timestamp: null, data: null }, { timestamp: null, data: null }])
  const [selected, setSelected] = useState(0)

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
      if (isActionKey(e, "left")) setSelected(s => Math.max(0, s - 1))
      if (isActionKey(e, "right")) setSelected(s => Math.min(2, s + 1))
      if (isActionKey(e, "confirm")) {
        const slot = slots[selected]
        if (!slot?.data) return
        onLoad(slot.data)
      }
      if (isActionKey(e, "cancel")) onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [slots, selected])

  return (
    <div data-modal="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1500 }}>
      <div style={{ background: "rgba(0,0,0,0.95)", color: "white", padding: 20, borderRadius: 8, minWidth: 520 }}>
        <h3>{t("LOAD_GAME")}</h3>
        <div style={{ display: "flex", gap: 12 }}>
          {slots.map((s, i) => (
            <div key={i} style={{ padding: 8, border: i === selected ? "2px solid #fff" : "1px solid #666", borderRadius: 6, minWidth: 160 }}>
              <div style={{ fontWeight: 600 }}>{t("SLOT")} {i + 1}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{s.timestamp ? new Date(s.timestamp).toLocaleString() : t("EMPTY")}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose}>{t("CANCEL")}</button>
          <button onClick={() => { const slot = slots[selected]; if (slot?.data) onLoad(slot.data) }} disabled={!slots[selected]?.data}>{t("LOAD")}</button>
        </div>
      </div>
      {/* loading from title no longer shows a confirmation dialog; loads immediately */}
    </div>
  )
}
