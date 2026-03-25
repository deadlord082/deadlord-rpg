import { useState } from "react"
import { Player } from "@/game/entities/Player"

import { menuKeyboard } from "@/game/input/MenuKeyboard"

import { MenuTabs } from "./MenuTabs"
import { StatusTab } from "./StatusTab"
import { InventoryTab } from "./InventoryTab"
import { ItemDetailsModal } from "./ItemDetailsModal"
import { EquipmentTab } from "./EquipmentTab"
import { SaveTab } from "./SaveTab"
import { GameState } from "@/game/core/GameState"

interface GameMenuProps {
  player: Player
  onClose: () => void
  initialTab?: "status" | "inventory" |  "equipment" | "save" | null
}

type MenuState = "menu" | "status" | "inventory" | "equipment" | "save"

export function GameMenu({
  player,
  onClose,
  initialTab,
  state,
}: GameMenuProps & { state?: GameState }) {
  const menuOptions: ("status" | "inventory" |  "equipment" | "save" | "close")[] = [
    "status",
    "inventory",
    "equipment",
    "save",
    "close",
  ]

  const [activeTab, setActiveTab] = useState<MenuState>("menu")
  const [menuIndex, setMenuIndex] = useState(0)

  // inventory-related state
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [itemDetailsIndex, setItemDetailsIndex] = useState<number | null>(null)
  // Equipment-related state
  const [selectedEquipSlot, setSelectedEquipSlot] = useState(0)
  const [equipmentModalSlot, setEquipmentModalSlot] = useState<string | null>(null)
  const [selectedEquipItemIndex, setSelectedEquipItemIndex] = useState(0)
  

  // keyboard handling (externalized 👍)
  menuKeyboard({
    activeTab,
    setActiveTab,
    menuIndex,
    setMenuIndex,
    menuOptions,
    selectedIndex,
    setSelectedIndex,
    itemDetailsIndex,
    setItemDetailsIndex,
    selectedEquipSlot,
    setSelectedEquipSlot,
    equipmentModalSlot,
    setEquipmentModalSlot,
    selectedEquipItemIndex,
    setSelectedEquipItemIndex,
    player,
    onClose,
  })

  return (
    <div
      style={{
        position: "absolute",
        inset: "10% 15%",
        background: "rgba(0,0,0,0.9)",
        color: "white",
        padding: 20,
        borderRadius: 12,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* MAIN MENU */}
      {activeTab === "menu" && (
        <MenuTabs
          menuOptions={menuOptions}
          menuIndex={menuIndex}
          setMenuIndex={setMenuIndex}
          onSelect={(tab) => {
            if (tab === "close") onClose()
            else setActiveTab(tab)
          }}
        />
      )}

      {/* STATUS TAB */}
      {activeTab === "status" && <StatusTab player={player} />}

      {/* INVENTORY TAB */}
      {activeTab === "inventory" && (
        <InventoryTab
          player={player}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setItemDetailsIndex={setItemDetailsIndex}
        />
      )}

      {/* ITEM DETAILS MODAL */}
      {itemDetailsIndex !== null && (
        <ItemDetailsModal
          player={player}
          index={itemDetailsIndex}
          onClose={() => setItemDetailsIndex(null)}
        />
      )}

      {activeTab === "equipment" && (
        <EquipmentTab
          player={player}
          selectedSlotIndex={selectedEquipSlot}
          setSelectedSlotIndex={setSelectedEquipSlot}
          modalSlot={equipmentModalSlot}
          setModalSlot={setEquipmentModalSlot}
          selectedItemIndex={selectedEquipItemIndex}
          setSelectedItemIndex={setSelectedEquipItemIndex}
            onEquipItem={(slot, item) => {
            // unequip old
            for (const s of Array.isArray(item.slot) ? item.slot : [item.slot]) {
              if (player.equipment[s]?.id === item.id) player.equipment[s] = undefined
            }
            player.equipment[slot] = item
            // remove from inventory
              player.inventory = player.inventory.filter((i) => i.id !== item.id)
              (player as any)._eventBus?.emit("uiUpdate")
          }}
        />
      )}

      {activeTab === "save" && state && (
        <SaveTab state={state} />
      )}
    </div>
  )
}
