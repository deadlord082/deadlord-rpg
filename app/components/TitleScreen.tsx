"use client"

import React, { useEffect, useState } from "react"
import { isActionKey } from "@/game/input/keybindings"
import { t, setLanguage, getLanguage, AVAILABLE_LANGS } from "@/game/utils/i18n"

export function TitleScreen({
  onNew,
  onLoad,
  onSettings,
}: {
  onNew: () => void
  onLoad: () => void
  onSettings: () => void
}) {
  const [langModal, setLangModal] = useState(false)
  const [selectedLangIndex, setSelectedLangIndex] = useState(0)

  const options = [
    { label: t("NEW_GAME"), action: onNew },
    { label: t("LOAD_GAME"), action: onLoad },
    { label: t("SETTINGS"), action: onSettings },
    {
      label: getLanguage().toUpperCase(),
      action: () => {
        const idx = AVAILABLE_LANGS.findIndex(l => l.code === getLanguage())
        setSelectedLangIndex(idx === -1 ? 0 : idx)
        setLangModal(true)
      }
    },
  ]
  const [selected, setSelected] = useState(0)
  const [, forceRerender] = useState(0)

  useEffect(() => {
    function onLang() { forceRerender(v => v + 1) }
    window.addEventListener("languageChanged", onLang)
    return () => window.removeEventListener("languageChanged", onLang)
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      // if any other modal is open, don't handle title menu navigation
      if (document.querySelector('[data-modal]') && !langModal) return

      // If language modal is open, handle its controls
      if (langModal) {
        if (isActionKey(e, "up") || isActionKey(e, "left")) {
          setSelectedLangIndex(i => Math.max(0, i - 1))
          e.preventDefault()
          return
        }
        if (isActionKey(e, "down") || isActionKey(e, "right")) {
          setSelectedLangIndex(i => Math.min(AVAILABLE_LANGS.length - 1, i + 1))
          e.preventDefault()
          return
        }
        if (isActionKey(e, "confirm")) {
          const chosen = AVAILABLE_LANGS[selectedLangIndex]
          if (chosen) {
            setLanguage(chosen.code)
            setLangModal(false)
          }
          e.preventDefault()
          return
        }
        if (isActionKey(e, "cancel")) {
          setLangModal(false)
          e.preventDefault()
          return
        }
        return
      }

      // previous: left or up
      if (isActionKey(e, "left") || isActionKey(e, "up")) setSelected(s => Math.max(0, s - 1))
      // next: right or down
      if (isActionKey(e, "right") || isActionKey(e, "down")) setSelected(s => Math.min(options.length - 1, s + 1))
      if (isActionKey(e, "confirm")) options[selected].action()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected, langModal, selectedLangIndex])

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: "url(/assets/ui/menu_bg.png) center/cover no-repeat" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
        <img src="/assets/ui/menu_title.png" alt="Title" style={{ width: 600, maxWidth: "90%" }} />
        <div style={{ display: "flex", gap: 12 }}>
          {options.map((o, i) => (
            <button key={o.label + i} onClick={o.action} style={{ padding: "12px 24px", fontSize: 18, background: i === selected ? '#777' : '#444' }}>{o.label}</button>
          ))}
        </div>
      </div>
      {langModal && (
        <div data-modal="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ width: 320, background: "rgba(0,0,0,0.95)", color: "white", padding: 16, borderRadius: 8 }}>
            <h3 style={{ marginTop: 0 }}>{t("LANGUAGE")}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {AVAILABLE_LANGS.map((l, i) => (
                <button
                  key={l.code}
                  onMouseEnter={() => setSelectedLangIndex(i)}
                  onClick={() => { setLanguage(l.code); setLangModal(false) }}
                  style={{ padding: 8, background: selectedLangIndex === i ? '#666' : (getLanguage() === l.code ? '#444' : '#222'), color: 'white', textAlign: 'left' }}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 12, textAlign: 'right' }}>
              <button onClick={() => setLangModal(false)} style={{ padding: 6 }}>{t("CLOSE") ?? 'Close'}</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ position: "absolute", right: 12, bottom: 12, color: "#ccc" }}>V0.7.4</div>
    </div>
  )
}
