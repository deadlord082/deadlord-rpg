"use client"

import { useEffect, useState, useRef } from "react"
import { GameState } from "@/game/core/GameState"
import { applySavedState, serializeGameState } from "@/game/core/saveLoad"
import { ConfirmModal } from "../ConfirmModal"

const STORAGE_KEY = "deadlord_saves_v1"

interface SaveSlot {
  timestamp: number | null
  data: string | null
}

export function SaveTab({ state }: { state: GameState }) {
  const [slots, setSlots] = useState<SaveSlot[]>([{ timestamp: null, data: null }, { timestamp: null, data: null }, { timestamp: null, data: null }])
  const [selected, setSelected] = useState(0)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [pendingAction, setPendingAction] = useState<{ type: "save" | "load" | "delete" | "import"; index: number; data?: string } | null>(null)
  const [error, setError] = useState<string | null>(null)

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

  function doSave(i: number) {
    const data = serializeGameState(state)
    const s = [...slots]
    s[i] = { timestamp: Date.now(), data }
    persist(s)
  }

  function doLoad(i: number) {
    const s = slots[i]
    if (!s || !s.data) return
    applySavedState(s.data, state)
  }

  function doDelete(i: number) {
    const s = [...slots]
    s[i] = { timestamp: null, data: null }
    persist(s)
  }

  function doImport(i: number, text: string) {
    const s = [...slots]
    s[i] = { timestamp: Date.now(), data: text }
    persist(s)
  }

  function requestSave(i: number) {
    if (slots[i]?.data) setPendingAction({ type: "save", index: i })
    else doSave(i)
  }

  function requestLoad(i: number) {
    if (!slots[i]?.data) return
    setPendingAction({ type: "load", index: i })
  }

  function requestDelete(i: number) {
    if (!slots[i]?.data) return
    setPendingAction({ type: "delete", index: i })
  }

  function requestExport(i: number) {
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

  function requestImport(i: number) {
    if (!fileInputRef.current) return
    fileInputRef.current.click()
    fileInputRef.current.onchange = async (ev: any) => {
      const f = ev.target.files?.[0]
      if (!f) return
      const text = await f.text()
      try {
        JSON.parse(text)
      } catch (e) {
        setError("Invalid save file")
        return
      }
      setPendingAction({ type: "import", index: i, data: text })
    }
  }

  // keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setSelected(s => Math.max(0, s - 1))
      if (e.key === "ArrowRight") setSelected(s => Math.min(2, s + 1))
      if (e.key === "Enter") requestLoad(selected)
      if (e.key === "s" || e.key === "S") requestSave(selected)
      if (e.key === "d" || e.key === "D") requestDelete(selected)
      if (e.key === "e" || e.key === "E") requestExport(selected)
      if (e.key === "i" || e.key === "I") requestImport(selected)
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
              <button onClick={() => requestSave(i)}>Save</button>
              <button onClick={() => requestLoad(i)} disabled={!slot.data}>Load</button>
              <button onClick={() => requestDelete(i)} disabled={!slot.data}>Delete</button>
              <button onClick={() => requestExport(i)} disabled={!slot.data}>Export</button>
              <button onClick={() => requestImport(i)}>Import</button>
            </div>
          </div>
        ))}
      </div>
      <input ref={fileInputRef} type="file" accept="application/json" style={{ display: "none" }} />
      <div style={{ marginTop: 8, opacity: 0.8 }}>Saves are stored in your browser localStorage.</div>

      {pendingAction && (
        <ConfirmModal
          message={pendingAction.type === "save" ? `Overwrite save in slot ${pendingAction.index + 1}?` : pendingAction.type === "load" ? `Load save from slot ${pendingAction.index + 1}? Unsaved progress will be lost.` : pendingAction.type === "delete" ? `Delete save in slot ${pendingAction.index + 1}?` : `Import file into slot ${pendingAction.index + 1}?`}
          onCancel={() => setPendingAction(null)}
          onConfirm={() => {
            const a = pendingAction
            if (!a) return
            if (a.type === "save") doSave(a.index)
            if (a.type === "load") doLoad(a.index)
            if (a.type === "delete") doDelete(a.index)
            if (a.type === "import" && a.data) doImport(a.index, a.data)
            setPendingAction(null)
          }}
        />
      )}

      {error && (
        <ConfirmModal message={error} onCancel={() => setError(null)} onConfirm={() => setError(null)} confirmLabel="OK" />
      )}
    </div>
  )
}
