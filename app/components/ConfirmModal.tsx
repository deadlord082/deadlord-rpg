"use client"

import { useEffect, useState } from "react"

export function ConfirmModal({
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Yes",
  cancelLabel = "No",
}: {
  message: string
  onConfirm: () => void
  onCancel: () => void
  confirmLabel?: string
  cancelLabel?: string
}) {
  const [focused, setFocused] = useState(0)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        setFocused((f) => 1 - f)
        e.preventDefault()
      }
      if (e.key === "Enter") {
        e.preventDefault()
        if (focused === 0) onConfirm()
        else onCancel()
      }
      if (e.key === "Escape") {
        e.preventDefault()
        onCancel()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [focused, onConfirm, onCancel])

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
      <div style={{ background: "rgba(0,0,0,0.95)", color: "white", padding: 20, borderRadius: 8, minWidth: 360 }}>
        <div style={{ marginBottom: 12 }}>{message}</div>
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <button onClick={onConfirm} style={{ padding: "8px 14px", background: focused === 0 ? "#666" : "#333", color: "white" }}>{confirmLabel}</button>
          <button onClick={onCancel} style={{ padding: "8px 14px", background: focused === 1 ? "#666" : "#333", color: "white" }}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  )
}
