"use client"

import { useEffect, useState, useRef } from "react"
import { GameState } from "@/game/core/GameState"
import { applySavedState, serializeGameState } from "@/game/core/saveLoad"
import { ConfirmModal } from "../ConfirmModal"
import { isActionKey } from "@/game/input/keybindings"
import { t } from "@/game/utils/i18n"

const STORAGE_KEY = "deadlord_saves_v1"

interface SaveSlot {
  timestamp: number | null
  data: string | null
}

export function SaveTab({ state }: { state: GameState }) {
  const [slots, setSlots] = useState<SaveSlot[]>([{ timestamp: null, data: null }, { timestamp: null, data: null }, { timestamp: null, data: null }])
  const [selected, setSelected] = useState(0)
  const [mode, setMode] = useState<"slots" | "options">("slots")
  const ACTIONS = ["save", "load", "export", "import", "delete"] as const
  const [selectedAction, setSelectedAction] = useState(0)
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

  // keyboard navigation (Up/Down for slot + action navigation)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // when a confirm modal or error is open, do not change slots/options here
      if (pendingAction || error) return

      if (mode === "slots") {
        if (isActionKey(e, "up")) setSelected(s => Math.max(0, s - 1))
        if (isActionKey(e, "down")) setSelected(s => Math.min(2, s + 1))
        if (isActionKey(e, "confirm")) {
          // enter options selection for the focused slot
          setMode("options")
          setSelectedAction(0)
          return
        }
      } else if (mode === "options") {
        if (isActionKey(e, "up")) setSelectedAction(a => Math.max(0, a - 1))
        if (isActionKey(e, "down")) setSelectedAction(a => Math.min(ACTIONS.length - 1, a + 1))
        if (isActionKey(e, "confirm")) {
          const act = ACTIONS[selectedAction]
          if (act === "save") requestSave(selected)
          if (act === "load") requestLoad(selected)
          if (act === "delete") requestDelete(selected)
          if (act === "export") requestExport(selected)
          if (act === "import") requestImport(selected)
          return
        }
        // ESC returns to slot selection
        if (isActionKey(e, "cancel")) {
          setMode("slots")
          return
        }
      }

      // no additional fallbacks here; actions triggered via options selection or explicit buttons
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected, slots, mode, selectedAction, pendingAction, error])

  return (
    <div>
      <h3>{t("SAVE_LOAD_TITLE")}</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
        {slots.map((slot, i) => (
          <div key={i} style={{ padding: 12, border: i === selected ? "2px solid #fff" : "1px solid #666", borderRadius: 8, width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{t("SLOT")} {i + 1}</div>
                <div style={{ fontSize: 12, opacity: 0.8 }}>{slot.timestamp ? new Date(slot.timestamp).toLocaleString() : t("EMPTY")}</div>
              </div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>{slot.data ? null : <span>{t("EMPTY")}</span>}</div>
            </div>

            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              {mode === "options" && i === selected ? (
                ACTIONS.map((act, idx) => {
                  const disabled = (act === "load" || act === "delete" || act === "export") && !slot.data
                  const label = act === "save" ? t("SAVE") : act === "load" ? t("LOAD") : act === "export" ? t("EXPORT") : act === "import" ? t("IMPORT") : t("DELETE")
                  return (
                    <button
                      key={act}
                      onClick={() => {
                        setSelectedAction(idx)
                        if (act === "save") requestSave(i)
                        if (act === "load") requestLoad(i)
                        if (act === "delete") requestDelete(i)
                        if (act === "export") requestExport(i)
                        if (act === "import") requestImport(i)
                      }}
                      disabled={disabled}
                      style={{ padding: "10px 14px", borderRadius: 8, border: idx === selectedAction ? "2px solid #fff" : "1px solid #666", background: idx === selectedAction ? "#333" : "#222", color: "white", textAlign: "left" }}
                    >
                      {label}
                    </button>
                  )
                })
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setSelected(i); setMode("options"); setSelectedAction(0) }} style={{ padding: "8px 12px", borderRadius: 8 }}>{t("DETAILS")}</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <input ref={fileInputRef} type="file" accept="application/json" style={{ display: "none" }} />
      <div style={{ marginTop: 8, opacity: 0.8 }}>{t("SAVES_STORED_NOTE")}</div>

      {pendingAction && (
        <ConfirmModal
          message={
            pendingAction.type === "save"
              ? t("OVERWRITE_SAVE_PROMPT").replace("{n}", String(pendingAction.index + 1))
              : pendingAction.type === "load"
              ? t("LOAD_SAVE_PROMPT").replace("{n}", String(pendingAction.index + 1))
              : pendingAction.type === "delete"
              ? t("DELETE_SAVE_PROMPT").replace("{n}", String(pendingAction.index + 1))
              : t("IMPORT_SAVE_PROMPT").replace("{n}", String(pendingAction.index + 1))
          }
          onCancel={() => setPendingAction(null)}
          onConfirm={() => {
            const a = pendingAction
            if (!a) return
            if (a.type === "save") doSave(a.index)
            if (a.type === "load") {
              doLoad(a.index)
              // notify parent menu to close after loading
              window.dispatchEvent(new Event('saveLoadedInMenu'))
            }
            if (a.type === "delete") doDelete(a.index)
            if (a.type === "import" && a.data) doImport(a.index, a.data)
            setPendingAction(null)
          }}
        />
      )}

      {error && (
        <ConfirmModal message={error} onCancel={() => setError(null)} onConfirm={() => setError(null)} confirmLabel={t("OK")} />
      )}
    </div>
  )
}
