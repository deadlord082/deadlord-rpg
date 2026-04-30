import { Player } from "@/game/entities/Player"
import { RARITY_STYLES } from "@/game/data/items/rarityColors"
import { InventorySystem } from "@/game/systems/InventorySystem"
import { Items } from "@/game/data/items/items"
import { useEffect, useState } from "react"
import { ConfirmModal } from "../ConfirmModal"
import { isActionKey } from "@/game/input/keybindings"
import { t } from "@/game/utils/i18n"

export function ItemDetailsModal({
  player,
  index,
  onClose,
}: {
  player: Player
  index: number
  onClose: () => void
}) {
  const item = player.inventory[index]
  if (!item) return null

  const rarity = RARITY_STYLES[item.rarity]

  const base = Items[item.id]
  const [discardMode, setDiscardMode] = useState(false)
  const [discardCount, setDiscardCount] = useState(1)
  const [optionIndex, setOptionIndex] = useState(0)
  const [modalMsg, setModalMsg] = useState<string | null>(null)

  const options = [] as string[]
  if (base?.effects && base.effects.length > 0) options.push("use")
  options.push("discard")

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (isActionKey(e, "cancel")) {
        if (discardMode) {
          setDiscardMode(false)
        } else {
          onClose()
        }
      }

      if (discardMode) {
        if (isActionKey(e, "up") || isActionKey(e, "right")) setDiscardCount(c => Math.min(item.quantity, c + 1))
        if (isActionKey(e, "down") || isActionKey(e, "left")) setDiscardCount(c => Math.max(1, c - 1))
        if (isActionKey(e, "confirm")) {
          InventorySystem.removeItem(player, item.id, discardCount)
          setDiscardMode(false)
          onClose()
        }
      } else {
        // cycle options with left/right
        if (isActionKey(e, "right")) {
          setOptionIndex(i => (i + 1) % options.length)
        }
        if (isActionKey(e, "left")) {
          setOptionIndex(i => (i - 1 + options.length) % options.length)
        }

        if (isActionKey(e, "confirm")) {
          const opt = options[optionIndex]
          if (opt === "use") handleUse()
          if (opt === "discard") {
            if (item.quantity > 1) {
              setDiscardCount(1)
              setDiscardMode(true)
            } else {
              InventorySystem.removeItem(player, item.id, 1)
              onClose()
            }
          }
        }

        // removed letter shortcut for discard; use confirm on the "Discard" option instead
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [discardMode, discardCount, item])

  function handleUse() {
    if (!base?.effects || base.effects.length === 0) {
      setModalMsg(t("ITEM_CANNOT_BE_USED"))
      return
    }

    // If item targets enemies, disallow using from inventory outside combat
    const needsEnemy = base.effects.some(e => e.target === "enemy" || e.target === "allEnemies")
    if (needsEnemy) {
      setModalMsg(t("ITEM_MUST_BE_USED_IN_COMBAT"))
      return
    }

    const res = InventorySystem.useItem(player, item.id)
    if (res) {
      // simple feedback
      setModalMsg(t("ITEM_USED_MESSAGE").replace("{name}", item.name))
    }
    onClose()
  }

  return (
    <>
    <div
      style={{
        position: "absolute",
        inset: "20% 30%",
        border: `2px solid ${rarity.border}`,
        background: rarity.bg,
        boxShadow: `0 0 12px ${rarity.border}`,
        padding: 16,
        borderRadius: 8,
        zIndex: 2000,
      }}
    >
      <h3 style={{ color: rarity.text }}>{t(`SHOP.ITEMS.${item.id}.NAME`) || item.name}</h3>
      <small style={{ opacity: 0.8 }}>{item.rarity.toUpperCase()}</small>
      {item.image && <img src={item.image} style={{ width: 64, alignSelf: "center" }} />}
      <p>{t(`SHOP.ITEMS.${item.id}.DESCRIPTION`) || item.description}</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
          {options.map((opt, i) => (
            <div key={opt} style={{ padding: 6, border: i === optionIndex ? "2px solid #fff" : "1px solid #666", borderRadius: 6 }}>
              <button onClick={() => {
                setOptionIndex(i)
                if (opt === "use") handleUse()
                if (opt === "discard") {
                  if (item.quantity > 1) setDiscardMode(true)
                  else { InventorySystem.removeItem(player, item.id, 1); onClose() }
                }
              }}>{opt === "use" ? t("USE") : t("DISCARD")}</button>
            </div>
          ))}
        </div>

        <small style={{ opacity: 0.6 }}>{t("INSTRUCTIONS_NAV_CONFIRM")}</small>
    </div>

    {discardMode && (
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3000 }}>
        <div style={{ width: 320, background: "#111", border: "2px solid white", padding: 16, borderRadius: 8 }}>
          <h4>{t("DISCARD_PROMPT_TITLE").replace("{name}", item.name)}</h4>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
            <button onClick={() => setDiscardCount(c => Math.max(1, c - 1))}>-</button>
            <div style={{ minWidth: 40, textAlign: "center" }}>{discardCount}</div>
            <button onClick={() => setDiscardCount(c => Math.min(item.quantity, c + 1))}>+</button>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 12 }}>
            <button onClick={() => { setDiscardMode(false) }}>{t("CANCEL")}</button>
            <button onClick={() => { InventorySystem.removeItem(player, item.id, discardCount); setDiscardMode(false); onClose() }}>{t("OK")}</button>
          </div>
          <small style={{ opacity: 0.6 }}>{t("DISCARD_CONTROLS")}</small>
        </div>
      </div>
    )}
    {modalMsg && (
      <ConfirmModal message={modalMsg} onCancel={() => setModalMsg(null)} onConfirm={() => setModalMsg(null)} confirmLabel={t("OK")} />
    )}
    </>
  )
}
