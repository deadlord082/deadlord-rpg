import { useState } from "react"
import { Player } from "@/game/entities/Player"
import { Item } from "@/game/data/items/itemTypes"

import { menuKeyboard } from "@/game/input/MenuKeyboard"

import { MenuTabs } from "./MenuTabs"
import { StatusTab } from "./StatusTab"
import { InventoryTab } from "./InventoryTab"
import { ItemDetailsModal } from "./ItemDetailsModal"

interface GameMenuProps {
  player: Player
  onClose: () => void
  initialTab?: "status" | "inventory" | null
}

type MenuState = "menu" | "status" | "inventory"

export function GameMenu({
  player,
  onClose,
  initialTab = null,
}: GameMenuProps) {
  const menuOptions: ("status" | "inventory" | "close")[] = [
    "status",
    "inventory",
    "close",
  ]

  const [activeTab, setActiveTab] = useState<MenuState>("menu")
  const [menuIndex, setMenuIndex] = useState(0)

  // inventory-related state
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null)
  const [itemDetailsIndex, setItemDetailsIndex] = useState<number | null>(null)

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
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
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
    </div>
  )
}
