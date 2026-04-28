"use client"

import React, { useEffect, useState } from "react"
import preloadAll from "@/game/utils/preloader"

export function LoadingScreen({ onDone }: { onDone?: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let mounted = true
    preloadAll((loaded, total) => {
      if (!mounted) return
      setProgress(Math.round((loaded / total) * 100))
    }).then(() => {
      if (!mounted) return
      setProgress(100)
      onDone?.()
    }).catch(() => {
      if (!mounted) return
      onDone?.()
    })

    return () => { mounted = false }
  }, [onDone])

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: "black", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ margin: 0 }}>Loading…</h2>
        <div style={{ width: 360, height: 20, background: "#222", borderRadius: 6, marginTop: 12, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: "#6b7280" }} />
        </div>
        <div style={{ marginTop: 8 }}>{progress}%</div>
      </div>
    </div>
  )
}

export default LoadingScreen
