import { useEffect, useState } from "react"
import { MerchantEvent } from "@/game/events/MerchantEvent"
import { Items } from "@/game/data/items/items"
import { RARITY_STYLES } from "@/game/data/items/rarityColors"
import { InventorySystem } from "@/game/systems/InventorySystem"
import { ToastSystem } from "@/game/systems/ToastSystem"
import { GameState } from "@/game/core/GameState"
import { isActionKey } from "@/game/input/keybindings"

interface ShopUIProps {
  state: GameState
  event: MerchantEvent
  onClose: () => void
}

export function ShopUI({ state, event, onClose }: ShopUIProps) {
  const { player } = state
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)

  function buy(itemId: string, price: number, index: number, qty: number) {
    const shopItem = event.inventory[index]
  
    const isInfinite =
      shopItem.stock === null || shopItem.stock === undefined
  
    if (!isInfinite && shopItem.stock! < qty) return
  
    const totalPrice = price * qty
  
    if (player.gold < totalPrice) return
  
    if (!isInfinite) {
      shopItem.stock! -= qty
    }
  
    player.gold -= totalPrice
  
    for (let i = 0; i < qty; i++) {
      InventorySystem.addItem(player, itemId)
    }
  
    ToastSystem.addItemToast(state, itemId)
  
    setModalOpen(false)
    setQuantity(1)
  
    ;(state as any)._eventBus?.emit("uiUpdate")
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!event.inventory.length) return
  
      const currentItem = event.inventory[selectedIndex]
      const isInfinite =
        currentItem.stock === null || currentItem.stock === undefined
  
      const maxStock = isInfinite ? 99 : currentItem.stock ?? 0
      const isUp = isActionKey(e, "up")
      const isDown = isActionKey(e, "down")
  
      // ESC
      if (isActionKey(e, "cancel")) {
        if (modalOpen) {
          setModalOpen(false)
          setQuantity(1)
        } else {
          state.ui.merchant = undefined
          state.running = true
          onClose()
        }
        e.preventDefault()
        return
      }
  
      // MODAL CONTROLS
      if (modalOpen) {
        if (isUp) {
          setQuantity((q) => Math.min(q + 1, maxStock))
        }
  
        if (isDown) {
          setQuantity((q) => Math.max(1, q - 1))
        }
  
        if (isActionKey(e, "confirm")) {
          buy(currentItem.itemId, currentItem.price, selectedIndex, quantity)
        }
  
        e.preventDefault()
        return
      }
  
      // SHOP NAVIGATION
      if (isDown) {
        setSelectedIndex(
          (selectedIndex + 1) % event.inventory.length
        )
      }
  
      if (isUp) {
        setSelectedIndex(
          (selectedIndex - 1 + event.inventory.length) %
            event.inventory.length
        )
      }
  
      if (isActionKey(e, "confirm")) {
        if (
          maxStock > 0 &&
          player.gold >= currentItem.price
        ) {
          setModalOpen(true)
          setQuantity(1)
        }
      }
  
      e.preventDefault()
    }
  
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [selectedIndex, modalOpen, quantity, event.inventory, player.gold])

  // scroll selected item into view
  const itemRefs: React.MutableRefObject<HTMLDivElement | null>[] = []
  // we'll attach refs dynamically in the render below via callback ref

  useEffect(() => {
    try {
      const el = document.querySelectorAll(".shop-item")[selectedIndex] as HTMLElement | undefined
      if (el) el.scrollIntoView({ block: "nearest" })
    } catch (e) {}
  }, [selectedIndex])

  return (
    <div
      style={{
        position: "absolute",
        inset: "15% 20%",
        background: "#111",
        border: "2px solid white",
        borderRadius: 8,
        padding: 20,
        zIndex: 3000,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Shop</h3>

        {/* Player Gold */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <img
            src="/assets/ui/gold.png"
            style={{ width: 24, height: 24}}
          />
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {player.gold}
          </span>
        </div>
      </div>

      {/* Items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          overflowY: "auto",
        }}
      >
        {event.inventory.map(({ itemId, price, stock }, index) => {
          const item = Items[itemId]
          if (!item) return null

          const rarity = RARITY_STYLES[item.rarity]
          const isInfinite = stock === null || stock === undefined
          const isSoldOut = !isInfinite && stock <= 0
          const canAfford = player.gold >= price
          const canBuy = canAfford && !isSoldOut
          const isSelected = index === selectedIndex

          return (
            <div
              key={itemId}
              className="shop-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
                border: isSelected
                  ? "2px solid white"
                  : `2px solid ${rarity.border}`,
                background: isSelected ? "#222" : rarity.bg,
                borderRadius: 6,
                opacity: canBuy ? 1 : 0.5,
              }}
            >
              {/* Left side */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {item.image && (
                  <img
                    src={item.image}
                    style={{
                      width: 40,
                      height: 40,
                    }}
                  />
                )}

                <div>
                  <div style={{ color: rarity.text }}>{item.name}</div>
                  <small>{item.description}</small>
                </div>
              </div>

              {/* Right side */}
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#ffcc33" }}>{price}</span>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {!isInfinite && (
                        <small>
                        {isSoldOut ? "Sold Out" : `Stock: ${stock}`}
                        </small>
                    )}

                    <button
                      disabled={!canBuy}
                      onClick={() => {
                        // open quantity modal before buying
                        setSelectedIndex(index)
                        setModalOpen(true)
                        setQuantity(1)
                      }}
                    >
                      {isSoldOut ? "Sold Out" : "Buy"}
                    </button>
                </div>
              </div>

              {modalOpen && (
                <div
                  style={{
                    position: "absolute",
                    inset: "35% 40%",
                    background: "#000",
                    border: "2px solid white",
                    padding: 20,
                    borderRadius: 8,
                    zIndex: 4000,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div>Choose Quantity</div>

                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    {quantity}
                  </div>

                  <small>↑ ↓ to change</small>
                  <small>Enter to confirm</small>
                  <small>Esc to cancel</small>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Close */}
      <button
          onClick={() => {
          state.ui.merchant = undefined
          state.running = true

          const next = state.eventQueue.shift()
          if (next) {
            import("@/game/events/EventRunner").then(({ runEvent }) => {
              runEvent(next, state)
            })
          }

          ;(state as any)._eventBus?.emit("uiUpdate")
          onClose()
        }}
      >
        Leave
      </button>
    </div>
  )
}