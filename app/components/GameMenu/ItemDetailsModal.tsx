import { Player } from "@/game/entities/Player"
import { RARITY_STYLES } from "@/game/data/items/rarityColors"

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

  return (
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
      <h3 style={{ color: rarity.text }}>{item.name}</h3>
        <small style={{ opacity: 0.8 }}>{item.rarity.toUpperCase()}</small>
        {item.image && <img src={item.image} style={{ width: 64, alignSelf: "center" }} />}
        <p>{item.description}</p>
        <p><strong>Quantity:</strong> {item.quantity}</p>

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={() => alert("Use item (TODO)")}>Use</button>
          <button onClick={() => {
            player.inventory.splice(index, 1)
            onClose()
            }}>
            Discard
          </button>
        </div>

        <small style={{ opacity: 0.6 }}>Press ESC to return</small>
    </div>
  )
}
