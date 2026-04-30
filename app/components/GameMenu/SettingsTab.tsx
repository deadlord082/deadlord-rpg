import { useEffect, useState } from "react"
import { loadKeyMap, setKey, isActionKey } from "@/game/input/keybindings"
import { t } from "@/game/utils/i18n"

export function SettingsTab() {
  const [active, setActive] = useState("keybindings")
  const [bindings, setBindings] = useState(() => loadKeyMap())

  const [recording, setRecording] = useState<keyof typeof bindings | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!recording) return
    function onKey(e: KeyboardEvent) {
    e.preventDefault()
    if (!recording) return
      // allow canceling recording with cancel action
      if (isActionKey(e, "cancel") || e.key === "Escape") {
        setRecording(null)
        return
      }
      const k = e.key === " " ? " " : e.key
      const next = setKey(recording as keyof typeof bindings, k)
      setBindings(next)
      setRecording(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [recording])

  // keyboard navigation for the settings tabs and bindings list
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (recording) return
      // left/right change tabs
      if (isActionKey(e, "left")) {
        const tabs = ["keybindings", "audio", "graphics"]
        const i = tabs.indexOf(active)
        setActive(tabs[(i - 1 + tabs.length) % tabs.length])
        return
      }
      if (isActionKey(e, "right")) {
        const tabs = ["keybindings", "audio", "graphics"]
        const i = tabs.indexOf(active)
        setActive(tabs[(i + 1) % tabs.length])
        return
      }

      if (active === "keybindings") {
        const keys = Object.keys(bindings) as Array<keyof typeof bindings>
        if (isActionKey(e, "up")) setSelectedIndex(s => Math.max(0, s - 1))
        if (isActionKey(e, "down")) setSelectedIndex(s => Math.min(keys.length - 1, s + 1))
        if (isActionKey(e, "confirm")) setRecording(keys[selectedIndex])
        if (isActionKey(e, "cancel")) setSelectedIndex(0)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [active, bindings, selectedIndex, recording])

  return (
    <div style={{ padding: 8 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setActive("keybindings")} style={{ padding: 8, background: active === "keybindings" ? "#666" : undefined }}>{t("KEYBINDINGS")}</button>
        <button onClick={() => setActive("audio")} style={{ padding: 8, background: active === "audio" ? "#666" : undefined }}>{t("AUDIO")}</button>
        <button onClick={() => setActive("graphics")} style={{ padding: 8, background: active === "graphics" ? "#666" : undefined }}>{t("GRAPHICS")}</button>
      </div>

      {active === "keybindings" && (
        <div>
          <h3>{t("KEYBINDINGS")}</h3>
          <table>
            <tbody>
              {(
                Object.keys(bindings) as Array<keyof typeof bindings>
              ).map((k, i) => (
                <tr key={k} style={{ background: i === selectedIndex ? "rgba(255,255,255,0.06)" : undefined }}>
                  <td style={{ paddingRight: 12 }}>{k.toUpperCase()}</td>
                  <td style={{ paddingRight: 12 }}>{bindings[k]}</td>
                  <td>
                    <button onClick={() => { setSelectedIndex(i); setRecording(k) }}>{recording === k ? t("PRESS_A_KEY") : t("RECORD")}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active === "audio" && (
        <div>
          <h3>{t("AUDIO")}</h3>
          <p>{t("AUDIO_NOT_IMPLEMENTED")}</p>
        </div>
      )}

      {active === "graphics" && (
        <div>
          <h3>{t("GRAPHICS")}</h3>
          <p>{t("GRAPHICS_NOT_IMPLEMENTED")}</p>
        </div>
      )}
    </div>
  )
}

export default SettingsTab
