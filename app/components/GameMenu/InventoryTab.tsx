import { Item } from "@/game/data/items/Item"
import { Player } from "@/game/entities/Player"
import { RARITY_STYLES } from "@/game/data/items/rarityColors"
import { t } from "@/game/utils/i18n"

interface InventoryTabProps {
  player: Player
  selectedIndex: number
  setSelectedIndex: (v: number) => void
  setItemDetailsIndex: (v: number) => void
}

export function InventoryTab({
  player,
  selectedIndex,
  setSelectedIndex,
  setItemDetailsIndex,
}: InventoryTabProps) {
  const columns = 5
  const rows = 4
  const totalSlots = columns * rows

  return (
    <div style={{ display: "flex", gap: 12, flex: 1, width: "100%", height: "100%" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(5, 1fr)`, gridTemplateRows: `repeat(4, 1fr)`, gap: 12, width: "100%", height: "100%" }}>
        {Array.from({ length: totalSlots }).map((_, i) => {
          const item = player.inventory[i]
          const isSelected = i === selectedIndex
          const rarityStyle = item ? RARITY_STYLES[item.rarity] : null

          return (
            <div
              key={i}
              style={{
                border: `2px solid ${isSelected ? "#fff" : rarityStyle?.border ?? "#444"}`,
                background: rarityStyle?.bg ?? "#222",
                boxShadow: item ? `0 0 8px ${rarityStyle?.border}` : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 14,
                cursor: "pointer",
                width: "100%",
                height: "100%",
                padding: 10,
                boxSizing: "border-box",
              }}
              onClick={() => {
                setSelectedIndex(i)
                if (item) setItemDetailsIndex(i)
              }}
            >
              {item && (
                <>
                  <img src={item.image} style={{ maxWidth: "60%", maxHeight: "60%" }} />
                  <span style={{ marginTop: 6 }}>{t(`SHOP.ITEMS.${item.id}.NAME`) || item.name}</span>
                  <span>x{item.quantity}</span>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
