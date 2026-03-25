"use client"

import { useEffect, useState, useRef } from "react"
import { GameState } from "@/game/core/GameState"
import { applySavedState, serializeGameState } from "@/game/core/saveLoad"

const STORAGE_KEY = "deadlord_saves_v1"

interface SaveSlot {
  timestamp: number | null
  data: string | null
}

export function SaveTab({ state }: { state: GameState }) {
  const [slots, setSlots] = useState<SaveSlot[]>([{ timestamp: null, data: null }, { timestamp: null, data: null }, { timestamp: null, data: null }])
  const [selected, setSelected] = useState(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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
      // ensure length 3
      while (parsed.length < 3) parsed.push({ timestamp: null, data: null })
      setSlots(parsed.slice(0,3))
    } catch (e) {
      console.error(e)
    }
  }, [])

  function persist(list: SaveSlot[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
    setSlots(list)
  }

  function handleSave(i: number) {
    const overwritten = !!slots[i]?.data
    if (overwritten) {
      const ok = window.confirm(`Overwrite save in slot ${i + 1}?`)
      if (!ok) return
    }
    const data = serializeGameState(state)
    const s = [...slots]
    s[i] = { timestamp: Date.now(), data }
    persist(s)
  }

  function handleLoad(i: number) {
    const s = slots[i]
    if (!s || !s.data) return
    const ok = window.confirm(`Load save from slot ${i + 1}? Unsaved progress will be lost.`)
    if (!ok) return
    // apply saved state into runtime
    applySavedState(s.data, state)
  }

  function handleDelete(i: number) {
    const s = [...slots]
    if (!s[i]?.data) return
    const ok = window.confirm(`Delete save in slot ${i + 1}?`)
    if (!ok) return
    s[i] = { timestamp: null, data: null }
    persist(s)
  }

  function handleExport(i: number) {
    const s = slots[i]
    if (!s?.data) return
    const blob = new Blob([s.data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `deadlord-save-slot${i + 1}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleImport(i: number) {
    if (!fileInputRef.current) return
    fileInputRef.current.click()
    fileInputRef.current.onchange = async (ev: any) => {
      const f = ev.target.files?.[0]
      if (!f) return
      const text = await f.text()
      try {
        JSON.parse(text)
      } catch (e) {
        alert("Invalid save file")
        return
      }
      const ok = window.confirm(`Import this file into slot ${i + 1}? It will overwrite existing save.`)
      if (!ok) return
      const s = [...slots]
      s[i] = { timestamp: Date.now(), data: text }
      persist(s)
    }
  }

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setSelected(s => Math.max(0, s - 1))
      if (e.key === "ArrowRight") setSelected(s => Math.min(2, s + 1))
      if (e.key === "Enter") handleLoad(selected)
      if (e.key === "s" || e.key === "S") handleSave(selected)
      if (e.key === "d" || e.key === "D") handleDelete(selected)
      if (e.key === "e" || e.key === "E") handleExport(selected)
      if (e.key === "i" || e.key === "I") handleImport(selected)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected, slots])

  return (
    <div>
      <h3>Save / Load</h3>
      <div style={{ display: "flex", gap: 12 }}>
        {slots.map((slot, i) => (
          <div key={i} style={{ padding: 8, border: i === selected ? "2px solid #fff" : "1px solid #666", borderRadius: 6, minWidth: 220 }}>
            <div style={{ fontWeight: 600 }}>Slot {i + 1}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{slot.timestamp ? new Date(slot.timestamp).toLocaleString() : "Empty"}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <button onClick={() => handleSave(i)}>Save</button>
              <button onClick={() => handleLoad(i)} disabled={!slot.data}>Load</button>
              <button onClick={() => handleDelete(i)} disabled={!slot.data}>Delete</button>
              <button onClick={() => handleExport(i)} disabled={!slot.data}>Export</button>
              <button onClick={() => handleImport(i)}>Import</button>
            </div>
          </div>
        ))}
      </div>
      <input ref={fileInputRef} type="file" accept="application/json" style={{ display: "none" }} />
      <div style={{ marginTop: 8, opacity: 0.8 }}>Saves are stored in your browser localStorage.</div>
    </div>
  )
}
