import { useEffect } from "react"
import { Player } from "@/game/entities/Player"
import { EquipmentSlot } from "../data/items/EquipmentItem"

export type MenuState = "menu" | "status" | "inventory" | "equipment" | "save"

interface MenuKeyboardProps {
  activeTab: MenuState
  setActiveTab: (v: MenuState) => void

  menuIndex: number
  setMenuIndex: (v: number) => void
  menuOptions: ("status" | "inventory" | "equipment" | "save" | "quit" | "close")[]
  onSelect?: (tab: "status" | "inventory" | "equipment" | "save" | "quit" | "close") => void

  selectedIndex: number
  setSelectedIndex: (v: number) => void

  itemDetailsIndex: number | null
  setItemDetailsIndex: (v: number | null) => void

  selectedEquipSlot: number
  setSelectedEquipSlot: (i: number) => void
  equipmentModalSlot: string | null
  setEquipmentModalSlot: (v: string | null) => void
  selectedEquipItemIndex: number
  setSelectedEquipItemIndex: (i: number) => void

  player: Player
  onClose: () => void
}


export function menuKeyboard({
  activeTab,
  setActiveTab,
  menuIndex,
  setMenuIndex,
  menuOptions,
  onSelect,
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
}: MenuKeyboardProps) {
  const columns = 5
  const rows = 4
  const totalSlots = columns * rows

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // ESC logic (equipment modal)
      if (activeTab === "equipment" && equipmentModalSlot) {
        if (e.key === "Escape") {
          setEquipmentModalSlot(null)
          e.preventDefault()
          return
        }
      }

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
        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
          setMenuIndex((menuIndex + 1) % menuOptions.length)
        }
        if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q") {
          setMenuIndex((menuIndex - 1 + menuOptions.length) % menuOptions.length)
        }

        if (e.key === "Enter") {
          const selected = menuOptions[menuIndex]
          if (selected === "close") onClose()
          else if (typeof (arguments[0] as any) === "undefined" && false) {}
          else if (typeof onSelect === "function") {
            onSelect(selected)
          } else {
            // fallback for older callers
            setActiveTab(selected as MenuState)
          }
        }

        e.preventDefault()
        return
      }

      // INVENTORY navigation
      if (activeTab === "inventory") {
        // If item modal is open, let the modal handle keys (do not intercept)
        if (itemDetailsIndex !== null) {
          return
        }

        let newIndex = selectedIndex

        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") newIndex = (selectedIndex + 1) % totalSlots
        if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q") newIndex = (selectedIndex - 1 + totalSlots) % totalSlots
        if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") newIndex = (selectedIndex + columns) % totalSlots
        if (e.key === "ArrowUp" || e.key === "z" || e.key === "Z") newIndex = (selectedIndex - columns + totalSlots) % totalSlots

        if (newIndex !== selectedIndex) {
          setSelectedIndex(newIndex)
        }

        if (e.key === "Enter") {
          const item = player.inventory[selectedIndex]
          if (item) setItemDetailsIndex(selectedIndex)
        }

        e.preventDefault()
      }

      // EQUIPMENT navigation
      if (activeTab === "equipment") {
        const EQUIPMENT_SLOTS = ["head","chest","rightHand","leftHand","accessory1","accessory2"]
        const currentSlot = EQUIPMENT_SLOTS[selectedEquipSlot]

        // 🔥 IF MODAL IS OPEN
        if (equipmentModalSlot) {
          const equippedItem = player.equipment[equipmentModalSlot]

          const inventoryEquipables = player.inventory.filter((i) => {
            if (!("slot" in i)) return false
            const slotField = i.slot
            return Array.isArray(slotField)
              ? slotField.includes(equipmentModalSlot)
              : slotField === equipmentModalSlot
          })
          
          const equipableItems = [
            ...(equippedItem ? [equippedItem] : []),
            ...inventoryEquipables,
          ]

          if (equipableItems.length === 0) {
            if (e.key === "Escape") setEquipmentModalSlot(null)
            e.preventDefault()
            return
          }

          let newIndex = selectedEquipItemIndex

          if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
            newIndex = (selectedEquipItemIndex + 1) % equipableItems.length
          }

          if (e.key === "ArrowUp" || e.key === "z" || e.key === "Z") {
            newIndex =
              (selectedEquipItemIndex - 1 + equipableItems.length) %
              equipableItems.length
          }

          if (newIndex !== selectedEquipItemIndex) {
            setSelectedEquipItemIndex(newIndex)
          }

          // Equip
          if (e.key === "Enter") {
            const item = equipableItems[selectedEquipItemIndex]
            if (!item) return

            player.equip(equipmentModalSlot as EquipmentSlot, item)
            setEquipmentModalSlot(null)
          }

          if (e.key === "Escape") {
            setEquipmentModalSlot(null)
          }

          e.preventDefault()
          return
        }

        // 🔥 SLOT NAVIGATION (when modal closed)
        let newSlot = selectedEquipSlot

        if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
          newSlot = (selectedEquipSlot + 1) % EQUIPMENT_SLOTS.length

        if (e.key === "ArrowLeft" || e.key === "q" || e.key === "Q")
          newSlot =
            (selectedEquipSlot - 1 + EQUIPMENT_SLOTS.length) %
            EQUIPMENT_SLOTS.length

        if (newSlot !== selectedEquipSlot) {
          setSelectedEquipSlot(newSlot)
        }

        // Open modal
        if (e.key === "Enter") {
          setSelectedEquipItemIndex(0) // 🔥 reset selection
          setEquipmentModalSlot(currentSlot)
        }

        e.preventDefault()
        return
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [
    activeTab,
    menuIndex,
    selectedIndex,
    itemDetailsIndex,
    selectedEquipSlot,
    equipmentModalSlot,
    selectedEquipItemIndex,
    player,
    onClose,
    onSelect,
    menuOptions,
  ])
}
