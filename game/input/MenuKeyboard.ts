import { useEffect } from "react"
import { Player } from "@/game/entities/Player"
import { Item } from "@/game/data/items/itemTypes"

export type MenuState = "menu" | "status" | "inventory"

interface MenuKeyboardProps {
  activeTab: MenuState
  setActiveTab: (v: MenuState) => void

  menuIndex: number
  setMenuIndex: (v: number) => void
  menuOptions: ("status" | "inventory" | "close")[]

  selectedIndex: number
  setSelectedIndex: (v: number) => void

  itemDetailsIndex: number | null
  setItemDetailsIndex: (v: number | null) => void

  player: Player
  onClose: () => void
}

export function menuKeyboard({
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
}: MenuKeyboardProps) {
  const columns = 5
  const rows = 4
  const totalSlots = columns * rows

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // ESC logic (global)
      if (e.key === "Escape") {
        if (itemDetailsIndex !== null) {
          setItemDetailsIndex(null)
        } else if (activeTab !== "menu") {
          setActiveTab("menu")
        } else {
          onClose()
        }
        e.preventDefault()
        return
      }

      // MENU navigation
      if (activeTab === "menu") {
        if (e.key === "ArrowRight") {
          setMenuIndex((menuIndex + 1) % menuOptions.length)
        }
        if (e.key === "ArrowLeft") {
          setMenuIndex((menuIndex - 1 + menuOptions.length) % menuOptions.length)
        }

        if (e.key === "Enter") {
          const selected = menuOptions[menuIndex]
          if (selected === "close") onClose()
          else setActiveTab(selected)
        }

        e.preventDefault()
        return
      }

      // INVENTORY navigation
      if (activeTab === "inventory") {
        let newIndex = selectedIndex

        if (e.key === "ArrowRight") newIndex = (selectedIndex + 1) % totalSlots
        if (e.key === "ArrowLeft") newIndex = (selectedIndex - 1 + totalSlots) % totalSlots
        if (e.key === "ArrowDown") newIndex = (selectedIndex + columns) % totalSlots
        if (e.key === "ArrowUp") newIndex = (selectedIndex - columns + totalSlots) % totalSlots

        if (newIndex !== selectedIndex) {
          setSelectedIndex(newIndex)
        }

        if (e.key === "Enter") {
          const item = player.inventory[selectedIndex]
          if (item) setItemDetailsIndex(selectedIndex)
        }

        e.preventDefault()
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [
    activeTab,
    menuIndex,
    selectedIndex,
    itemDetailsIndex,
    player,
    onClose,
  ])
}
