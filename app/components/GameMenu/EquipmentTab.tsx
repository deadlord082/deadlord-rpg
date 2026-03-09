import { Player } from "@/game/entities/Player"
import { EquipmentSlot, EquipmentItem } from "@/game/data/items/EquipmentItem"
import { Items } from "@/game/data/items/items"
import { useEffect, useState } from "react"
import { RARITY_STYLES } from "@/game/data/items/rarityColors"

// interface EquipmentTabProps {
//   player: Player
//   selectedSlotIndex: number
//   setSelectedSlotIndex: (i: number) => void
//   onEquipItem: (slot: EquipmentSlot, item: EquipmentItem) => void
// }

const EQUIPMENT_SLOTS: EquipmentSlot[] = [
  "head",
  "chest",
  "rightHand",
  "leftHand",
  "accessory1",
  "accessory2",
]

interface EquipmentTabProps {
    player: Player
    selectedSlotIndex: number
    setSelectedSlotIndex: (i: number) => void
  
    modalSlot: string | null
    setModalSlot: (slot: string | null) => void
  
    selectedItemIndex: number
    setSelectedItemIndex: (i: number) => void
  
    onEquipItem: (slot: EquipmentSlot, item: EquipmentItem) => void
  }
  
  export function EquipmentTab({
    player,
    selectedSlotIndex,
    setSelectedSlotIndex,
    modalSlot,
    setModalSlot,
    selectedItemIndex,
    setSelectedItemIndex,
    onEquipItem,
  }: EquipmentTabProps) {
    const currentSlot = modalSlot ?? EQUIPMENT_SLOTS[selectedSlotIndex]
  
    const equippedItem = player.equipment[currentSlot]

    const inventoryEquipables = player.inventory.filter((i) => {
    if (!("slot" in i)) return false
    const slotField = i.slot
    return Array.isArray(slotField)
        ? slotField.includes(currentSlot)
        : slotField === currentSlot
    }) as EquipmentItem[]

    const equipableItems = [
    ...(equippedItem ? [equippedItem] : []),
    ...inventoryEquipables,
    ]

    useEffect(() => {
        if (modalSlot) setSelectedItemIndex(0)
    }, [modalSlot])
  
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <h2>Equipment</h2>
        <div style={{ display: "flex", gap: 12 }}>
          {EQUIPMENT_SLOTS.map((slot, i) => {
            const equipped = player.equipment[slot]
            const isSelected = i === selectedSlotIndex
            const rarityStyle = equipped ? RARITY_STYLES[equipped.rarity] : null
  
            return (
              <div
                key={slot}
                style={{
                  width: 80,
                  height: 80,
                  border: isSelected
                    ? "2px solid #ffffff"
                    : `2px solid ${rarityStyle?.border ?? "#444"}`,
                  background: rarityStyle?.bg ?? "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedSlotIndex(i)}
              >
                {equipped && <img src={equipped.image} style={{ width: 64, height: 64 }} />}
              </div>
            )
          })}
        </div>
  
        {/* Modal: Choose equipment for slot */}
        {modalSlot && (
          <div
            style={{
              position: "absolute",
              inset: "20% 25%",
              background: "#111",
              border: "2px solid white",
              borderRadius: 8,
              padding: 20,
              zIndex: 3000,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <h3>Equip {modalSlot}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {equipableItems.length === 0 && <span>No items available</span>}
              {equipableItems.map((item, index) => {
                const rarity = RARITY_STYLES[item.rarity]
                const isEquipped = equippedItem?.id === item.id
                const isSelected = index === selectedItemIndex
                return (
                    <div
                    key={item.id}
                    style={{
                        border: `2px solid ${isSelected ? "#fff" : rarity.border}`,
                        background: isEquipped ? "#333" : rarity.bg,
                        padding: 8,
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                      player.equip(modalSlot as EquipmentSlot, item)
                      setModalSlot(null)
                    }}
                    >
                    <span>{item.name}</span>
                    {isEquipped && <span>(Equipped)</span>}
                    <span>+{Object.entries(item.stats).map(([k,v])=>`${k}: ${v}`).join(", ")}</span>
                    </div>
                )
                })}
            </div>
  
            <button onClick={() => setModalSlot(null)}>Cancel</button>
          </div>
        )}
      </div>
    )
  }